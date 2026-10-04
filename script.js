/**
 * Probability and Statistics - Final
 * Vanilla JavaScript (script.js)
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Light / Dark / System) ---
  const STORAGE_KEY = 'prob_stat_theme';
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeMenu = document.getElementById('theme-menu');
  const themeIconSlot = document.getElementById('theme-icon-slot');
  const themeLabelSlot = document.getElementById('theme-label-slot');
  const themeOptions = document.querySelectorAll('.theme-option');

  const icons = {
    light: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    dark: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    system: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
  };

  const labels = {
    light: 'สว่าง',
    dark: 'มืด',
    system: 'ระบบ'
  };

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'system';
  }

  function applyTheme(theme) {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update button display
    if (themeIconSlot && icons[theme]) {
      themeIconSlot.innerHTML = icons[theme];
    }
    if (themeLabelSlot && labels[theme]) {
      themeLabelSlot.textContent = labels[theme];
    }

    // Update menu selected states
    themeOptions.forEach(function (opt) {
      if (opt.getAttribute('data-theme-val') === theme) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Initialize theme
  let currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (getSavedTheme() === 'system') {
      applyTheme('system');
    }
  });

  // Toggle dropdown
  if (themeToggleBtn && themeMenu) {
    themeToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = themeMenu.classList.toggle('active');
      themeToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    themeOptions.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const selected = btn.getAttribute('data-theme-val');
        if (selected) {
          applyTheme(selected);
          themeMenu.classList.remove('active');
          themeToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!themeMenu.contains(e.target) && !themeToggleBtn.contains(e.target)) {
        themeMenu.classList.remove('active');
        themeToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 2. Mobile Menu Drawer ---
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const iconMenu = mobileToggleBtn ? mobileToggleBtn.querySelector('.icon-menu') : null;
  const iconClose = mobileToggleBtn ? mobileToggleBtn.querySelector('.icon-close') : null;

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('active');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (iconMenu && iconClose) {
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close mobile menu on nav link click
    const mobileNavLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        if (iconMenu && iconClose) {
          iconMenu.style.display = 'block';
          iconClose.style.display = 'none';
        }
      });
    });
  }
})();
