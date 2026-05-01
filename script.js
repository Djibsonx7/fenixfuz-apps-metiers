// FenixFuz Apps — V5 interactions

const whatsappLinks = document.querySelectorAll('.whatsapp-link');
whatsappLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log('WhatsApp click tracked');
    if (window.gtag) {
      window.gtag('event', 'click_whatsapp_apps', {
        event_category: 'lead',
        event_label: 'apps_metiers'
      });
    }
  });
});

const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const business = form.business.value.trim();
    const need = form.need.value.trim();
    const message = `Bonjour, je m'appelle ${name}. Mon activité est : ${business}. Mon besoin : ${need}`;
    const url = `https://wa.me/221777989238?text=${encodeURIComponent(message)}`;
    if (window.gtag) {
      window.gtag('event', 'submit_apps_form', {
        event_category: 'lead',
        event_label: 'apps_metiers_form'
      });
    }
    window.open(url, '_blank');
  });
}

// Dashboard carousel
const tabs = Array.from(document.querySelectorAll('.tab'));
const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;
let carouselTimer;

function showSlide(index) {
  if (!slides.length) return;
  currentSlide = index % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === currentSlide));
  animateCounters();
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(currentSlide + 1), 4200);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    showSlide(index);
    startCarousel();
  });
});

showSlide(0);
startCarousel();

// Animated counters
function animateCounters() {
  const activeSlide = document.querySelector('.slide.active');
  if (!activeSlide) return;
  const counters = activeSlide.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const isDecimal = String(counter.dataset.target).includes('.');
    let start = 0;
    const duration = 900;
    const startedAt = performance.now();
    function tick(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (target - start) * eased;
      counter.textContent = isDecimal ? value.toFixed(1) + 'M' : Math.round(value) + (target === 94 ? '%' : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Premium tilt effect for showcase cards
const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Scroll reveal polish
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}
