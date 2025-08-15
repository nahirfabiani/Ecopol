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

// GSAP animación para el main heading
document.addEventListener('DOMContentLoaded', function() {
  if (window.gsap) {
    gsap.from(".main-heading", {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: "power2.out"
    });
  }
});

// ==== FORMULARIO ==== 
const contactForm = document.getElementById('contactForm');

// ==== CAROUSEL ==== 
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('button.next-btn');
  const prevButton = document.querySelector('button.prev-btn');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
    });
    if (slides[index]) {
      slides[index].classList.add('active');
      restartProgressBar(slides[index]);
    }
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
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
      void bar.offsetWidth;
      bar.classList.add('animate');
    }
  }

  nextButton?.addEventListener('click', () => {
    stopSlideInterval();
    nextSlide();
    startSlideInterval();
  });

  prevButton?.addEventListener('click', () => {
    stopSlideInterval();
    prevSlide();
    startSlideInterval();
  });

  let startX = 0;
  let endX = 0;
  const track = document.querySelector('.carousel-track');

  if(track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  }

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

  showSlide(currentSlide);
  startSlideInterval();
});
// ==== EFECTO DE TEXTO FUTURISTA EN main heading ====
const heroText = document.querySelector('.hero-text');
const text = heroText.textContent;
heroText.textContent = '';

let index = 0;
function typeEffect() {
  if (index < text.length) {
    heroText.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80); // velocidad de escritura
  }
}
typeEffect();