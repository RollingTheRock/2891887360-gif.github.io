/**
 * Landing Page Animations
 * Every.to inspired interactions and scroll animations
 */

(function () {
  'use strict';

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initScrollReveal();
    initNavScroll();
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
  }

  /**
   * Intersection Observer for scroll-triggered reveal animations
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.landing-reveal');

    if (revealElements.length === 0) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Navigation scroll effect - add/remove 'scrolled' class
   */
  function initNavScroll() {
    const nav = document.getElementById('landing-nav');
    if (!nav) return;

    let ticking = false;

    function updateNav() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > 50) {
        nav.classList.add('landing-nav-scrolled');
      } else {
        nav.classList.remove('landing-nav-scrolled');
      }

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateNav);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    updateNav();
  }

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('is-active');
      menuToggle.setAttribute('aria-expanded', isActive);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        mobileMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuToggle.classList.remove('is-active');
        mobileMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Theme toggle for landing page
   * Syncs with Chirpy's theme system
   */
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply initial theme
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);

      // Sync with Chirpy's theme if available
      if (window.theme) {
        window.theme.switch(currentTheme);
      }
    });

    function applyTheme(theme) {
      const html = document.documentElement;

      if (theme === 'dark') {
        html.setAttribute('data-mode', 'dark');
      } else {
        html.removeAttribute('data-mode');
      }

      // Update toggle icon
      updateThemeIcon(theme);

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent('themechange', { detail: { theme } })
      );
    }

    function updateThemeIcon(theme) {
      const sunIcon = themeToggle.querySelector('.fa-sun');
      const moonIcon = themeToggle.querySelector('.fa-moon');

      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    }

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          currentTheme = e.matches ? 'dark' : 'light';
          applyTheme(currentTheme);
        }
      });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }
})();
