// La Familia Adult Day Care Center — site scripts

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('mobile-open');
      navToggle.classList.toggle('active');
    });
  }

  /* Sticky header — shrinks and gains a shadow once the page is scrolled */
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var onHeaderScroll = function () {
      if (window.scrollY > 40) siteHeader.classList.add('scrolled');
      else siteHeader.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onHeaderScroll, { passive: true });
    onHeaderScroll();
  }

  /* Parallax — elements with .parallax drift at a fraction of scroll speed via data-speed */
  var parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var onParallaxScroll = function () {
      var scrolled = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.12;
        var rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          el.style.transform = 'translateY(' + Math.round(scrolled * speed * 0.1) + 'px)';
        }
      });
    };
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
    onParallaxScroll();
  }

  /* Page transition — fade out before navigating to another page on this site */
  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
      var href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(function () { window.location.href = href; }, 200);
    });
  });

  /* Active nav link highlighting */
  var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      var parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) parentDropdown.classList.add('dropdown-active');
    }
  });

  /* Dropdown nav toggling (Our Services / Resources) */
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parent = btn.closest('.has-dropdown');
      if (!mainNav.classList.contains('mobile-open')) return;
      var wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown').forEach(function (li) {
        li.classList.remove('open');
        li.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Delayed reveal — appears on a timer after page load, not on scroll */
  var delayedEls = document.querySelectorAll('.delayed-reveal');
  if (delayedEls.length) {
    setTimeout(function () {
      delayedEls.forEach(function (el) { el.classList.add('in'); });
    }, 1500);
  }

  var galleryItems = document.querySelectorAll('.gallery-item');

  /* Gallery lightbox */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var lightboxImg = lightbox.querySelector('.lightbox-img');
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var caption = item.getAttribute('data-caption') || '';
        var img = item.querySelector('img');
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxImg && img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Contact form (no backend yet — shows a confirmation message) */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successMsg = document.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

});
