document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  const projectOverlay = document.getElementById("projectOverlay");
  const closePopupBtn = document.getElementById("closePopup");
  const popupSliderWrapper = document.getElementById("popupSliderWrapper"); // Wrapper gambar
  const sliderPrevBtn = document.getElementById("sliderPrevBtn"); // Tombol Previous
  const sliderNextBtn = document.getElementById("sliderNextBtn"); // Tombol Next
  const sliderDotsContainer = document.getElementById("sliderDots"); // Kontainer dots

  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");
  const popupTags = document.getElementById("popupTags");

  let currentSlideIndex = 0;
  let currentProjectImages = []; // Untuk menyimpan gambar proyek yang sedang aktif

  // Variabel untuk menyimpan data card asli yang diklik (tidak lagi dipakai untuk clone, tapi untuk menampilkan kembali)
  let originalCardElement = null;

  // Data proyek (pastikan ada gambar untuk setiap proyek)
  const projectsData = {
    project1: {
      images: [
        "assets/images/projects1/project_1.jpg",
        "assets/images/projects1/project_2.jpg",
        "assets/images/projects1/project_3.jpg",
      ],
      title: "Cam-Scanner Web",
      description:
        "Sebuah website detektor judi online yang dikembangkan untuk membantu identifikasi situs-situs ilegal, menggunakan Laravel dan JavaScript untuk fungsionalitas front-end yang dinamis dan efisien.",
      tags: ["Laravel", "JavaScript", "HTML", "CSS"],
    },
    project2: {
      images: [
        "assets/images/projects2/project_1.jpg",
        "assets/images/projects2/project_2.jpg",
        "assets/images/projects2/project_3.jpg",
      ],
      title: "Restaurant App",
      description:
        "Aplikasi mobile yang intuitif untuk pemesanan dan manajemen restoran, dibangun dengan Flutter untuk kinerja lintas platform dan efisiensi database MySQL.",
      tags: ["Flutter", "MySQL", "Dart"],
    },
    project3: {
      images: [
        "assets/images/projects3/project_1.jpg",
        "assets/images/projects3/project_2.jpg",
        "assets/images/projects3/project_3.jpg",
      ],
      title: "Portfolio Website",
      description:
        "Website portofolio pribadi ini menampilkan desain web modern dan responsif, dibangun dengan fondasi HTML, CSS (menggunakan TailwindCSS), dan JavaScript untuk pengalaman pengguna yang interaktif.",
      tags: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
    },
    project4: {
      images: [
        "assets/images/projects4/project_1.jpg",
        "assets/images/projects4/project_2.jpg",
        "assets/images/projects4/project_3.jpg",
      ],
      title: "Restaurant Web",
      description:
        "Website manajemen restoran lengkap dengan fitur pemesanan, menu, dan reservasi, dikembangkan menggunakan Laravel dan MySQL untuk back-end yang kuat, serta PHP untuk pemrosesan server.",
      tags: ["Laravel", "MySQL", "PHP"],
    },
  };

  function updateSlider() {
    if (currentProjectImages.length === 0) {
      popupSliderWrapper.style.transform = `translateX(0)`;
      sliderDotsContainer.innerHTML = "";
      return;
    }
    const offset = -currentSlideIndex * 100;
    popupSliderWrapper.style.transform = `translateX(${offset}%)`;

    // Update dots
    sliderDotsContainer.innerHTML = "";
    currentProjectImages.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.classList.add("slider-dot");
      if (idx === currentSlideIndex) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", () => {
        currentSlideIndex = idx;
        updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
    });
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.dataset.projectId;
      const project = projectsData?.[projectId];

      if (project) {
        // Simpan referensi card asli untuk ditampilkan kembali nanti
        originalCardElement = this;

        // Sembunyikan card asli
        originalCardElement.style.opacity = "0";
        originalCardElement.style.pointerEvents = "none"; // Nonaktifkan klik

        currentProjectImages = project.images;
        currentSlideIndex = 0; // Reset ke gambar pertama setiap kali popup dibuka

        // Bersihkan wrapper dan tambahkan gambar
        popupSliderWrapper.innerHTML = "";
        currentProjectImages.forEach((imageSrc) => {
          const img = document.createElement("img");
          img.src = imageSrc;
          img.alt = project.title;
          popupSliderWrapper.appendChild(img);
        });

        popupTitle.textContent = project.title;
        popupDescription.textContent = project.description;
        popupTags.innerHTML = "";
        project.tags.forEach((tag) => {
          const span = document.createElement("span");
          span.classList.add(
            "px-3",
            "py-1",
            "bg-purple-500",
            "rounded-full",
            "text-sm"
          );
          span.textContent = tag;
          popupTags.appendChild(span);
        });

        // Hapus kelas 'closing' sebelum menambahkan 'active'
        projectOverlay.classList.remove("closing");
        projectOverlay.classList.add("active");
        document.body.style.overflow = "hidden";

        // Update slider setelah gambar dimuat ke DOM
        updateSlider();
      }
    });
  });

  sliderPrevBtn.addEventListener("click", () => {
    currentSlideIndex =
      (currentSlideIndex - 1 + currentProjectImages.length) %
      currentProjectImages.length;
    updateSlider();
  });

  sliderNextBtn.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % currentProjectImages.length;
    updateSlider();
  });

  closePopupBtn.addEventListener("click", closePopup);

  projectOverlay.addEventListener("click", function (e) {
    // Pastikan klik terjadi langsung pada overlay, bukan pada popup
    if (e.target === projectOverlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && projectOverlay.classList.contains("active")) {
      closePopup();
    }
  });

  function closePopup() {
    projectOverlay.classList.remove("active");
    projectOverlay.classList.add("closing"); // Memicu animasi keluar di CSS
    document.body.style.overflow = "auto"; // Mengembalikan scroll pada body

    // Setelah animasi keluar popup selesai, tampilkan kembali card asli
    // Durasi animasi popup keluar adalah 0.6s (sesuai CSS .project-popup)
    setTimeout(() => {
      if (originalCardElement) {
        originalCardElement.style.opacity = "1"; // Tampilkan kembali card asli
        originalCardElement.style.pointerEvents = "auto"; // Aktifkan kembali klik
        originalCardElement = null; // Reset variabel
      }
      projectOverlay.classList.remove("closing"); // Akhirnya sembunyikan overlay
    }, 600); // Sesuaikan dengan durasi transisi popup keluar (0.6s = 600ms)
  }
});
