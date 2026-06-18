// CSS Transitions and IntersectionObserver handle animations natively without external CDNs


const LANG = {
    ID: {
      "hero.eyebrow":"Aljabar Linear · HSV Color Space · Analisis Matriks",
      "nav.pca":"Kompres PCA",
      "hero.title1":"Analisis",
      "hero.title2":" &amp; identifikasi",
      "hero.title3":"gambar digital",
      "hero.title4":"dengan matriks.",
      "hero.desc1":"Upload gambar apapun dan dapatkan",
      "hero.desc2":" analisis ilmiah yang mendalam",
      "hero.desc3":" klasifikasi warna, breakdown channel RGB, heatmap saturasi HSV, visualisasi matriks piksel, dan banyak lagi.",
      "hero.cta":"Mulai Analisis","hero.how":"Cara Kerja","hero.scroll":"scroll untuk menjelajahi",
      "hero.badge1":"Teranalisis HSV","hero.chip":"BERWARNA ✓",
      "stat.sections":"Bagian Analisis","stat.charts":"Chart Matplotlib",
      "stat.matrix":"Heatmap Matriks","stat.ml":"Machine Learning",
      "how.tag":"Cara Kerja","how.title1":"Tiga langkah.","how.title2":" Sains murni.",
      "how.desc":"Tanpa model ML black-box. Setiap keputusan berbasis aljabar linear dan matematika ruang warna.",
      "step1.title":"Upload Gambar","step1.desc":"Drag &amp; drop atau klik untuk memilih. Mendukung PNG, JPG, BMP, dan WEBP hingga 16MB.",
      "step2.title":"Analisis HSV","step2.desc":"Gambar dikonversi ke ruang warna HSV. Kami mengukur mean saturasi dan colored pixel ratio di seluruh matriks channel saturasi.",
      "step3.title":"Visualisasi Kaya","step3.desc":"Dapatkan histogram, bar chart, heatmap, scatter plot, dan matriks piksel semua dirender server-side oleh matplotlib.",
      "method.tag":"Metode Identifikasi","method.title1":"HSV","method.title2":" color space,","method.title3":"bukan delta RGB.",
      "method.desc":"Kebanyakan implementasi naif membandingkan selisih channel RGB. Kami lebih dalam menggunakan channel Saturasi di ruang HSV yang langsung merepresentasikan <em>warna</em>.",
      "feat1.title":"Cek Mode Pillow","feat1.desc":"Gambar dengan mode L, LA, atau P langsung diklasifikasikan sebagai grayscale sebelum komputasi.",
      "feat2.title":"Matriks Saturasi","feat2.desc":"mean_saturation < 8 atau colored_pixel_ratio < 1% → GRAYSCALE.",
      "feat3.title":"Chart Server-Side","feat3.desc":"Semua 6 chart dirender oleh matplotlib di backend dan dikirim sebagai base64 PNG.",
      "matrix.tag":"Inti Aljabar Linear","matrix.title1":"Setiap piksel","matrix.title2":" adalah vektor.","matrix.title3":"Setiap gambar adalah","matrix.title4":" tensor.",
      "matrix.desc":"Gambar berwarna adalah tensor 3D berukuran H × W × 3. Grayscale runtuh menjadi H × W × 1. Kami mengekspos nilai numerik mentah sebagai heatmap interaktif.",
      "px.desc":"Setiap piksel adalah vektor-3 dalam ruang warna ℝ³.",
      "luma.desc":"Luminansi sebagai kombinasi linear bobot sesuai sensitivitas mata manusia.",
      "stats.desc":"Deskriptor statistik dihitung per-channel pada seluruh matriks.",
      "tech.tag":"Stack Teknologi","tech.title":"Dibangun dengan alat presisi.",
      "tech1":"Python micro-framework untuk backend API dan rendering template.",
      "tech2":"Konversi HSV, pemisahan channel, dan pipeline dekoding gambar.",
      "tech3":"Semua chart dirender server-side histogram, heatmap, scatter plot.",
      "tech4":"Operasi matriks, komputasi statistik, dan manipulasi array piksel.",
      "upload.tag":"Coba Sekarang","upload.title1":"Upload gambarmu.","upload.title2":"Lihat matematikanya.",
      "upload.desc":"Mendukung PNG, JPG, BMP, WEBP hingga 16MB. Hasil muncul langsung di bawah.",
      "upload.card.title":"Image Analyzer","upload.card.sub":"Diperkuat oleh OpenCV + NumPy + Matplotlib",
      "drop.title":"Drag &amp; Drop gambar ke sini","drop.hint":"PNG, JPG, BMP, WEBP maks 16 MB",
      "btn.analyze":"Analisis Gambar","btn.reset":"Reset",
      "loading.text":"Menganalisis gambar, membuat chart...",
      "sec.01":"Identifikasi","sec.02":"Perbandingan Gambar","sec.03":"Visualisasi Channel RGB",
      "sec.04":"Analisis Chart","sec.05":"Representasi Matriks","sec.06":"Konversi Grayscale",
      "badge.color":"BERWARNA","badge.gray":"GRAYSCALE",
      "label.original":"Gambar Asli","label.grayscale":"Representasi Grayscale",
      "stat.min":"Min","stat.max":"Max","stat.mean":"Rata-rata","stat.std":"Std Dev",
      "stat.mean_sat":"Mean Saturation","stat.colored_ratio":"Colored Pixel Ratio",
      "stat.dimension":"Dimensi","stat.total_px":"Total Piksel","stat.gray_stats":"Statistik Y",
      "toggle.gray":"Tampilkan detail konversi grayscale",
      "formula.label":"Rumus Luminance ITU-R BT.601",
      "chart.hist_rgb":"Histogram RGB","chart.bar_stats":"Bar Chart Statistik",
      "chart.heatmap":"Heatmap Saturasi HSV","chart.scatter":"Scatter R vs G",
      "chart.gray_compare":"Perbandingan Mean Channel",
      "reason.color":"Gambar diklasifikasikan BERWARNA mean saturasi HSV ≥ 8 dan colored pixel ratio ≥ 1%.",
      "reason.gray":"Gambar diklasifikasikan GRAYSCALE mean saturasi HSV sangat rendah atau hampir tidak ada piksel berwarna.",
      "reason.direct":"Gambar diklasifikasikan GRAYSCALE mode file asli:",
      "matrix.info":"Menampilkan subset %R×%C dari gambar %W×%H piksel penuh.",
      "footer.note":"Tugas Aljabar Linear · Analisis Citra Digital",
      "sec.07":"Kompresi Citra dengan PCA",
      "pca.formula.label":"Dekomposisi SVD per-Channel",
      "pca.controls.label":"Atur Jumlah Komponen PCA (k)",
      "pca.preset.label":"Preset Cepat:",
      "pca.cr.label":"Rasio Kompresi",
      "pca.btn.compress":"Kompres Gambar",
      "pca.kmax.prefix":"k max tersedia:",
      "pca.loading":"Menghitung SVD &amp; merekonstruksi gambar...",
      "pca.mse.unit":"↓ semakin kecil semakin baik",
      "pca.ssim.unit":"0–1 (↑ semakin baik)",
      "pca.cr.lbl":"Rasio Kompresi",
      "pca.k.lbl":"Komponen k",
      "pca.k.unit":"dari max",
      "pca.ev.label":"Explained Variance per Channel",
      "pca.compare.label":"Perbandingan Visual",
      "pca.varchart.label":"Explained Variance (%) vs Jumlah Komponen k",
      "pca.compressed.lbl":"Hasil Kompresi",
      "pca.section.tag":"Kompresi PCA",
      "pca.section.title1":"Kompresi Citra",
      "pca.section.title2":" dengan PCA.",
      "pca.section.desc":"Upload gambar di bawah, atur jumlah komponen k, lalu lihat hasil kompresi beserta metrik kualitas MSE, PSNR, SSIM, dan Compression Ratio.",
      "pca.card.title":"PCA Image Compressor",
      "pca.card.sub":"Berbasis SVD per-Channel · A = UΣVᵀ → Âₖ = Uₖ·Σₖ·Vₖᵀ",
      "pca.drop.title":"Drag &amp; Drop gambar untuk dikompres",
      "pca.drop.hint":"PNG, JPG, BMP, WEBP — maks 16 MB"
    },
    EN: {
      "hero.eyebrow":"Linear Algebra · HSV Color Space · Matrix Analysis",
      "nav.pca":"PCA Compress",
      "hero.title1":"Analyze","hero.title2":" &amp; identify","hero.title3":"digital images","hero.title4":"with matrices.",
      "hero.desc1":"Upload any image and get a","hero.desc2":" deep scientific analysis",
      "hero.desc3":" color classification, RGB channel breakdown, HSV saturation heatmap, pixel matrix visualization, and more.",
      "hero.cta":"Start Analysis","hero.how":"How It Works","hero.scroll":"scroll to explore",
      "hero.badge1":"HSV Analyzed","hero.chip":"COLOR ✓",
      "stat.sections":"Analysis Sections","stat.charts":"Matplotlib Charts",
      "stat.matrix":"Matrix Heatmap","stat.ml":"Machine Learning",
      "how.tag":"How It Works","how.title1":"Three steps.","how.title2":" Pure science.",
      "how.desc":"No black-box ML models. Every decision is based on linear algebra and color space mathematics.",
      "step1.title":"Upload Your Image","step1.desc":"Drag & drop or click to select. Supports PNG, JPG, BMP, and WEBP up to 16MB.",
      "step2.title":"HSV Color Analysis","step2.desc":"Image is converted to HSV color space. We measure the mean saturation and colored pixel ratio across the full saturation channel matrix.",
      "step3.title":"Rich Visualizations","step3.desc":"Get histograms, bar charts, heatmaps, scatter plots, and pixel matrices all rendered server-side with matplotlib.",
      "method.tag":"Identification Method","method.title1":"HSV","method.title2":" color space,","method.title3":"not RGB delta.",
      "method.desc":"Most naive implementations compare RGB channel differences. We go deeper using the Saturation channel in HSV space which directly represents colorfulness.",
      "feat1.title":"Pillow Mode Check","feat1.desc":"Images with mode L, LA, or P are instantly classified as grayscale before any computation.",
      "feat2.title":"Saturation Matrix","feat2.desc":"mean_saturation < 8 or colored_pixel_ratio < 1% → GRAYSCALE.",
      "feat3.title":"Server-Side Charts","feat3.desc":"All 6 charts are rendered by matplotlib on the backend and sent as base64 PNG.",
      "matrix.tag":"Linear Algebra Core","matrix.title1":"Every pixel","matrix.title2":" is a vector.","matrix.title3":"Every image is","matrix.title4":" a tensor.",
      "matrix.desc":"A color image is a 3D tensor of shape H × W × 3. Grayscale collapses to H × W × 1. We expose raw numerical values as an interactive heatmap.",
      "px.desc":"Each pixel is a 3-vector in ℝ³ color space.",
      "luma.desc":"Luminance as a linear combination weights match human eye sensitivity.",
      "stats.desc":"Statistical descriptors computed per-channel across the full matrix.",
      "tech.tag":"Tech Stack","tech.title":"Built with precision tools.",
      "tech1":"Python micro-framework for the backend API and template rendering.",
      "tech2":"HSV conversion, channel splitting, and image decoding pipeline.",
      "tech3":"All charts rendered server-side histograms, heatmaps, scatter plots.",
      "tech4":"Matrix operations, statistical computation, and pixel array manipulation.",
      "upload.tag":"Try It Now","upload.title1":"Upload your image.","upload.title2":"See the math.",
      "upload.desc":"Supports PNG, JPG, BMP, WEBP up to 16MB. Results appear instantly below.",
      "upload.card.title":"Image Analyzer","upload.card.sub":"Powered by OpenCV + NumPy + Matplotlib",
      "drop.title":"Drag & Drop your image here","drop.hint":"PNG, JPG, BMP, WEBP max 16 MB",
      "btn.analyze":"Analyze Image","btn.reset":"Reset",
      "loading.text":"Analyzing image, generating charts...",
      "sec.01":"Identification","sec.02":"Image Comparison","sec.03":"RGB Channel Visualization",
      "sec.04":"Chart Analysis","sec.05":"Matrix Representation","sec.06":"Grayscale Conversion",
      "badge.color":"COLOR","badge.gray":"GRAYSCALE",
      "label.original":"Original Image","label.grayscale":"Grayscale Representation",
      "stat.min":"Min","stat.max":"Max","stat.mean":"Mean","stat.std":"Std Dev",
      "stat.mean_sat":"Mean Saturation","stat.colored_ratio":"Colored Pixel Ratio",
      "stat.dimension":"Dimension","stat.total_px":"Total Pixels","stat.gray_stats":"Y Statistics",
      "toggle.gray":"Show grayscale conversion details",
      "formula.label":"Luminance Formula ITU-R BT.601",
      "chart.hist_rgb":"RGB Histogram","chart.bar_stats":"Channel Stats Bar Chart",
      "chart.heatmap":"Saturation Heatmap (HSV-S)","chart.scatter":"Scatter R vs G",
      "chart.gray_compare":"Channel Mean Comparison",
      "reason.color":"Image classified as COLOR HSV mean saturation ≥ 8 and colored pixel ratio ≥ 1%.",
      "reason.gray":"Image classified as GRAYSCALE HSV mean saturation is very low or barely any colored pixels.",
      "reason.direct":"Image classified as GRAYSCALE original file mode:",
      "matrix.info":"Showing %R×%C subset of full %W×%H pixel image.",
      "footer.note":"Linear Algebra Assignment · Digital Image Analysis",
      "sec.07":"PCA Image Compression",
      "pca.formula.label":"SVD Decomposition per-Channel",
      "pca.controls.label":"Set Number of PCA Components (k)",
      "pca.preset.label":"Quick Presets:",
      "pca.cr.label":"Compression Ratio",
      "pca.btn.compress":"Compress Image",
      "pca.kmax.prefix":"k max available:",
      "pca.loading":"Computing SVD &amp; reconstructing image...",
      "pca.mse.unit":"↓ lower is better",
      "pca.ssim.unit":"0–1 (↑ higher is better)",
      "pca.cr.lbl":"Compression Ratio",
      "pca.k.lbl":"Components k",
      "pca.k.unit":"of max",
      "pca.ev.label":"Explained Variance per Channel",
      "pca.compare.label":"Visual Comparison",
      "pca.varchart.label":"Explained Variance (%) vs Number of Components k",
      "pca.compressed.lbl":"Compressed Result",
      "pca.section.tag":"PCA Compression",
      "pca.section.title1":"Image Compression",
      "pca.section.title2":" with PCA.",
      "pca.section.desc":"Upload an image below, set the number of components k, then see the compression result with quality metrics MSE, PSNR, SSIM, and Compression Ratio.",
      "pca.card.title":"PCA Image Compressor",
      "pca.card.sub":"SVD per-Channel based · A = UΣVᵀ → Âₖ = Uₖ·Σₖ·Vₖᵀ",
      "pca.drop.title":"Drag &amp; Drop image to compress",
      "pca.drop.hint":"PNG, JPG, BMP, WEBP (max 16 MB)"
    }
  };

  let lang = (localStorage.getItem('lang') || 'ID').toUpperCase();
  if (lang !== 'ID' && lang !== 'EN') lang = 'ID';
  let theme = (localStorage.getItem('theme') || 'dark').toLowerCase();
  if (theme !== 'dark' && theme !== 'light') theme = 'dark';
  let currentFile = null;
  let analysisData = null;
  let matrixTab = 'R';

  function applyLang(l) {
    lang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (LANG[l][k] !== undefined) el.innerHTML = LANG[l][k];
    });
    const label = document.getElementById('lang-label');
    if (label) label.textContent = l;
    localStorage.setItem('lang', l);
    if (analysisData) updateIdText(analysisData);
  }
  function toggleLang() { applyLang(lang === 'ID' ? 'EN' : 'ID'); }

  function applyTheme(t) {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', t === 'dark' ? 'sun' : 'moon');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
    localStorage.setItem('theme', t);
  }
  function toggleTheme() { applyTheme(theme === 'dark' ? 'light' : 'dark'); }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .r-card, .chart-tile').forEach(el => observer.observe(el));

  function scrollToUpload() { document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' }); }
  function scrollToHowItWorks() { document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' }); }

  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault(); dropZone.classList.remove('dragover');
      if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) setFile(fileInput.files[0]); });
  }

  function setFile(f) {
    currentFile = f;
    const r = new FileReader();
    r.onload = e => {
      const previewImg = document.getElementById('preview-img');
      if (previewImg) previewImg.src = e.target.result;
      const previewWrap = document.getElementById('preview-wrap');
      if (previewWrap) previewWrap.classList.add('show');
      if (dropZone) dropZone.classList.add('has-file');
    };
    r.readAsDataURL(f);
    const btnAnalyze = document.getElementById('btn-analyze');
    if (btnAnalyze) btnAnalyze.disabled = false;
  }

  function resetAll() {
    currentFile = null; analysisData = null;
    if (fileInput) fileInput.value = '';
    const previewImg = document.getElementById('preview-img');
    if (previewImg) previewImg.src = '';
    const previewWrap = document.getElementById('preview-wrap');
    if (previewWrap) previewWrap.classList.remove('show');
    if (dropZone) dropZone.classList.remove('has-file', 'dragover');
    const btnAnalyze = document.getElementById('btn-analyze');
    if (btnAnalyze) btnAnalyze.disabled = true;
    const results = document.getElementById('results');
    if (results) {
      results.style.display = 'none';
      results.classList.remove('show');
    }
    const loader = document.getElementById('loading');
    if (loader) loader.classList.remove('show');
    const grayToggle = document.getElementById('gray-toggle');
    if (grayToggle) grayToggle.checked = false;
    const grayContent = document.getElementById('gray-content');
    if (grayContent) grayContent.classList.remove('open');
  }

  async function runAnalysis() {
    if (!currentFile) return;
    const loader = document.getElementById('loading');
    if (loader) loader.classList.add('show');
    const results = document.getElementById('results');
    if (results) {
      results.style.display = 'none';
      results.classList.remove('show');
    }

    const form = new FormData();
    form.append('image', currentFile);
    try {
      const res = await fetch('/analyze', { method: 'POST', body: form });
      const d = await res.json();
      if (!res.ok || d.error) throw new Error(d.error || 'Server error');
      analysisData = d;
      renderResults(d);
    } catch(err) { showToast(err.message); }
    finally {
      if (loader) loader.classList.remove('show');
    }
  }

  function updateIdText(d) {
    const L = LANG[lang];
    const badge = document.getElementById('id-badge');
    const reason = document.getElementById('id-reason');
    if (badge) {
      if (d.is_grayscale) {
        badge.textContent = L['badge.gray']; badge.className = 'id-badge-large gray';
      } else {
        badge.textContent = L['badge.color']; badge.className = 'id-badge-large color';
      }
    }
    if (reason) {
      if (d.is_grayscale) {
        reason.textContent = (d.original_mode !== 'RGB' && d.original_mode !== 'RGBA')
          ? L['reason.direct'] + ' ' + d.original_mode + '.'
          : L['reason.gray'];
      } else {
        reason.textContent = L['reason.color'];
      }
    }
  }

  function renderResults(d) {
    updateIdText(d);
    
    const vMeanSat = document.getElementById('v-mean-sat');
    if (vMeanSat) vMeanSat.textContent = d.mean_saturation;
    const vColoredRatio = document.getElementById('v-colored-ratio');
    if (vColoredRatio) vColoredRatio.textContent = (d.colored_pixel_ratio * 100).toFixed(2) + '%';
    const vDimension = document.getElementById('v-dimension');
    if (vDimension) vDimension.textContent = d.width + ' × ' + d.height;
    const vTotalPx = document.getElementById('v-total-px');
    if (vTotalPx) vTotalPx.textContent = d.total_pixels.toLocaleString();

    const imgOriginal = document.getElementById('img-original');
    if (imgOriginal) imgOriginal.src = 'data:' + d.original_mime + ';base64,' + d.original_b64;
    const imgGray = document.getElementById('img-gray');
    if (imgGray) imgGray.src = 'data:image/png;base64,' + d.grayscale.image_b64;

    setChImg('r', d.channels.R); setChImg('g', d.channels.G); setChImg('b', d.channels.B);

    const chartHistRgb = document.getElementById('chart-hist-rgb');
    if (chartHistRgb) chartHistRgb.src = 'data:image/png;base64,' + d.charts.histogram_rgb_b64;
    const chartBarStats = document.getElementById('chart-bar-stats');
    if (chartBarStats) chartBarStats.src = 'data:image/png;base64,' + d.charts.bar_stats_b64;
    const chartHeatmap = document.getElementById('chart-heatmap');
    if (chartHeatmap) chartHeatmap.src = 'data:image/png;base64,' + d.charts.heatmap_saturation_b64;
    const chartScatter = document.getElementById('chart-scatter');
    if (chartScatter) chartScatter.src = 'data:image/png;base64,' + d.charts.scatter_rgb_b64;

    matrixTab = 'R';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'R'));
    renderMatrix('R', d);

    const grayOrigImg = document.getElementById('gray-orig-img');
    if (grayOrigImg) grayOrigImg.src = 'data:' + d.original_mime + ';base64,' + d.original_b64;
    const grayResImg = document.getElementById('gray-res-img');
    if (grayResImg) grayResImg.src = 'data:image/png;base64,' + d.grayscale.image_b64;
    const chartGrayCmp = document.getElementById('chart-gray-cmp');
    if (chartGrayCmp) chartGrayCmp.src = 'data:image/png;base64,' + d.grayscale.comparison_chart_b64;
    const grayMin = document.getElementById('gray-min');
    if (grayMin) grayMin.textContent = d.grayscale.stats.min;
    const grayMax = document.getElementById('gray-max');
    if (grayMax) grayMax.textContent = d.grayscale.stats.max;
    const grayMean = document.getElementById('gray-mean');
    if (grayMean) grayMean.textContent = d.grayscale.stats.mean;
    const grayStd = document.getElementById('gray-std');
    if (grayStd) grayStd.textContent = d.grayscale.stats.std;

    // Advanced LA rendering
    const svdRank = document.getElementById('svd-rank');
    if (svdRank) svdRank.textContent = d.advanced_linear_algebra.svd.rank;
    const svdTopVal = document.getElementById('svd-top-val');
    if (svdTopVal) svdTopVal.textContent = d.advanced_linear_algebra.svd.top_singular_value.toFixed(2);
    const svdK90 = document.getElementById('svd-k90');
    if (svdK90) svdK90.textContent = d.advanced_linear_algebra.svd.k_90;
    const svdK95 = document.getElementById('svd-k95');
    if (svdK95) svdK95.textContent = d.advanced_linear_algebra.svd.k_95;
    const chartSvdScree = document.getElementById('chart-svd-scree');
    if (chartSvdScree) chartSvdScree.src = 'data:image/png;base64,' + d.advanced_linear_algebra.svd.scree_plot_b64;

    const covTbl = document.getElementById('pca-cov-matrix');
    if (covTbl) {
      covTbl.innerHTML = '<tr><th></th><th style="color:#ff5f6d">R</th><th style="color:#4ecb8d">G</th><th style="color:#5b8dee">B</th></tr>';
      const channels = ['R', 'G', 'B'];
      const colors = ['#ff5f6d', '#4ecb8d', '#5b8dee'];
      d.advanced_linear_algebra.pca.covariance_matrix.forEach((row, i) => {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.textContent = channels[i];
        th.style.color = colors[i];
        tr.appendChild(th);
        row.forEach(val => {
          let td = document.createElement('td');
          td.textContent = val.toFixed(1);
          tr.appendChild(td);
        });
        covTbl.appendChild(tr);
      });
    }

    const eigenInfo = document.getElementById('pca-eigen-info');
    if (eigenInfo) {
      let eigenHtml = '';
      const ev = d.advanced_linear_algebra.pca.eigenvalues;
      const exp = d.advanced_linear_algebra.pca.explained_variance;
      const evec = d.advanced_linear_algebra.pca.eigenvectors;

      for(let i=0; i<3; i++) {
          eigenHtml += `<div><strong>&lambda;<sub>${i+1}</sub> = ${ev[i].toFixed(1)}</strong> (${exp[i].toFixed(2)}%)<br/>
          Vector: [${evec[0][i].toFixed(3)}, ${evec[1][i].toFixed(3)}, ${evec[2][i].toFixed(3)}]</div><br/>`;
      }
      eigenHtml += `<div style="margin-top:1rem; padding: 1rem; background: rgba(91,141,238,0.1); border-radius: 8px;">
      <strong>Dominant Vector: ${d.advanced_linear_algebra.pca.dominant_axis}</strong>
      </div>`;
      eigenInfo.innerHTML = eigenHtml;
    }

    const advResults = document.getElementById('advanced-la-results');
    if (advResults) advResults.style.display = 'block';

    const results = document.getElementById('results');
    if (results) {
      results.style.display = 'block';
      results.classList.add('show');
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fontChImg = function setChImg(ch, data) {
    const img = document.getElementById('ch-' + ch + '-img');
    if (img) img.src = 'data:image/png;base64,' + data.image_b64;
    const min = document.getElementById('ch-' + ch + '-min');
    if (min) min.textContent = data.stats.min;
    const max = document.getElementById('ch-' + ch + '-max');
    if (max) max.textContent = data.stats.max;
    const mean = document.getElementById('ch-' + ch + '-mean');
    if (mean) mean.textContent = data.stats.mean;
    const std = document.getElementById('ch-' + ch + '-std');
    if (std) std.textContent = data.stats.std;
    const hist = document.getElementById('ch-' + ch + '-hist');
    if (hist) hist.src = 'data:image/png;base64,' + data.histogram_b64;
  }

  function setChImg(ch, data) {
    const img = document.getElementById('ch-' + ch + '-img');
    if (img) img.src = 'data:image/png;base64,' + data.image_b64;
    const min = document.getElementById('ch-' + ch + '-min');
    if (min) min.textContent = data.stats.min;
    const max = document.getElementById('ch-' + ch + '-max');
    if (max) max.textContent = data.stats.max;
    const mean = document.getElementById('ch-' + ch + '-mean');
    if (mean) mean.textContent = data.stats.mean;
    const std = document.getElementById('ch-' + ch + '-std');
    if (std) std.textContent = data.stats.std;
    const hist = document.getElementById('ch-' + ch + '-hist');
    if (hist) hist.src = 'data:image/png;base64,' + data.histogram_b64;
  }

  function switchMatrix(tab, btn) {
    matrixTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (analysisData) renderMatrix(tab, analysisData);
  }

  function renderMatrix(tab, d) {
    let matrix, shape, rgb;
    if      (tab === 'R') { matrix = d.channels.R.matrix; shape = d.channels.R.matrix_shape; rgb = '255,80,100'; }
    else if (tab === 'G') { matrix = d.channels.G.matrix; shape = d.channels.G.matrix_shape; rgb = '70,200,130'; }
    else if (tab === 'B') { matrix = d.channels.B.matrix; shape = d.channels.B.matrix_shape; rgb = '80,140,240'; }
    else                  { matrix = d.grayscale.matrix;  shape = d.grayscale.matrix_shape;  rgb = '160,168,192'; }

    const infoEl = document.getElementById('matrix-info');
    if (infoEl) {
      const info = LANG[lang]['matrix.info']
        .replace('%R', shape[0]).replace('%C', shape[1])
        .replace('%W', d.width).replace('%H', d.height);
      infoEl.textContent = info;
    }

    const tbl = document.getElementById('matrix-tbl');
    if (tbl) {
      tbl.innerHTML = '';
      matrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(val => {
          const td = document.createElement('td');
          td.textContent = val;
          td.style.backgroundColor = `rgba(${rgb},${Math.max(0.07, val/255)})`;
          tr.appendChild(td);
        });
        tbl.appendChild(tr);
      });
    }
  }

  function toggleGray() {
    const grayContent = document.getElementById('gray-content');
    const grayToggle = document.getElementById('gray-toggle');
    if (grayContent && grayToggle) {
      grayContent.classList.toggle('open', grayToggle.checked);
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (t) {
      t.textContent = msg; t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 4000);
    }
  }

  window._mathBgColor = () =>
    document.documentElement.getAttribute('data-theme') === 'light'
      ? '28,52,140'    
      : '91,141,238';  

  (function() {
    const c = document.getElementById('math-bg');
    const ctx = c.getContext('2d');
    let W, H, pts = [];
    const syms = ['A·x=b','∑','det(M)','Y=0.299R+0.587G+0.114B','λ','HSV','σ²','R≈G≈B','T(v)=Av','‖v‖','[R G B]ᵀ','rank(A)','∇f','H×W×3','S<8','μ','Ax=λx','||w||₂'];
    function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
    window.addEventListener('resize', resize); resize();
    class P {
      constructor() { this.init(); this.y = Math.random() * H; }
      init() {
        this.x = Math.random() * W; this.y = H + 20;
        this.s = syms[0|(Math.random()*syms.length)];
        this.fs = 11 + Math.random() * 14;
        this.sp = 0.2 + Math.random() * 0.55;
        this.op = 0.12 + Math.random() * 0.22;
        this.dx = (Math.random()-.5) * 0.14;
      }
      tick() { this.y -= this.sp; this.x += this.dx; if (this.y < -30) this.init(); }
      draw() {
        ctx.fillStyle = `rgba(${window._mathBgColor()},${this.op})`;
        ctx.font = `${this.fs}px 'JetBrains Mono',monospace`;
        ctx.fillText(this.s, this.x, this.y);
      }
    }
    for (let i = 0; i < 55; i++) pts.push(new P());
    (function loop() { ctx.clearRect(0,0,W,H); pts.forEach(p=>{p.tick();p.draw();}); requestAnimationFrame(loop); })();
  })();

  // PCA Upload Zone (dibuat terpisah)
  let pcaFile = null;

  const pcaDropZone = document.getElementById('pca-drop-zone');
  const pcaFileInput = document.getElementById('pca-file-input');
  if (pcaDropZone && pcaFileInput) {
    pcaDropZone.addEventListener('click', () => pcaFileInput.click());
    pcaDropZone.addEventListener('dragover', e => { e.preventDefault(); pcaDropZone.classList.add('dragover'); });
    pcaDropZone.addEventListener('dragleave', () => pcaDropZone.classList.remove('dragover'));
    pcaDropZone.addEventListener('drop', e => {
      e.preventDefault(); pcaDropZone.classList.remove('dragover');
      if (e.dataTransfer.files[0]) setPcaFile(e.dataTransfer.files[0]);
    });
    pcaFileInput.addEventListener('change', () => { if (pcaFileInput.files[0]) setPcaFile(pcaFileInput.files[0]); });
  }

  function setPcaFile(f) {
    pcaFile = f;
    const r = new FileReader();
    r.onload = e => {
      const previewImg = document.getElementById('pca-preview-img');
      if (previewImg) previewImg.src = e.target.result;
      const previewWrap = document.getElementById('pca-preview-wrap');
      if (previewWrap) previewWrap.classList.add('show');
      if (pcaDropZone) pcaDropZone.classList.add('has-file');
    };
    r.readAsDataURL(f);
    const btnCompress = document.getElementById('btn-pca-compress');
    if (btnCompress) btnCompress.disabled = false;
    const results = document.getElementById('pca-results');
    if (results) results.classList.remove('show');
    const kmaxDisp = document.getElementById('pca-kmax-display');
    if (kmaxDisp) kmaxDisp.textContent = '—';
  }

  function resetPca() {
    pcaFile = null;
    if (pcaFileInput) pcaFileInput.value = '';
    const previewImg = document.getElementById('pca-preview-img');
    if (previewImg) previewImg.src = '';
    const previewWrap = document.getElementById('pca-preview-wrap');
    if (previewWrap) previewWrap.classList.remove('show');
    if (pcaDropZone) pcaDropZone.classList.remove('has-file', 'dragover');
    const btnCompress = document.getElementById('btn-pca-compress');
    if (btnCompress) btnCompress.disabled = true;
    const results = document.getElementById('pca-results');
    if (results) results.classList.remove('show');
    const loading = document.getElementById('pca-loading');
    if (loading) loading.classList.remove('show');
    const kmaxDisp = document.getElementById('pca-kmax-display');
    if (kmaxDisp) kmaxDisp.textContent = '—';
  }

  function updateSliderGradient(slider) {
    if (!slider) return;
    const val = parseInt(slider.value);
    const max = parseInt(slider.max);
    const pct = ((val - 1) / (max - 1)) * 100;
    slider.style.setProperty('--slider-pct', pct.toFixed(1) + '%');
  }

  function onPcaSliderInput(slider) {
    if (!slider) return;
    const k = parseInt(slider.value);
    const kDisp = document.getElementById('pca-k-display');
    if (kDisp) kDisp.textContent = k;
    updateSliderGradient(slider);
    document.querySelectorAll('.preset-btn').forEach(b => {
      const bk = parseInt(b.textContent.replace('k=', ''));
      b.classList.toggle('active', bk === k);
    });
  }

  function setPcaK(k) {
    const slider = document.getElementById('pca-k-slider');
    if (!slider) return;
    const clamped = Math.min(k, parseInt(slider.max));
    slider.value = clamped;
    const kDisp = document.getElementById('pca-k-display');
    if (kDisp) kDisp.textContent = clamped;
    updateSliderGradient(slider);
    document.querySelectorAll('.preset-btn').forEach(b => {
      const bk = parseInt(b.textContent.replace('k=', ''));
      b.classList.toggle('active', bk === clamped);
    });
  }

  async function runPcaCompress() {
    if (!pcaFile) return;
    const slider = document.getElementById('pca-k-slider');
    if (!slider) return;
    const k = parseInt(slider.value);

    const loading = document.getElementById('pca-loading');
    if (loading) loading.classList.add('show');
    const results = document.getElementById('pca-results');
    if (results) results.classList.remove('show');
    const btnCompress = document.getElementById('btn-pca-compress');
    if (btnCompress) btnCompress.disabled = true;

    const form = new FormData();
    form.append('image', pcaFile);
    form.append('k', k);

    try {
      const res = await fetch('/compress_pca', { method: 'POST', body: form });
      const d = await res.json();
      if (!res.ok || d.error) throw new Error(d.error || 'Server error');
      renderPcaResults(d);
    } catch(err) {
      showToast(err.message);
    } finally {
      if (loading) loading.classList.remove('show');
      if (btnCompress) btnCompress.disabled = false;
    }
  }

  function renderPcaResults(d) {
    // Quality color coding
    function qualityClass(metric, value) {
      if (metric === 'psnr')  return value >= 35 ? 'good' : value >= 25 ? 'warn' : 'bad';
      if (metric === 'ssim')  return value >= 0.9 ? 'good' : value >= 0.7 ? 'warn' : 'bad';
      if (metric === 'mse')   return value <= 50  ? 'good' : value <= 300  ? 'warn' : 'bad';
      if (metric === 'cr')    return value >= 2   ? 'good' : 'warn';
      return '';
    }

    // MSE
    const valMse = document.getElementById('pca-val-mse');
    if (valMse) valMse.textContent = d.mse;
    const mseCard = document.getElementById('pca-card-mse');
    if (mseCard) mseCard.className = 'pca-metric-card ' + qualityClass('mse', d.mse);

    // PSNR
    const valPsnr = document.getElementById('pca-val-psnr');
    if (valPsnr) valPsnr.textContent = d.psnr + ' dB';
    const psnrCard = document.getElementById('pca-card-psnr');
    if (psnrCard) psnrCard.className = 'pca-metric-card ' + qualityClass('psnr', d.psnr);

    // SSIM
    const valSsim = document.getElementById('pca-val-ssim');
    if (valSsim) valSsim.textContent = d.ssim;
    const ssimCard = document.getElementById('pca-card-ssim');
    if (ssimCard) ssimCard.className = 'pca-metric-card ' + qualityClass('ssim', d.ssim);

    // Compression Ratio
    const valCr = document.getElementById('pca-val-cr');
    if (valCr) valCr.textContent = d.compression_ratio + '×';
    const crCard = document.getElementById('pca-card-cr');
    if (crCard) crCard.className = 'pca-metric-card ' + qualityClass('cr', d.compression_ratio);

    // k info
    const valK = document.getElementById('pca-val-k');
    if (valK) valK.textContent = d.k_used;
    const valKmax = document.getElementById('pca-val-kmax');
    if (valKmax) valKmax.textContent = d.k_max;
    const kmaxDisp = document.getElementById('pca-kmax-display');
    if (kmaxDisp) kmaxDisp.textContent = d.k_max;

    // Explained Variance per channel
    const ev = d.explained_variance_pct;
    const evR = document.getElementById('pca-ev-r');
    if (evR) evR.textContent = ev[0].toFixed(1) + '%';
    const evG = document.getElementById('pca-ev-g');
    if (evG) evG.textContent = ev[1].toFixed(1) + '%';
    const evB = document.getElementById('pca-ev-b');
    if (evB) evB.textContent = ev[2].toFixed(1) + '%';

    // Images
    const imgOrig = document.getElementById('pca-img-original');
    if (imgOrig) imgOrig.src = 'data:image/png;base64,' + d.original_b64;
    const imgComp = document.getElementById('pca-img-compressed');
    if (imgComp) imgComp.src = 'data:image/png;base64,' + d.compressed_b64;
    const compLbl = document.getElementById('pca-compressed-lbl');
    if (compLbl) compLbl.textContent = (LANG[lang]['pca.compressed.lbl'] || 'Hasil Kompresi') + ' (k=' + d.k_used + ')';

    // Variance chart
    const varChart = document.getElementById('pca-variance-chart');
    if (varChart) varChart.src = 'data:image/png;base64,' + d.variance_chart_b64;

    const pcaResults = document.getElementById('pca-results');
    if (pcaResults) pcaResults.classList.add('show');
    const pcaSec = document.getElementById('pca-section');
    if (pcaSec) pcaSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  applyLang(lang);
  applyTheme(theme);

  document.getElementById('nav-pca-btn')?.addEventListener('click', () => {
    document.getElementById('pca-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  document.getElementById('hero-cta-btn')?.addEventListener('click', scrollToUpload);
  document.getElementById('hero-how-btn')?.addEventListener('click', scrollToHowItWorks);

  document.getElementById('btn-analyze')?.addEventListener('click', runAnalysis);
  document.getElementById('btn-reset')?.addEventListener('click', resetAll);

  document.getElementById('gray-toggle')?.addEventListener('change', toggleGray);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tab = e.currentTarget.dataset.tab;
      switchMatrix(tab, e.currentTarget);
    });
  });

  const pcaSlider = document.getElementById('pca-k-slider');
  if (pcaSlider) {
    pcaSlider.addEventListener('input', (e) => {
      onPcaSliderInput(e.currentTarget);
    });
    pcaSlider.addEventListener('change', (e) => {
      onPcaSliderInput(e.currentTarget);
    });
    updateSliderGradient(pcaSlider);
  }

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const k = parseInt(e.currentTarget.dataset.k);
      setPcaK(k);
    });
  });

  document.getElementById('btn-pca-compress')?.addEventListener('click', runPcaCompress);
  document.getElementById('btn-pca-reset')?.addEventListener('click', resetPca);
