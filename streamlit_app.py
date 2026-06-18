import streamlit as st
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import pandas as pd
from scipy.stats import skew, kurtosis
import io

st.set_page_config(
    page_title="Digital Image Analysis Linear Algebra",
    layout="wide",
    page_icon="Matrix"
)

@st.cache_data
def process_image(image_bytes, max_dim=800):
    file_bytes = np.asarray(bytearray(image_bytes), dtype=np.uint8)
    img_bgr = cv2.imdecode(file_bytes, 1)
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

    h, w = img_rgb.shape[:2]
    if max(h, w) > max_dim:
        scale = max_dim / max(h, w)
        img_rgb = cv2.resize(img_rgb, (int(w*scale), int(h*scale)))
        h, w = img_rgb.shape[:2]

    return img_rgb, w, h

@st.cache_data
def run_svd_decomposition(img_gray):
    max_dim = 400
    h, w = img_gray.shape[:2]
    if max(h, w) > max_dim:
        scale = max_dim / max(h, w)
        img_svd_in = cv2.resize(img_gray, (int(w*scale), int(h*scale))).astype(float)
    else:
        img_svd_in = img_gray.astype(float)
    U, S, Vt = np.linalg.svd(img_svd_in, full_matrices=False)
    rank = np.linalg.matrix_rank(img_svd_in)
    return U, S, Vt, rank, img_svd_in

@st.cache_data
def run_pca_decomposition(img_rgb):
    # Resize to max 512px for fast SVD
    h, w = img_rgb.shape[:2]
    max_side = 512
    if max(h, w) > max_side:
        scale = max_side / max(h, w)
        new_h, new_w = int(h * scale), int(w * scale)
        img_rgb_resized = cv2.resize(img_rgb, (new_w, new_h), interpolation=cv2.INTER_AREA)
    else:
        img_rgb_resized = img_rgb.copy()
        
    channels_orig = [img_rgb_resized[:, :, c].astype(np.float64) for c in range(3)]
    
    # Compute SVD for each channel once and store it
    svd_decomp = []
    for ch in channels_orig:
        mean_row = np.mean(ch, axis=1, keepdims=True)
        X = ch - mean_row
        U, S, Vt = np.linalg.svd(X, full_matrices=False)
        svd_decomp.append((mean_row, U, S, Vt))
        
    return img_rgb_resized, svd_decomp

def _ssim_channel(a, b, K1=0.01, K2=0.03, L=255):
    C1 = (K1 * L) ** 2
    C2 = (K2 * L) ** 2
    mu_a = float(np.mean(a))
    mu_b = float(np.mean(b))
    sig_a = float(np.std(a))
    sig_b = float(np.std(b))
    sig_ab = float(np.mean((a - mu_a) * (b - mu_b)))
    num = (2 * mu_a * mu_b + C1) * (2 * sig_ab + C2)
    den = (mu_a**2 + mu_b**2 + C1) * (sig_a**2 + sig_b**2 + C2)
    return num / (den + 1e-10)

def draw_pca_variance_chart(svd_decomp, k_highlight):
    fig, ax = plt.subplots(figsize=(8, 3.5))
    fig.patch.set_facecolor('none')
    ax.set_facecolor('none')
    
    colors_ch = ['#ff5f6d', '#4ecb8d', '#5b8dee']
    labels_ch = ['Red', 'Green', 'Blue']
    
    for c_idx, (mean_row, U, S, Vt) in enumerate(svd_decomp):
        total_var = np.sum(S ** 2) + 1e-10
        cumvar = np.cumsum(S ** 2) / total_var * 100
        
        plot_limit = min(100, len(S))
        ks = range(1, plot_limit + 1)
        ax.plot(ks, cumvar[:plot_limit], color=colors_ch[c_idx], linewidth=1.8, label=labels_ch[c_idx], alpha=0.9)
        
    ax.axvline(x=k_highlight, color='#f0c060', linewidth=1.2, linestyle='--', label=f'k={k_highlight}')
    ax.set_xlabel('Jumlah Komponen k', color='white', fontsize=8)
    ax.set_ylabel('Explained Variance Kumulatif (%)', color='white', fontsize=8)
    ax.set_ylim(0, 102)
    ax.tick_params(colors='white', labelsize=7)
    for spine in ax.spines.values():
        spine.set_edgecolor('#252a38')
    ax.grid(color='#252a38', linewidth=0.5, alpha=0.6)
    ax.legend(facecolor='#1a1e2a', edgecolor='#252a38', labelcolor='white', fontsize=8)
    ax.axhline(y=90, color='#7a8399', linewidth=0.6, linestyle=':', alpha=0.5)
    ax.axhline(y=95, color='#7a8399', linewidth=0.6, linestyle=':', alpha=0.5)
    fig.tight_layout(pad=0.6)
    return fig


