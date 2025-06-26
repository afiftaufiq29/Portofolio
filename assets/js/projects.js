document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  const projectOverlay = document.getElementById("projectOverlay");
  const closePopupBtn = document.getElementById("closePopup");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");
  const popupTags = document.getElementById("popupTags");
  const mainContent = document.querySelector("main"); // Dapatkan elemen main content

  // Data proyek (Anda bisa mengambil ini dari API atau struktur data lain)
  const projectsData = {
    project1: {
      image: "assets/images/project1.jpg",
      title: "Cam-Scanner Web",
      description:
        "Sebuah website detektor judi online yang dikembangkan untuk membantu identifikasi situs-situs ilegal, menggunakan Laravel dan JavaScript untuk fungsionalitas front-end yang dinamis dan efisien.",
      tags: ["Laravel", "JavaScript", "HTML", "CSS"],
    },
    project2: {
      image: "assets/images/project2.jpg",
      title: "Restaurant App",
      description:
        "Aplikasi mobile yang intuitif untuk pemesanan dan manajemen restoran, dibangun dengan Flutter untuk kinerja lintas platform dan efisiensi database MySQL.",
      tags: ["Flutter", "MySQL", "Dart"],
    },
    project3: {
      image: "assets/images/project3.jpg",
      title: "Portfolio Website",
      description:
        "Website portofolio pribadi ini menampilkan desain web modern dan responsif, dibangun dengan fondasi HTML, CSS (menggunakan TailwindCSS), dan JavaScript untuk pengalaman pengguna yang interaktif.",
      tags: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
    },
    project4: {
      image: "assets/images/project4.jpg",
      title: "Restaurant Web",
      description:
        "Website manajemen restoran lengkap dengan fitur pemesanan, menu, dan reservasi, dikembangkan menggunakan Laravel dan MySQL untuk back-end yang kuat, serta PHP untuk pemrosesan server.",
      tags: ["Laravel", "MySQL", "PHP"],
    },
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.dataset.projectId;
      const project = projectsData?.[projectId]; // Gunakan optional chaining untuk keamanan

      if (project) {
        popupImage.src = project.image;
        popupTitle.textContent = project.title;
        popupDescription.textContent = project.description;
        popupTags.innerHTML = ""; // Bersihkan tag sebelumnya
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

        projectOverlay.classList.remove("closing"); // Hapus kelas closing jika ada
        projectOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Mencegah scroll pada body
      }
    });
  });

  closePopupBtn.addEventListener("click", closePopup);

  // Menutup popup saat mengklik di luar area popup
  projectOverlay.addEventListener("click", function (e) {
    if (e.target === projectOverlay) {
      closePopup();
    }
  });

  // Menutup popup dengan tombol ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && projectOverlay.classList.contains("active")) {
      closePopup();
    }
  });

  function closePopup() {
    projectOverlay.classList.remove("active");
    projectOverlay.classList.add("closing"); // Tambahkan kelas closing untuk animasi keluar
    document.body.style.overflow = "auto"; // Mengembalikan scroll pada body

    // Setelah animasi selesai (durasi transisi CSS), hapus kelas closing
    setTimeout(() => {
      projectOverlay.classList.remove("closing");
    }, 400); // Sesuaikan dengan durasi transisi di CSS
  }
});
