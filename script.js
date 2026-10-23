const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
  }
});

const dateInput = document.querySelector('#visit-date');
const localToday = new Date();
const localDate = new Date(localToday.getTime() - localToday.getTimezoneOffset() * 60000)
  .toISOString().slice(0, 10);
dateInput.min = localDate;

const form = document.querySelector('#reservation-form');
const message = document.querySelector('#form-message');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const date = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
  message.textContent = `Demo preview: ${data.get('party-size')} ${Number(data.get('party-size')) === 1 ? 'guest' : 'guests'} on ${date} at ${data.get('time')}. This is not a booking; nothing has been sent.`;
});

const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

document.querySelectorAll('.hero-image, .dish-photo, .experience-image, .chef-image, .gallery-photo').forEach((image) => {
  const style = getComputedStyle(image);
  const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
  if (!match || !match[1]) return;
  const probe = new Image();
  probe.onerror = () => {
    image.classList.add('image-fallback');
    image.style.backgroundImage = 'linear-gradient(145deg, #38352e, #7b604d 55%, #211f1a)';
  };
  probe.src = match[1];
});