LANG = {
    "ID": {
        "title": "Analisis Citra Digital Aljabar Linear",
        "subtitle": "Representasi Gambar sebagai Matriks & Analisis Ruang Warna",
        "theory_title": "Teori Aljabar Linear pada Citra Digital",
        "theory_compress_title": "Teori Aljabar Linear pada Kompresi Citra",
        "menu_title": "Pilihan Fitur",
        "menu_analysis": "Analisis Gambar (Klasifikasi, RGB, HSV, Matriks)",
        "menu_compression": "Kompresi Gambar (PCA Color & SVD Grayscale)",
        "upload_title": "Unggah Gambar untuk Dianalisis",
        "upload_compress_title": "Unggah Gambar untuk Dikompresi",
        "analyze_btn": "Mulai Analisis",
        "upload_wait": "Silakan unggah gambar terlebih dahulu.",
        "sec_ident": "01 Hasil Identifikasi",
        "sec_compare": "02 Perbandingan Gambar",
        "sec_stats": "03 Statistik Per Channel",
        "sec_rgb": "04 Visualisasi Channel RGB",
        "sec_charts": "05 Grafik & Kurva Analisis",
        "sec_matrix": "06 Representasi Matriks",
        "sec_report": "08 Laporan & Ringkasan",
        "btn_csv": "Download Statistik CSV",
        "btn_txt": "Download Laporan TXT"
    },
    "EN": {
        "title": "Digital Image Analysis Linear Algebra",
        "subtitle": "Image Representation as Matrices & Color Space Analysis",
        "theory_title": "Linear Algebra Theory in Digital Images",
        "theory_compress_title": "Linear Algebra Theory in Image Compression",
        "menu_title": "Feature Options",
        "menu_analysis": "Image Analysis (Classification, RGB, HSV, Matrix)",
        "menu_compression": "Image Compression (Color PCA & Grayscale SVD)",
        "upload_title": "Upload Image to Analyze",
        "upload_compress_title": "Upload Image to Compress",
        "analyze_btn": "Analyze Image",
        "upload_wait": "Please upload an image first.",
        "sec_ident": "01 Identification Results",
        "sec_compare": "02 Image Comparison",
        "sec_stats": "03 Per-Channel Statistics",
        "sec_rgb": "04 RGB Channel Visualization",
        "sec_charts": "05 Analysis Charts & Curves",
        "sec_matrix": "06 Matrix Representation",
        "sec_report": "08 Report & Summary",
        "btn_csv": "Download Statistics CSV",
        "btn_txt": "Download Report TXT"
    }
}

# --- SIDEBAR & NAVIGATION ---

with st.sidebar:
    st.header("Settings")
    lang_choice = st.selectbox("Language", ["EN", "ID"])
    T = LANG[lang_choice]

    st.divider()
    st.subheader(T["menu_title"])
    feature_choice = st.radio(
        "Pilih Fitur / Select Feature",
        [T["menu_analysis"], T["menu_compression"]]
    )

    if feature_choice == T["menu_analysis"]:
        st.divider()
        st.subheader("Detection Settings")
        threshold_std = st.slider("Std Dev Threshold (%)", 80.0, 99.0, 95.0, 0.5)
        threshold_sat  = st.slider("HSV Saturation Threshold", 1.0, 20.0, 8.0, 0.5)
        threshold_px   = st.slider("Colored Pixel Ratio (%)", 0.1, 5.0, 1.0, 0.1)

        st.divider()
        st.subheader("Matrix Display")
        matrix_size = st.selectbox("Sample Matrix Size", [8, 16, 32, 64], index=1)
    
    st.divider()
    st.subheader("About")
    st.info("Linear Algebra Final Project\nDigital Image Analysis\nUsing HSV + Std Dev methods")

st.title(T["title"])
st.markdown(f"**{T['subtitle']}**")
st.divider()

# --- MAIN PAGE LOGIC ---

