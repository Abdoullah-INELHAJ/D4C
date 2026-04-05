/**
 * D4C Theme - Global JavaScript
 */

/**
 * Global Section/Block Reveal Animations
 */
function initRevealAnimations() {
  const observers = [];
  
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--active');
        if (entry.target.classList.contains('reveal-stagger')) {
           entry.target.classList.add('reveal-stagger--active');
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
});

if (Shopify.designMode) {
    document.addEventListener('shopify:section:load', initRevealAnimations);
}

class D4CTheme {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupScrollAnimations();
    this.setupMenuToggles();
    this.setupStickyHeader();
    this.setupScrollToTop();
  }

  setupLazyLoading() {
    // Basic lazy loading observation
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
          }
        });
      });
      images.forEach(img => observer.observe(img));
    }
  }

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate--fade-in');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      animatedElements.forEach(el => observer.observe(el));
    } else {
      animatedElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  setupMenuToggles() {
    const menuButtons = document.querySelectorAll('[data-menu-toggle]');
    menuButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-menu-toggle');
        const target = document.getElementById(targetId);
        if (target) {
          target.classList.toggle('is-open');
          document.body.classList.toggle('overflow-hidden');
        }
      });
    });
  }

  setupStickyHeader() {
    const header = document.querySelector('.header-wrapper');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('header--sticky');
      } else {
        header.classList.remove('header--sticky');
      }
      lastScroll = currentScroll;
    });
  }

  setupScrollToTop() {
    const scrollButton = document.querySelector('#ScrollToTop');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollButton.classList.add('is-visible');
      } else {
        scrollButton.classList.remove('is-visible');
      }
    });

    scrollButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Initialize theme once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.d4c = new D4CTheme();
});

// Shopify AJAX Cart helpers
window.CartAPI = {
  async getCart() {
    const response = await fetch(`${window.routes.cart_url}.js`);
    return await response.json();
  },

  async addToCart(id, qty = 1) {
    const response = await fetch(`${window.routes.cart_add_url}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id, quantity: qty }] })
    });
    return await response.json();
  }
};
