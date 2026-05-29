/* Modern site interactions: mobile nav, news toggle, scroll reveal */
(function () {
  "use strict";

  /* ---- Mobile sidebar ---- */
  var sidebar = document.querySelector(".sidebar");
  var menuBtn = document.querySelector(".menu-btn");
  var scrim = document.querySelector(".scrim");

  function closeNav() {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    if (scrim) scrim.classList.remove("show");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  function toggleNav() {
    if (!sidebar) return;
    var open = sidebar.classList.toggle("open");
    if (scrim) scrim.classList.toggle("show", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
  }

  if (menuBtn) menuBtn.addEventListener("click", toggleNav);
  if (scrim) scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---- Recent News show more / less ---- */
  var newsToggle = document.querySelector(".tl-toggle");
  if (newsToggle) {
    newsToggle.addEventListener("click", function () {
      var hidden = document.querySelectorAll(".tl-hidden");
      var expanded = newsToggle.getAttribute("aria-expanded") === "true";
      hidden.forEach(function (el) {
        el.style.display = expanded ? "none" : "block";
      });
      newsToggle.setAttribute("aria-expanded", String(!expanded));
      newsToggle.innerHTML = expanded
        ? 'Older news <i class="fa-solid fa-chevron-down"></i>'
        : 'Show less <i class="fa-solid fa-chevron-up"></i>';
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
