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

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll progress bar */
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  var onProgressScroll = function () {
    var docEl = document.documentElement;
    var scrollable = docEl.scrollHeight - docEl.clientHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', onProgressScroll, { passive: true });
  onProgressScroll();

  /* Back to top button */
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(backToTop);
  var onBackToTopScroll = function () {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onBackToTopScroll, { passive: true });
  onBackToTopScroll();
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* Button click ripple */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 1.6;
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* Animated stat counters */
  var statEls = document.querySelectorAll('.stat strong, .accent-card strong');
  if (statEls.length) {
    var animateCounter = function (el) {
      var text = el.textContent.trim();
      var match = text.match(/^(\d+)(.*)$/);
      if (!match || text.indexOf(':') !== -1) return;
      var target = parseInt(match[1], 10);
      var suffix = match[2];
      if (prefersReducedMotion) return;
      var duration = 1200;
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      statEls.forEach(function (el) { statObserver.observe(el); });
    }
  }

  /* 3D tilt on hover for service/value cards */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.service-card, .value-card').forEach(function (card) {
      card.classList.add('tilt');
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 8) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

});