if feature_choice == T["menu_analysis"]:
    # ─── IMAGE ANALYSIS MODE ───
    with st.expander(T["theory_title"], expanded=False):
        col1, col2, col3 = st.columns(3)
        with col1:
            st.markdown("### Representasi Matriks")
            st.write("Gambar digital grayscale adalah matriks 2D $H \\times W$. Gambar RGB adalah tensor 3D yang terdiri dari 3 matriks.")
            st.code("[[255, 0, 0], [0, 255, 0]] # RGB array")
        with col2:
            st.markdown("### Rumus Konversi Grayscale")
            st.latex(r"Y = 0.299R + 0.587G + 0.114B")
            st.write("Bobot ini berdasarkan sensitivitas mata manusia terhadap warna hijau yang lebih dominan.")
        with col3:
            st.markdown("### Metode Identifikasi")
            st.latex(r"\Delta_{RG} = \frac{1}{mn}\sum|R_{ij} - G_{ij}|")
            st.write("Kami menggunakan 2 metode:")
            st.write("- **Std Dev Similarity:** Mengecek seberapa mirip nilai RGB di tiap piksel.")
            st.write("- **HSV Saturation:** Menghitung rata-rata nilai Saturation (S) pada ruang warna HSV.")

    st.subheader(T["upload_title"])
    uploaded_file = st.file_uploader("", type=['png', 'jpg', 'jpeg', 'bmp', 'webp'], key="uploader_analysis")

    if uploaded_file is not None:
        file_bytes = uploaded_file.read()
        file_size_kb = len(file_bytes) / 1024

        st.image(uploaded_file, width=300, caption=f"Original File: {uploaded_file.name} ({file_size_kb:.1f} KB)")

        img_rgb, w, h = process_image(file_bytes)
        total_pixels = w * h
        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
        
        st.divider()
        
        # Run analysis automatically
        img_neg = 255 - img_rgb

        std_dev = np.std(img_rgb, axis=2)
        mean_std_dev = np.mean(std_dev)
        max_possible = np.std([255, 0, 0])
        similarity = max(0, 100 - (mean_std_dev / max_possible * 100))
        is_gray_method1 = similarity >= threshold_std

        img_hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
        mean_saturation = np.mean(img_hsv[:,:,1])
        colored_pixel_ratio = np.sum(img_hsv[:,:,1] > 15) / total_pixels * 100
        is_gray_method2 = mean_saturation < threshold_sat or colored_pixel_ratio < threshold_px

        if is_gray_method1 and is_gray_method2:
            verdict = "GRAYSCALE"
        elif not is_gray_method1 and not is_gray_method2:
            verdict = "COLOR"
        else:
            verdict = "GRAYSCALE" if is_gray_method2 else "COLOR"

        r, g, b = img_rgb[:,:,0], img_rgb[:,:,1], img_rgb[:,:,2]
        r_mean, g_mean, b_mean = np.mean(r), np.mean(g), np.mean(b)
        means = {'Red': r_mean, 'Green': g_mean, 'Blue': b_mean}
        dominant_channel = max(means, key=means.get)
        dominant_pct = means[dominant_channel] / sum(means.values()) * 100 if sum(means.values()) > 0 else 0

        st.subheader(T["sec_ident"])
        id_c1, id_c2, id_c3 = st.columns([1, 1.5, 1.5])
        with id_c1:
            if verdict == "COLOR":
                st.success("COLOR IMAGE")
                st.write("Berdasarkan analisis matriks RGB dan saturasi HSV, gambar ini memiliki distribusi warna yang signifikan.")
            else:
                st.info("GRAYSCALE IMAGE")
                st.write("Semua channel RGB memiliki nilai intensitas yang hampir identik atau saturasi warna sangat rendah.")

        with id_c2:
            col1, col2 = st.columns(2)
            col1.metric("Classification", verdict)
            col1.metric("Total Pixels", f"{total_pixels:,}")
            col1.metric("File Size", f"{file_size_kb:.1f} KB")
            col2.metric("Resolution", f"{w}x{h}")
            col2.metric("Mean Saturation", f"{mean_saturation:.2f}")
            col2.metric("Similarity", f"{similarity:.2f}%")

        with id_c3:
            st.markdown("### Confidence Gauge")
            st.write("Method 1 (Std Dev):", "Grayscale" if is_gray_method1 else "Color")
            st.progress(int(similarity) if is_gray_method1 else 100 - int(similarity))

            hsv_conf = min(100, max(0, 100 - (mean_saturation / threshold_sat * 50))) if is_gray_method2 else min(100, max(0, (mean_saturation / threshold_sat * 50)))
            st.write("Method 2 (HSV):", "Grayscale" if is_gray_method2 else "Color")
            st.progress(int(hsv_conf))

            if is_gray_method1 != is_gray_method2:
                st.warning("Kedua metode memberikan hasil berbeda. HSV dijadikan sebagai tie-breaker (penentu keputusan akhir).")

        st.divider()

        st.subheader(T["sec_compare"])
        cmp1, cmp2, cmp3 = st.columns(3)
        with cmp1:
            st.image(img_rgb, caption="Original Image", use_container_width=True)
        with cmp2:
            st.image(img_gray, caption="Grayscale (ITU-R BT.601)", clamp=True, use_container_width=True)
        with cmp3:
            st.image(img_neg, caption="Negative (255 - pixel)", use_container_width=True)

        st.divider()

        st.subheader(T["sec_stats"])

        def get_stats(arr):
            arr_f = arr.flatten()
            return {
                "Min": np.min(arr_f),
                "Max": np.max(arr_f),
                "Mean": np.mean(arr_f),
                "Median": np.median(arr_f),
                "Std Dev": np.std(arr_f),
                "Variance": np.var(arr_f),
                "Skewness": skew(arr_f),
                "Kurtosis": kurtosis(arr_f),
                "P25 (Q1)": np.percentile(arr_f, 25),
                "P75 (Q3)": np.percentile(arr_f, 75),
                "IQR": np.percentile(arr_f, 75) - np.percentile(arr_f, 25),
                "Energy": np.sum(np.square(arr_f.astype(np.float64))) / len(arr_f),
                "Entropy": -np.sum(np.histogram(arr_f, bins=256, density=True)[0] * np.log2(np.histogram(arr_f, bins=256, density=True)[0] + 1e-7))
            }

        stats_dict = {
            "Red (R)": get_stats(r),
            "Green (G)": get_stats(g),
            "Blue (B)": get_stats(b),
            "Grayscale (Y)": get_stats(img_gray)
        }
        df_stats = pd.DataFrame(stats_dict)
        st.dataframe(df_stats.style.format("{:.2f}"))

        csv = df_stats.to_csv(index=True)
        st.download_button(T["btn_csv"], csv, "image_stats.csv", "text/csv")

        st.divider()

        st.subheader(T["sec_rgb"])

        img_r = np.zeros_like(img_rgb)
        img_r[:,:,0] = r
        img_g = np.zeros_like(img_rgb)
        img_g[:,:,1] = g
        img_b = np.zeros_like(img_rgb)
        img_b[:,:,2] = b

        r_col, g_col, b_col = st.columns(3)
        with r_col:
            st.image(img_r, caption="Red Channel Only", use_container_width=True)
            st.markdown(f"**Min:** {np.min(r)} | **Mean:** {r_mean:.1f} | **Max:** {np.max(r)}")
        with g_col:
            st.image(img_g, caption="Green Channel Only", use_container_width=True)
            st.markdown(f"**Min:** {np.min(g)} | **Mean:** {g_mean:.1f} | **Max:** {np.max(g)}")
        with b_col:
            st.image(img_b, caption="Blue Channel Only", use_container_width=True)
            st.markdown(f"**Min:** {np.min(b)} | **Mean:** {b_mean:.1f} | **Max:** {np.max(b)}")

        total_mean = r_mean + g_mean + b_mean
        if total_mean > 0:
            pct_r = (r_mean/total_mean)*100
            pct_g = (g_mean/total_mean)*100
            pct_b = (b_mean/total_mean)*100
            st.markdown("### Channel Dominance")
            st.markdown(f"<div style='width: 100%; display: flex; height: 20px; border-radius: 5px; overflow: hidden;'>"
                        f"<div style='width: {pct_r}%; background: red;'></div>"
                        f"<div style='width: {pct_g}%; background: green;'></div>"
                        f"<div style='width: {pct_b}%; background: blue;'></div>"
                        f"</div>", unsafe_allow_html=True)
            st.markdown(f"Red: {pct_r:.1f}% &nbsp; Green: {pct_g:.1f}% &nbsp; Blue: {pct_b:.1f}%")

        st.divider()

        st.subheader(T["sec_charts"])
        tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
            "Combined Histogram", "Individual Histograms", "CDF Curves", 
            "Comparative Bar", "RGB Scatter Plot", "Box Plots"
        ])

        plt.style.use('dark_background')

        with tab1:
            fig1, ax1 = plt.subplots(figsize=(10, 4))
            fig1.patch.set_facecolor('none')
            ax1.set_facecolor('none')
            for c, c_name in zip([r, g, b], ['red', 'green', 'blue']):
                counts, bins = np.histogram(c.flatten(), bins=256, range=(0,256))
                ax1.plot(bins[:-1], counts, color=c_name, linewidth=1.5)
                ax1.fill_between(bins[:-1], counts, color=c_name, alpha=0.1)
                ax1.axvline(np.mean(c), color=c_name, linestyle='dashed', alpha=0.5)
            ax1.set_xlabel('Intensity')
            ax1.set_ylabel('Count')
            st.pyplot(fig1)

        with tab2:
            fig2, axs = plt.subplots(2, 2, figsize=(10, 6))
            fig2.patch.set_facecolor('none')
            for ax in axs.flatten(): ax.set_facecolor('none')

            axs[0,0].hist(r.flatten(), bins=64, color='red', alpha=0.7)
            axs[0,0].set_title(f"Red (Mean: {r_mean:.1f})")

            axs[0,1].hist(g.flatten(), bins=64, color='green', alpha=0.7)
            axs[0,1].set_title(f"Green (Mean: {g_mean:.1f})")

            axs[1,0].hist(b.flatten(), bins=64, color='blue', alpha=0.7)
            axs[1,0].set_title(f"Blue (Mean: {b_mean:.1f})")

            axs[1,1].hist(img_gray.flatten(), bins=64, color='gray', alpha=0.7)
            axs[1,1].set_title(f"Grayscale (Mean: {np.mean(img_gray):.1f})")

            plt.tight_layout()
            st.pyplot(fig2)

        with tab3:
            fig3, ax3 = plt.subplots(figsize=(10, 4))
            fig3.patch.set_facecolor('none')
            ax3.set_facecolor('none')
            x = np.arange(256)
            for c, c_name in zip([r, g, b, img_gray], ['red', 'green', 'blue', 'gray']):
                counts, _ = np.histogram(c.flatten(), bins=256, range=(0,256))
                cdf = np.cumsum(counts) / total_pixels * 100
                ax3.plot(x, cdf, color=c_name)
            ax3.set_xlabel('Intensity')
            ax3.set_ylabel('Cumulative %')
            st.pyplot(fig3)

        with tab4:
            fig4, ax4 = plt.subplots(figsize=(10, 4))
            fig4.patch.set_facecolor('none')
            ax4.set_facecolor('none')
            labels = ['Mean', 'Std Dev', 'Median']
            x = np.arange(len(labels))
            width = 0.2

            ax4.bar(x - 1.5*width, [stats_dict["Red (R)"][k] for k in labels], width, label='Red', color='red', alpha=0.8)
            ax4.bar(x - 0.5*width, [stats_dict["Green (G)"][k] for k in labels], width, label='Green', color='green', alpha=0.8)
            ax4.bar(x + 0.5*width, [stats_dict["Blue (B)"][k] for k in labels], width, label='Blue', color='blue', alpha=0.8)
            ax4.bar(x + 1.5*width, [stats_dict["Grayscale (Y)"][k] for k in labels], width, label='Gray', color='gray', alpha=0.8)

            ax4.set_xticks(x)
            ax4.set_xticklabels(labels)
            ax4.legend()
            st.pyplot(fig4)

        with tab5:
            fig5, ax5 = plt.subplots(figsize=(6, 6))
            fig5.patch.set_facecolor('none')
            ax5.set_facecolor('none')

            sample_size = min(1000, total_pixels)
            idx = np.random.choice(total_pixels, sample_size, replace=False)
            rs = r.flatten()[idx]
            gs = g.flatten()[idx]
            bs = b.flatten()[idx]

            colors = np.stack([rs, gs, bs], axis=-1) / 255.0
            sc = ax5.scatter(rs, gs, s=(bs/10)+5, c=colors, alpha=0.6)
            ax5.set_xlabel("Red Intensity")
            ax5.set_ylabel("Green Intensity")
            st.pyplot(fig5)

        with tab6:
            fig6, ax6 = plt.subplots(figsize=(10, 4))
            fig6.patch.set_facecolor('none')
            ax6.set_facecolor('none')
            data = [r.flatten(), g.flatten(), b.flatten(), img_gray.flatten()]

            bp = ax6.boxplot(data, vert=False, patch_artist=True)
            colors = ['red', 'green', 'blue', 'gray']
            for patch, color in zip(bp['boxes'], colors):
                patch.set_facecolor(color)
                patch.set_alpha(0.6)
            for median in bp['medians']:
                median.set_color('white')
            ax6.set_yticklabels(['Red', 'Green', 'Blue', 'Gray'])
            st.pyplot(fig6)

        st.divider()

        st.subheader(T["sec_matrix"])
        mtab1, mtab2, mtab3, mtab4 = st.tabs(["Saturation (S)", "Brightness (V)", "Hue (H)", "Pixel Matrices"])

        with mtab1:
            fig_s, ax_s = plt.subplots()
            fig_s.patch.set_facecolor('none')
            cax = ax_s.imshow(img_hsv[:,:,1], cmap='YlOrRd')
            fig_s.colorbar(cax, label="Saturation (0-255)")
            ax_s.set_title("Saturation Heatmap (Semakin merah = semakin berwarna)", color="white")
            st.pyplot(fig_s)

        with mtab2:
            fig_v, ax_v = plt.subplots()
            fig_v.patch.set_facecolor('none')
            cax = ax_v.imshow(img_hsv[:,:,2], cmap='viridis')
            fig_v.colorbar(cax, label="Brightness/Value (0-255)")
            ax_v.set_title("Brightness Heatmap", color="white")
            st.pyplot(fig_v)

        with mtab3:
            fig_h, ax_h = plt.subplots()
            fig_h.patch.set_facecolor('none')
            cax = ax_h.imshow(img_hsv[:,:,0], cmap='hsv')
            fig_h.colorbar(cax, label="Hue (0-179)")
            ax_h.set_title("Hue Heatmap", color="white")
            st.pyplot(fig_h)

        with mtab4:
            st.write(f"Menampilkan {matrix_size}x{matrix_size} piksel dari pojok kiri atas.")
            m_choice = st.radio("Channel:", ["Red", "Green", "Blue", "Grayscale"], horizontal=True)

            sz = min(matrix_size, w, h)
            if m_choice == "Red":
                sub_m = r[:sz, :sz]
                cmap = 'Reds'
            elif m_choice == "Green":
                sub_m = g[:sz, :sz]
                cmap = 'Greens'
            elif m_choice == "Blue":
                sub_m = b[:sz, :sz]
                cmap = 'Blues'
            else:
                sub_m = img_gray[:sz, :sz]
                cmap = 'gray'

            df_sub = pd.DataFrame(sub_m)
            st.dataframe(df_sub.style.background_gradient(cmap=cmap))

        st.divider()

        r_col1, r_col2 = st.columns([1, 1])
        with r_col1:
            st.subheader(T["sec_report"])
            orig_mean = np.mean(img_rgb)
            gray_mean = np.mean(img_gray)
            change_rate = abs(orig_mean - gray_mean) / orig_mean * 100 if orig_mean > 0 else 0

            report = f"""## Image Analysis Report

**File:** {uploaded_file.name}  
**Classification:** {verdict}  
**Confidence:** {max(similarity, hsv_conf):.1f}%  
**Resolution:** {w} × {h} pixels ({total_pixels:,} total)

- **Red Channel:** Mean={r_mean:.2f}, Std={stats_dict['Red (R)']['Std Dev']:.2f} → {'High' if r_mean>127 else 'Low'} intensity
- **Green Channel:** Mean={g_mean:.2f}, Std={stats_dict['Green (G)']['Std Dev']:.2f} → {'High' if g_mean>127 else 'Low'} intensity
- **Blue Channel:** Mean={b_mean:.2f}, Std={stats_dict['Blue (B)']['Std Dev']:.2f} → {'High' if b_mean>127 else 'Low'} intensity
- **Dominant Channel:** {dominant_channel} ({dominant_pct:.1f}%)

| Method | Result | Confidence |
|---|---|---|
| Std Dev Similarity | {"Grayscale" if is_gray_method1 else "Color"} | {similarity:.2f}% |
| HSV Saturation | {"Grayscale" if is_gray_method2 else "Color"} | {hsv_conf:.2f}% |
| **Final Verdict** | **{verdict}** | **{max(similarity, hsv_conf):.2f}%** |

Using ITU-R BT.601: Y = 0.299R + 0.587G + 0.114B  
Mean before conversion: {orig_mean:.2f} → Mean after: {gray_mean:.2f}  
Pixel change rate: {change_rate:.2f}%
"""
            st.markdown(report)
            st.download_button(T["btn_txt"], report, "analysis_report.txt", "text/plain")

        with r_col2:
            st.subheader("Persentase & Ringkasan")

            fig_pie, ax_pie = plt.subplots(figsize=(4, 4))
            fig_pie.patch.set_facecolor('none')
            ax_pie.pie([r_mean, g_mean, b_mean], labels=['Red', 'Green', 'Blue'], colors=['#ff5f6d', '#4ecb8d', '#5b8dee'], autopct='%1.1f%%', textprops={'color':"white"})
            st.pyplot(fig_pie)

            st.markdown("### Metrics Summary")
            m1, m2, m3 = st.columns(3)
            colorfulness = 100 - (mean_saturation / 255 * 100)
            color_index = min(100, (mean_saturation / 255 * 100) * 2)
            m1.metric("Colorfulness", f"{color_index:.1f}%")
            m2.metric("Brightness", f"{gray_mean:.1f} / 255")
            m3.metric("Contrast", f"Std={np.std(img_gray):.1f}")

            m4, m5, m6 = st.columns(3)
            m4.metric("Dominant", f"{dominant_channel}")
            m5.metric("Color Space", "RGB / HSV")
            m6.metric("Bit Depth", "24-bit")
    else:
        st.info(T["upload_wait"])

