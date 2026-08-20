import './style.css';

/* ---------- Theme toggle (light / dark, white or black background) ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function currentTheme() {
  return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('hurudza-theme', next);
  });
}

/* ---------- Nav: scrolled state + mobile toggle ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Hero animated word rotator ---------- */
const rotatorWords = document.querySelectorAll('#rotator .rotator__word');
let rotatorIndex = 0;

if (rotatorWords.length) {
  setInterval(() => {
    rotatorWords[rotatorIndex].classList.remove('is-active');
    rotatorIndex = (rotatorIndex + 1) % rotatorWords.length;
    rotatorWords[rotatorIndex].classList.add('is-active');
  }, 2400);
}

/* ---------- Reusable carousel (hero + story gallery) ---------- */
function initCarousel({ trackId, slideClass, dotsId, prevId, nextId, interval = 4500 }) {
  const track = document.getElementById(trackId);
  const slides = track ? Array.from(track.querySelectorAll(slideClass)) : [];
  const dotsWrap = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!slides.length) return;

  let current = 0;
  let autoplay;

  function renderDots() {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === current) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dotsWrap.children[current]?.classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dotsWrap.children[current]?.classList.add('is-active');
  }

  function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => goTo(current + 1), interval);
  }

  renderDots();
  startAutoplay();

  nextBtn?.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
}

initCarousel({
  trackId: 'carouselTrack',
  slideClass: '.carousel__slide',
  dotsId: 'carouselDots',
  prevId: 'carouselPrev',
  nextId: 'carouselNext',
});

initCarousel({
  trackId: 'storyGalleryTrack',
  slideClass: '.story__gallery-slide',
  dotsId: 'storyGalleryDots',
  prevId: 'storyGalleryPrev',
  nextId: 'storyGalleryNext',
  interval: 5000,
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => io.observe(el));

/* ---------- Contact form (static demo submit) ---------- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    note.textContent = `Thanks${name ? ', ' + name : ''} — we'll be in touch shortly.`;
    form.reset();
  });
}