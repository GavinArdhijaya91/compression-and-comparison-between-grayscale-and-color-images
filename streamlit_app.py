import streamlit as st
import cv2
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

st.set_page_config(page_title="Comparison Between Grayscale and Color Images", layout="wide", page_icon="🖼️")

st.title("Comparison Between Grayscale and Color Images")
st.markdown("Analyze and compare grayscale vs color images using digital image processing and matrix transformations.")


with st.expander("🎓 Linear Algebra Behind the Scenes"):
    col1, col2 = st.columns(2)
    with col1:
        st.subheader("Matrix Representation")
        st.write("Every digital image is fundamentally a matrix. A grayscale image is a 2D matrix where each element represents the intensity (0-255). A colored image is a 3D matrix (Tensor) comprising three 2D matrices for the Red, Green, and Blue channels.")
        st.code("Pixel = [R, G, B]\nWhite = [255, 255, 255]\nGray  = [120, 120, 120]\nRed   = [255,   0,   0]")
    with col2:
        st.subheader("Grayscale Conversion")
        st.write("To convert an RGB vector into a single grayscale scalar, we apply a linear combination using a specific weight vector:")
        st.latex(r"Y = 0.299R + 0.587G + 0.114B")
        st.write("Our application detects grayscale by analyzing the variance among the R, G, and B components. If **R ≈ G ≈ B** for the majority of the pixels, it is a grayscale image.")


uploaded_file = st.file_uploader("Upload an Image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:

    file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
    img_bgr = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    if img_bgr is not None:
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        

        h, w, c = img_rgb.shape
        total_pixels = h * w
        

        std_dev = np.std(img_rgb, axis=2)
        mean_std_dev = np.mean(std_dev)
        
        max_possible_std_dev = np.std([255, 0, 0])
        similarity = max(0, 100 - (mean_std_dev / max_possible_std_dev * 100))
        
        threshold = 95.0
        if similarity >= threshold:
            img_type = "Grayscale Image"
            type_color = "gray"
        else:
            img_type = "Colored Image"
            type_color = "blue"
            

        st.divider()
        st.subheader("Image Analysis Results")
        
        col_img, col_stats = st.columns([1, 1])
        
        with col_img:
            st.image(img_rgb, caption="Uploaded Image", use_column_width=True)
            
        with col_stats:

            st.metric("Classification", img_type)
            st.metric("Grayscale Similarity", f"{similarity:.2f}%")
            st.metric("Resolution", f"{w}x{h}")
            st.metric("Total Pixels", f"{total_pixels:,}")
            
        st.divider()
        st.subheader("RGB Histogram")
        st.write("If the image is Grayscale, the R, G, and B histograms will overlap almost perfectly.")
        

        hist_r = cv2.calcHist([img_rgb], [0], None, [256], [0, 256])
        hist_g = cv2.calcHist([img_rgb], [1], None, [256], [0, 256])
        hist_b = cv2.calcHist([img_rgb], [2], None, [256], [0, 256])
        

        fig, ax = plt.subplots(figsize=(10, 4))
        fig.patch.set_facecolor('none')
        ax.set_facecolor('none')
        
        ax.plot(hist_r, color='red', label='Red Channel', alpha=0.7)
        ax.plot(hist_g, color='green', label='Green Channel', alpha=0.7)
        ax.plot(hist_b, color='blue', label='Blue Channel', alpha=0.7)
        
        ax.fill_between(range(256), hist_r.flatten(), color='red', alpha=0.1)
        ax.fill_between(range(256), hist_g.flatten(), color='green', alpha=0.1)
        ax.fill_between(range(256), hist_b.flatten(), color='blue', alpha=0.1)
        
        ax.set_xlabel('Pixel Intensity (0-255)', color='white')
        ax.set_ylabel('Pixel Count', color='white')
        ax.tick_params(colors='white')
        
        ax.legend()
        
        st.pyplot(fig)
    else:
        st.error("Invalid or corrupted image file.")