elif feature_choice == T["menu_compression"]:
    # ─── IMAGE COMPRESSION MODE (PCA & SVD) ───
    with st.expander(T["theory_compress_title"], expanded=False):
        col1, col2, col3 = st.columns(3)
        with col1:
            st.markdown("### " + T["menu_compression"])
            st.write("Kompresi matriks mereduksi ukuran penyimpanan gambar dengan mempertahankan komponen informasi terpenting.")
            st.latex(r"A \approx A_k")
        with col2:
            st.markdown("### Singular Value Decomposition (SVD)")
            st.latex(r"A = U \Sigma V^T")
            st.write("SVD memecah matriks grayscale menjadi perkalian tiga matriks. Kompresi dilakukan dengan mempertahankan $k$ nilai singular terbesar.")
        with col3:
            st.markdown("### Principal Component Analysis (PCA)")
            st.latex(r"\hat{A}_k = U_k \Sigma_k V_k^T")
            st.write("PCA memproyeksikan data gambar ke arah variansi maksimum. Dalam kompresi warna, kita melakukan SVD per-channel secara efisien.")

    st.subheader(T["upload_compress_title"])
    uploaded_file = st.file_uploader("", type=['png', 'jpg', 'jpeg', 'bmp', 'webp'], key="uploader_compression")

    if uploaded_file is not None:
        file_bytes = uploaded_file.read()
        file_size_kb = len(file_bytes) / 1024

        st.image(uploaded_file, width=300, caption=f"Original File: {uploaded_file.name} ({file_size_kb:.1f} KB)")

        img_rgb, w, h = process_image(file_bytes)
        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
        
        st.divider()

        comp_tab1, comp_tab2 = st.tabs(["PCA Compression (Color RGB)", "SVD Compression (Grayscale)"])

        with comp_tab1:
            st.markdown("### Matrix Compression via PCA")
            st.markdown("Menganalisis komponen utama dari masing-masing channel RGB untuk kompresi.")

            # Run cached decomposition
            img_rgb_resized, svd_decomp = run_pca_decomposition(img_rgb)
            max_components = min(img_rgb_resized.shape[0], img_rgb_resized.shape[1])

            n_components = st.slider(
                "Pilih jumlah Principal Components (k):",
                min_value=1,
                max_value=max_components,
                value=max(1, max_components // 10),
                key="pca_slider"
            )

            # Reconstruct color channels in real-time
            channels_rec = []
            ev_pcts = []
            k_actual = n_components
            for ch_idx, (mean_row, U, S, Vt) in enumerate(svd_decomp):
                k = min(n_components, len(S))
                Uk = U[:, :k]
                Sk = np.diag(S[:k])
                Vtk = Vt[:k, :]
                rec = Uk @ Sk @ Vtk + mean_row
                channels_rec.append(rec)
                
                total_var = np.sum(S ** 2)
                explained_var_pct = float(np.sum(S[:k] ** 2) / (total_var + 1e-10)) * 100.0
                ev_pcts.append(explained_var_pct)
                k_actual = k
                
            img_reconstructed_pca = np.stack([np.clip(c, 0, 255) for c in channels_rec], axis=-1).astype(np.uint8)

            # Compute quality metrics
            orig_f = img_rgb_resized.astype(np.float64)
            rec_f  = img_reconstructed_pca.astype(np.float64)
            mse_pca = float(np.mean((orig_f - rec_f) ** 2))
            
            if mse_pca < 1e-10:
                psnr_pca = 100.0
            else:
                psnr_pca = round(10.0 * np.log10((255.0 ** 2) / mse_pca), 2)
                
            ssim_vals = [_ssim_channel(img_rgb_resized[:, :, c], img_reconstructed_pca[:, :, c]) for c in range(3)]
            ssim_pca = round(float(np.mean(ssim_vals)), 4)
            
            h_res, w_res = img_rgb_resized.shape[:2]
            original_size = h_res * w_res * 3
            compressed_size = 3 * (k_actual * h_res + k_actual * w_res + k_actual)
            compression_ratio = round(original_size / max(compressed_size, 1), 2)

            st.markdown("#### Metrics Evaluasi Kualitas")
            m_col1, m_col2, m_col3, m_col4 = st.columns(4)
            m_col1.metric("Mean Squared Error (MSE)", f"{mse_pca:.4f}")
            m_col2.metric("Peak Signal-to-Noise Ratio (PSNR)", f"{psnr_pca:.2f} dB")
            m_col3.metric("Structural Similarity (SSIM)", f"{ssim_pca:.4f}")
            m_col4.metric("Compression Ratio", f"{compression_ratio:.2f}x")

            st.markdown("#### Explained Variance per Channel")
            ev_col1, ev_col2, ev_col3 = st.columns(3)
            ev_col1.metric("Red Channel Variance", f"{ev_pcts[0]:.2f}%")
            ev_col2.metric("Green Channel Variance", f"{ev_pcts[1]:.2f}%")
            ev_col3.metric("Blue Channel Variance", f"{ev_pcts[2]:.2f}%")

            pca_col1, pca_col2 = st.columns(2)
            with pca_col1:
                st.image(img_rgb_resized, caption="Original Color Image", use_container_width=True)
            with pca_col2:
                st.image(img_reconstructed_pca, caption=f"Reconstructed (k={k_actual})", use_container_width=True)

            st.markdown("#### Explained Variance vs Number of Components (k)")
            plt.style.use('dark_background')
            fig_var = draw_pca_variance_chart(svd_decomp, k_actual)
            st.pyplot(fig_var)

        with comp_tab2:
            st.markdown("### Matrix Compression via SVD")
            st.markdown("Memecah matriks gambar Grayscale menjadi $A = U \\Sigma V^T$")

            # Run cached decomposition
            U, S, Vt, rank, img_svd_in = run_svd_decomposition(img_gray)

            st.markdown(f"**Original Image Rank:** {rank}")

            k_val = st.slider(
                "Pilih jumlah Singular Values (k) untuk merekonstruksi gambar:",
                min_value=1,
                max_value=len(S),
                value=max(1, int(len(S)*0.1)),
                key='svd_slider'
            )

            # Reconstruct in real-time
            S_k = np.zeros_like(S)
            S_k[:k_val] = S[:k_val]
            img_reconstructed = np.dot(U, np.dot(np.diag(S_k), Vt))
            img_reconstructed = np.clip(img_reconstructed, 0, 255).astype(np.uint8)

            col_svd1, col_svd2 = st.columns(2)
            with col_svd1:
                st.image(img_svd_in.astype(np.uint8), caption="Original Grayscale", use_container_width=True)
            with col_svd2:
                st.image(img_reconstructed, caption=f"Reconstructed (k={k_val})", use_container_width=True)

            st.markdown("#### Scree Plot & Cumulative Explained Variance")
            fig_scree, ax_scree = plt.subplots(figsize=(8, 3))
            fig_scree.patch.set_facecolor('none')
            ax_scree.set_facecolor('none')

            total_var = np.sum(S**2)
            if total_var == 0: total_var = 1e-10
            explained_variance = (S**2) / total_var
            cum_variance = np.cumsum(explained_variance)

            plot_k = min(50, len(S))
            ax_scree.plot(range(1, plot_k+1), cum_variance[:plot_k]*100, marker='o', color='#ff5f6d', markersize=4)
            ax_scree.set_xlabel('Number of Singular Values (k)', color="white")
            ax_scree.set_ylabel('Cumulative Explained Variance (%)', color="white")
            ax_scree.grid(True, alpha=0.2)
            ax_scree.tick_params(colors='white', labelsize=8)
            for spine in ax_scree.spines.values():
                spine.set_edgecolor('#252a38')
            st.pyplot(fig_scree)
    else:
        st.info(T["upload_wait"])
