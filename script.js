document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.slider img');
  const overlays = document.querySelectorAll('.overlay');
  const total = images.length;
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.remove('active', 'animate-vertical', 'animate-horizontal', 'animate-fade');
      void img.offsetWidth;
    });
    overlays.forEach(overlay => overlay.classList.remove('active'));

    images[index].classList.add('active');

    if (index === 0) {
      images[index].classList.add('animate-vertical');
    } else if (index === 1) {
      images[index].classList.add('animate-horizontal');
    } else if (index === 2) {
      images[index].classList.add('animate-fade');
    }

    setTimeout(() => overlays[index].classList.add('active'), 400);
  }

  function startSlideShow() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      showSlide(currentIndex);
    }, 10000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  showSlide(currentIndex);
  startSlideShow();

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.addEventListener('click', () => {
    stopSlideShow();
    currentIndex = (currentIndex - 1 + total) % total;
    showSlide(currentIndex);
    startSlideShow();
  });

  nextBtn.addEventListener('click', () => {
    stopSlideShow();
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
    startSlideShow();
  });

  // 👇 Aquí colocas la función toggleSection dentro del DOMContentLoaded
  window.toggleSection = function(id) {
    const sections = document.querySelectorAll('.service-section');
    sections.forEach(section => {
      if (section.id === id) {
        section.classList.toggle('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  };
});
