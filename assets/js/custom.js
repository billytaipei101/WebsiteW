// Reveal-on-scroll for [data-stats-reveal] elements (see stats.html widget).
// Vanilla IntersectionObserver, no external animation library required.
document.addEventListener('DOMContentLoaded', function () {
  var targets = document.querySelectorAll('[data-stats-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(function (el) { observer.observe(el); });
});
