(() => {
  // Branded loader: reveal promptly even if a browser event is delayed.
  const loader = document.getElementById('site-loader');
  const dismissLoader = () => {
    if (loader) {
      loader.classList.add('is-done');
      window.setTimeout(() => loader.remove(), 500);
    }
  };
  window.addEventListener('load', dismissLoader, { once: true });
  window.setTimeout(dismissLoader, 1600);

  // Custom cursor follows the pointer and becomes a soft ring over interactive items.
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('is-visible');
    }, { passive: true });
    document.addEventListener('pointerover', (event) => {
      cursor.classList.toggle('is-hovering', Boolean(event.target.closest('a,button,[role="button"]')));
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
    document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
  }
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuButton && mobileNav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      mobileNav.hidden = true;
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      mobileNav.hidden = isOpen;
      document.body.classList.toggle('menu-open', !isOpen);
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('.project[data-category]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projects.forEach((project) => {
        project.hidden = filter !== 'all' && project.dataset.category !== filter;
      });
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
