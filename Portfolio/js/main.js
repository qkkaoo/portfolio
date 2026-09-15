(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigation scroll state ---------- */
  var nav = document.querySelector('.nav');
  var lastState = false;
  function updateNavState() {
    var scrolled = window.scrollY > 40;
    if (scrolled !== lastState) {
      nav.classList.toggle('nav--scrolled', scrolled);
      lastState = scrolled;
    }
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('no-scroll');
  }

  burgerBtn.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('mobile-menu--open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Subtle parallax on the hero mock ---------- */
  var heroVisual = document.querySelector('.hero__visual');
  if (heroVisual && !prefersReducedMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY * 0.08, 40);
          heroVisual.style.transform = 'translateY(' + offset + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
