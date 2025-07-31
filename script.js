// ==== NAVBAR TOGGLE ==== 
const navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

ToggleBtnId?.addEventListener("click", () => {
  navId.classList.add("active");
});

CloseBtnId?.addEventListener("click", () => {
  navId.classList.remove("active");
});

// ==== ANIMATE ON SCROLL INIT ==== 
AOS.init();

// ==== GSAP ANIMACIONES ==== 
gsap.from(".logo", { opacity: 0, y: -10, delay: 1, duration: 0.5 });
gsap.from(".nav_menu_list .nav_menu_item", {
  opacity: 0,
  y: -10,
  delay: 1.4,
  duration: 0.5,
  stagger: 0.3,
});
gsap.from(".toggle_btn", { opacity: 0, y: -10, delay: 1.4, duration: 0.5 });
gsap.from(".main-heading", { opacity: 0, y: 20, delay: 2.4, duration: 1 });
gsap.from(".info-text", { opacity: 0, y: 20, delay: 2.8, duration: 1 });
gsap.from(".team_img_wrapper img", { opacity: 0, y: 20, delay: 3, duration: 1 });
gsap.from("#nosotros", { opacity: 0, y: 60, duration: 1.2, ease: "power2.out", delay: 0.5 });

// Modal functionality
const contactModal = document.getElementById('contactModal');
const openModalLinks = document.querySelectorAll('[href="#contacto"]');
const closeModal = document.getElementById('closeModal');
const closeThankYou = document.getElementById('closeThankYou');

// Open modal when clicking contact links
openModalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  contactModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

closeThankYou.addEventListener('click', () => {
  contactModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close when clicking outside modal
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Form submission
const contactForm = document.getElementById('contactForm');
const modalForm = document.getElementById('modalForm');
const thankYouMessage = document.getElementById('thankYouMessage');


 // ==== CAROUSEL ==== 
 
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
        restartProgressBar(slide);
      }
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 10000);
  }

  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  function restartProgressBar(slide) {
    const bar = slide.querySelector('.progress-bar');
    if (bar) {
      bar.classList.remove('animate');
      void bar.offsetWidth; // Forzar reflow
      bar.classList.add('animate');
    }
  }

  nextButton.addEventListener('click', () => {
    stopSlideInterval();
    nextSlide();
    startSlideInterval();
  });

  prevButton.addEventListener('click', () => {
    stopSlideInterval();
    prevSlide();
    startSlideInterval();
  });

  // Swipe support
  let startX = 0;
  let endX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    if (startX - endX > threshold) {
      stopSlideInterval();
      nextSlide();
      startSlideInterval();
    } else if (endX - startX > threshold) {
      stopSlideInterval();
      prevSlide();
      startSlideInterval();
    }
  }

  // Inicializar
  showSlide(currentSlide);
  startSlideInterval();
});
