const header = document.querySelector('[data-header]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.72);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.12,
  rootMargin: '-5% 0px -8% 0px'
});

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

if (!reducedMotion) {
  const parallaxElements = [...document.querySelectorAll('[data-parallax]')];
  let scheduled = false;

  const renderParallax = () => {
    const viewportMiddle = window.innerHeight / 2;
    parallaxElements.forEach((element) => {
      const rect = element.parentElement.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - viewportMiddle) * Number(element.dataset.parallax);
      const baseRotation = element.classList.contains('phone-back') || element.classList.contains('bicoudo-back') ? 5 : element.classList.contains('phone-front') || element.classList.contains('bicoudo-front') ? -4 : 0;
      element.style.transform = `translate3d(0, ${progress}px, 0) rotate(${baseRotation}deg)`;
    });
    scheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (!scheduled) {
      requestAnimationFrame(renderParallax);
      scheduled = true;
    }
  }, { passive: true });
  renderParallax();
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
