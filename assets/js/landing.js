/**
 * Landing Page Experience Enhancement
 * Scroll animations, theme toggle, lazy loading, and utilities
 */

(function () {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initScrollReveal();
    initStaggerChildren();
    initThemeToggle();
    initSmoothScroll();
    initLazyImages();
    initExternalLinks();
    initCodeCopy();
    initNavScroll();
    initMobileMenu();
    initBackToTop();
  }

  /**
   * Scroll Reveal Animation
   * Elements with .reveal class fade in when entering viewport
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .landing-reveal');

    if (revealElements.length === 0) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => {
        el.classList.add('revealed', 'is-visible');
      });
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
          entry.target.classList.add('revealed', 'is-visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Stagger Children Animation
   * Parent with .stagger-children will animate children sequentially
   */
  function initStaggerChildren() {
    const staggerParents = document.querySelectorAll('.stagger-children');

    if (staggerParents.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      staggerParents.forEach((parent) => {
        const children = parent.children;
        for (let i = 0; i < children.length; i++) {
          children[i].classList.add('revealed');
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            for (let i = 0; i < children.length; i++) {
              setTimeout(() => {
                children[i].classList.add('revealed');
              }, i * 100); // 100ms stagger delay
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    staggerParents.forEach((parent) => observer.observe(parent));
  }

  /**
   * Theme Toggle
   * Toggle between light and dark mode, persist to localStorage
   */
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply initial theme
    applyTheme(currentTheme);

    // Toggle on click
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);

      // Sync with Chirpy's theme system if available
      if (window.theme && window.theme.switch) {
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

      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent('themechange', { detail: { theme } })
      );
    }

    function updateThemeIcon(theme) {
      const sunIcon = themeToggle.querySelector('.fa-sun, [data-icon="sun"]');
      const moonIcon = themeToggle.querySelector('.fa-moon, [data-icon="moon"]');

      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'inline-block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
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
   * Smooth Scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

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

  /**
   * Lazy Image Loading
   * Images with data-src load when entering viewport
   */
  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      lazyImages.forEach(loadImage);
      return;
    }

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            imageObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    lazyImages.forEach((img) => imageObserver.observe(img));

    function loadImage(img) {
      const src = img.getAttribute('data-src');
      if (!src) return;

      // Add fade-in effect
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';

      img.onload = () => {
        img.style.opacity = '1';
      };

      img.src = src;
      img.removeAttribute('data-src');
    }
  }

  /**
   * External Links
   * Automatically add target="_blank" and rel="noopener" to external links
   */
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href]');
    const currentHost = window.location.hostname;

    links.forEach((link) => {
      const href = link.getAttribute('href');

      // Skip anchor links, javascript:, mailto:, tel:
      if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // Check if external
      try {
        const linkUrl = new URL(href, window.location.origin);
        if (linkUrl.hostname !== currentHost) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');

          // Add external link indicator if not already present
          if (!link.querySelector('.external-link-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt external-link-icon';
            icon.style.fontSize = '0.75em';
            icon.style.marginLeft = '0.25em';
            icon.style.opacity = '0.6';
            link.appendChild(icon);
          }
        }
      } catch (e) {
        // Invalid URL, skip
      }
    });
  }

  /**
   * Code Block Copy Button
   * Add copy button to pre > code blocks
   */
  function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      pre.style.position = 'relative';

      const button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.setAttribute('aria-label', '复制代码');
      button.innerHTML = '<i class="fas fa-copy"></i>';

      // Style the button
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px 10px;
        background: var(--landing-bg-tertiary, #f0f0f0);
        border: 1px solid var(--landing-border-primary, #e0e0e0);
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        color: var(--landing-text-secondary, #666);
        opacity: 0;
        transition: opacity 0.2s, background 0.2s;
      `;

      // Show button on hover
      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });
      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });

      // Copy functionality
      button.addEventListener('click', async () => {
        const code = codeBlock.textContent || codeBlock.innerText;

        try {
          await navigator.clipboard.writeText(code);
          showCopyFeedback(button, 'success');
        } catch (err) {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = code;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showCopyFeedback(button, 'success');
        }
      });

      pre.appendChild(button);
    });

    function showCopyFeedback(button, type) {
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i>';
      button.style.background = '#22c55e';
      button.style.color = 'white';

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.color = '';
      }, 2000);
    }
  }

  /**
   * Navigation Scroll Effect
   * Add background blur when scrolling
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

    updateNav();
  }

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('is-active');
      menuToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    // Show/hide based on scroll position
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 500) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }
      },
      { passive: true }
    );

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
})();
