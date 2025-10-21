// ==== NAVBAR TOGGLE & SCROLL EFFECTS ==== 
const navId = document.getElementById("nav_menu");
const ToggleBtnId = document.getElementById("toggle_btn");
const CloseBtnId = document.getElementById("close_btn");
const header = document.querySelector('.header');

// Mobile menu toggle
ToggleBtnId?.addEventListener("click", () => {
  navId.classList.add("active");
});

CloseBtnId?.addEventListener("click", () => {
  navId.classList.remove("active");
});

// Header scroll effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  }
  
  lastScrollY = currentScrollY;
});

// ==== ANIMATE ON SCROLL INIT ==== 
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// ==== GSAP ANIMACIONES MEJORADAS ==== 
if (typeof gsap !== 'undefined') {
  // Animaciones de entrada suaves
  gsap.from(".logo", { 
    opacity: 0, 
    y: -20, 
    duration: 0.8, 
    ease: "power2.out" 
  });
  
  gsap.from(".nav_menu_list .nav_menu_item", {
    opacity: 0,
    y: -15,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.2,
    ease: "power2.out"
  });
  
  gsap.from(".hero-text-wrapper .main-heading", { 
    opacity: 0, 
    y: 30, 
    duration: 1, 
    delay: 0.5,
    ease: "power2.out" 
  });
  
  gsap.from(".hero-text-wrapper .info-text", { 
    opacity: 0, 
    y: 20, 
    duration: 0.8, 
    delay: 0.8,
    ease: "power2.out" 
  });
}

// ==== FORMULARIO CON VALIDACIÓN MEJORADA ==== 
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm?.querySelectorAll('input, textarea');

// Efectos de focus en inputs
formInputs?.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
});

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
// ==== EFECTOS ADICIONALES ====

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax sutil en hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Intersection Observer para animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.servicios-list .grid-col-item').forEach(el => {
  observer.observe(el);
});

// Efecto de typing en el hero (más sutil)
const heroHeading = document.querySelector('.hero-text-wrapper .main-heading');
if (heroHeading) {
  const text = heroHeading.textContent;
  heroHeading.textContent = '';
  heroHeading.style.borderRight = '2px solid #6366f1';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroHeading.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(() => {
        heroHeading.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  setTimeout(typeWriter, 1000);
}

// ==== MODAL DE AGRADECIMIENTO ====
function closeThanksModal() {
  document.getElementById('thanksModal').style.display = 'none';
}

// Función global para mostrar modal después del envío
window.showThanksModal = function() {
  document.getElementById('thanksModal').style.display = 'flex';
  // Limpiar formulario después de mostrar modal
  setTimeout(() => {
    const form = document.getElementById('contactForm');
    if (form) form.reset();
  }, 100);
};

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeThanksModal();
  }
});

// Cerrar modal al hacer click fuera
document.getElementById('thanksModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeThanksModal();
  }
});

