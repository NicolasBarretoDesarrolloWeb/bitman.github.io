// =========================
// SCRIPT PRINCIPAL
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // Siempre empezar arriba al cargar
  window.scrollTo(0, 0);

  // =========================
  // SLIDER DE IMÁGENES (Hero)
  // =========================
  const images = document.querySelectorAll('.slider img');
  const overlays = document.querySelectorAll('.overlay');
  const total = images.length;
  let currentSlideIndex = 0;
  let slideInterval;

  function showSlide(index) {
    images.forEach((img) => {
      img.classList.remove('active', 'animate-vertical', 'animate-horizontal', 'animate-fade');
      void img.offsetWidth; // Reinicia animación
    });
    overlays.forEach((overlay) => overlay.classList.remove('active'));

    images[index].classList.add('active');

    if (index === 0) images[index].classList.add('animate-vertical');
    else if (index === 1) images[index].classList.add('animate-horizontal');
    else if (index === 2) images[index].classList.add('animate-fade');

    setTimeout(() => overlays[index].classList.add('active'), 400);
  }

  function startSlideShow() {
    slideInterval = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % total;
      showSlide(currentSlideIndex);
    }, 10000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  showSlide(currentSlideIndex);
  startSlideShow();

  // Botones del slider
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      stopSlideShow();
      currentSlideIndex = (currentSlideIndex - 1 + total) % total;
      showSlide(currentSlideIndex);
      startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
      stopSlideShow();
      currentSlideIndex = (currentSlideIndex + 1) % total;
      showSlide(currentSlideIndex);
      startSlideShow();
    });
  }

  // =====================
  // MOSTRAR SECCIONES
  // =====================
  window.mostrarSeccion = function (id) {
    const secciones = document.querySelectorAll("section.content-section, #contacto, #proyectos, #redes");
    secciones.forEach(sec => sec.classList.add("hidden"));

    const target = document.getElementById(id);
    if (target) {
      target.classList.remove("hidden");
      target.scrollIntoView({ behavior: "smooth" });
    }

    if (id === "nosotros") {
      const redes = document.getElementById("redes");
      if (redes) redes.classList.remove("hidden");
    }

    // Cerrar menú móvil automáticamente solo en móviles
    if (window.innerWidth < 768) {
      const menuMobile = document.getElementById('menuMobile');
      if (menuMobile && !menuMobile.classList.contains('hidden')) {
        menuMobile.classList.add('hidden');
      }
    }
  };

  mostrarSeccion('nosotros');

  // =====================
  // MOSTRAR CARDS
  // =====================
  window.mostrarCards = function (id) {
    const contenedores = document.querySelectorAll('.cards-container');
    contenedores.forEach(c => c.classList.add('hidden'));

    const mostrar = document.getElementById(id);
    if (mostrar) {
      mostrar.classList.remove('hidden');
      window.scrollTo({ top: mostrar.offsetTop - 100, behavior: 'smooth' });
    }
  };

  // =====================
  // MOSTRAR GALERÍA
  // =====================
  window.mostrarGaleria = function (e) {
    if (e) e.preventDefault();
    const seccion = document.getElementById('proyectos');
    if (seccion) {
      seccion.classList.remove('hidden');
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // =====================
  // FORMULARIO CONTACTO
  // =====================
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', function (event) {
      if (feedback) {
        feedback.style.display = 'none';
        feedback.textContent = '';
      }

      // Validación captcha simple (3 + 4 = 7)
      const captchaValue = form.captcha.value.trim();
      if (captchaValue !== '7') {
        event.preventDefault();
        if (feedback) {
          feedback.style.display = 'block';
          feedback.textContent = 'Error: Respuesta incorrecta. Por favor verifica que no eres un robot.';
        }
        form.captcha.focus();
        return false;
      }
    });
  }

  // =====================
  // GALERÍA MODAL
  // =====================
  const imagesGallery = [
    { src: 'imagenes/extratores.jpg', alt: 'Trabajo 1' },
    { src: 'imagenes/imagen1.jpg', alt: 'Trabajo 2' },
    { src: 'imagenes/ductos de ventilacion.jpg', alt: 'Trabajo 3' },
  ];

  let currentModalIndex = 0;
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');

  window.openModal = function (index) {
    currentModalIndex = index;
    if (modalImage) {
      modalImage.src = imagesGallery[currentModalIndex].src;
      modalImage.alt = imagesGallery[currentModalIndex].alt;
    }
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  window.prevImage = function () {
    currentModalIndex = (currentModalIndex - 1 + imagesGallery.length) % imagesGallery.length;
    if (modalImage) {
      modalImage.src = imagesGallery[currentModalIndex].src;
      modalImage.alt = imagesGallery[currentModalIndex].alt;
    }
  };

  window.nextImage = function () {
    currentModalIndex = (currentModalIndex + 1) % imagesGallery.length;
    if (modalImage) {
      modalImage.src = imagesGallery[currentModalIndex].src;
      modalImage.alt = imagesGallery[currentModalIndex].alt;
    }
  };

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') window.prevImage();
      if (e.key === 'ArrowRight') window.nextImage();
      if (e.key === 'Escape') window.closeModal();
    }
  });

  // =====================
  // MENU MOBILE
  // =====================
  const menuBtn = document.getElementById('menuBtn');
  const menuMobile = document.getElementById('menuMobile');

  if (menuBtn && menuMobile) {
    menuBtn.addEventListener('click', () => {
      menuMobile.classList.toggle('hidden');
    });
  }

  // =====================
  // MENU NAV (desktop)
  // =====================
  const btnMenu = document.getElementById('btnMenu');
  const menuNav = document.getElementById('menuNav');

  if (btnMenu && menuNav) {
    btnMenu.addEventListener('click', () => {
      menuNav.classList.toggle('hidden');
    });
  }

  // =====================
  // TOGGLE SECTION (servicios)
  // =====================
  window.toggleSection = function (id) {
    const sections = document.querySelectorAll('.service-section');
    sections.forEach(section => {
      if (section.id === id) section.classList.toggle('hidden');
      else section.classList.add('hidden');
    });
  };
});

// =====================
// PARTICULAS POLVO BRILLANTE
// =====================
tsParticles.load("particles-js", {
  background: { color: "transparent" },
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: ["#ffffff", "#a855f7", "#ec4899"] },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true, animation: { enable: true, speed: 1, minimumValue: 0.2 } },
    size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 2, minimumValue: 0.5 } },
    move: { enable: true, speed: 0.6, direction: "none", random: true, straight: false, outModes: "out" }
  },
  interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
  detectRetina: true
});
