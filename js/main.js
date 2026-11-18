/* ============================================================
   Aarthi Anbalagan — Portfolio interactions
   Vanilla JS, no dependencies. 2025 rebuild.
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Navbar: scrolled state + mobile toggle ---------- */
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    function onScroll() {
      if (window.scrollY > 40) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
      // back to top
      if (window.scrollY > 500) { toTop.classList.add('show'); }
      else { toTop.classList.remove('show'); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // Close mobile menu when a link is clicked
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ---------- Back to top ---------- */
    var toTop = document.getElementById('toTop');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Animate skill bars when visible ---------- */
    var bars = document.querySelectorAll('.bar__fill');
    if ('IntersectionObserver' in window && bars.length) {
      var barIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var w = e.target.getAttribute('data-w');
            e.target.style.width = w;
            barIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { barIO.observe(b); });
    } else {
      bars.forEach(function (b) { b.style.width = b.getAttribute('data-w'); });
    }

    /* ---------- Project filtering ---------- */
    var filters = document.querySelectorAll('#filters .filter');
    var cards = document.querySelectorAll('#projGrid .proj-card');
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        var filter = f.getAttribute('data-filter');
        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-cat') || '').split(' ');
          var show = (filter === 'all') || cats.indexOf(filter) !== -1;
          card.classList.toggle('hide', !show);
        });
      });
    });

    /* ---------- Active nav link on scroll (scroll spy) ---------- */
    var sections = document.querySelectorAll('section[id], div[id="contact"]');
    var linkMap = {};
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(function (a) {
        linkMap[a.getAttribute('href').replace('#', '')] = a;
      });
    }
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.getAttribute('id');
            Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('active'); });
            if (linkMap[id]) { linkMap[id].classList.add('active'); }
          }
        });
      }, { threshold: 0.5, rootMargin: '-20% 0px -55% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }

    onScroll();
  });
})();
