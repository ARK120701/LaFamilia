// La Familia Adult Day Care Center — site scripts

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('mobile-open');
    });
  }

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
  var revealEls = document.querySelectorAll('.reveal');
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

  /* Gallery filtering */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

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
