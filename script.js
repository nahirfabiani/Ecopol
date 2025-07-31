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


// ==== CARRUSEL COMPLETO ====
document.addEventListener('DOMContentLoaded', function() {
  // Selección de elementos
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  
  // Verificación de elementos
  if (!track || slides.length === 0) {
    console.error('Elementos del carrusel no encontrados');
    return;
  }

  // Variables de estado
  let currentIndex = 0;
  const slideCount = slides.length;
  let intervalId;
  const intervalDuration = 5000; // 5 segundos

  // Inicialización del carrusel
  function initCarousel() {
    // Posicionar slides
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
    
    // Activar primer slide
    slides[0].classList.add('active');
    resetProgressBar();
  }

  // Mover a slide específico
  function goToSlide(index) {
    // Asegurar que el índice esté dentro del rango
    currentIndex = (index + slideCount) % slideCount;
    
    // Mover el track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar clases activas
    updateActiveSlide();
  }

  // Actualizar slide activo
  function updateActiveSlide() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    resetProgressBar();
  }

  // Reiniciar barra de progreso
  function resetProgressBar() {
    const activeSlide = document.querySelector('.carousel-slide.active');
    if (!activeSlide) return;
    
    const progressBar = activeSlide.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.animation = 'none';
      void progressBar.offsetWidth; // Forzar reflow
      progressBar.style.animation = 'progress 5s linear forwards';
    }
  }

  // Slide siguiente
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Slide anterior
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Iniciar auto-desplazamiento
  function startAutoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, intervalDuration);
  }

  // Detener auto-desplazamiento
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Event listeners para botones
  nextBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    prevSlide();
    startAutoSlide();
  });

  // Touch events para móviles
  let touchStartX = 0;
  
  track.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (diff > 50) nextSlide(); // Swipe izquierda
    if (diff < -50) prevSlide(); // Swipe derecha
    
    startAutoSlide();
  }, { passive: true });

  // Pausar al interactuar
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  // Inicialización
  initCarousel();
  startAutoSlide();
});