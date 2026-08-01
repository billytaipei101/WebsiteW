// Decorative dot-wave animation for the "wave" widget (#wave-canvas).
// Plain canvas 2D, no external library. Pauses off-screen and respects
// prefers-reduced-motion.
document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('wave-canvas');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLS = 70;
  var ROWS = 22;
  var dpr = window.devicePixelRatio || 1;
  var width, height, animId, running = false, t = 0;

  // Site accent (--primary, #ff3860) fading to a cooler blue.
  var crest = [255, 56, 96];
  var trough = [58, 107, 216];

  function lerpColor(a, b, f) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f)
    ];
  }

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function hash(n) {
    var x = Math.sin(n) * 43758.5453;
    return x - Math.floor(x);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    var midY = height * 0.52;
    var amp = height * 0.16;
    var band = height * 0.3; // thickness of the ribbon
    var colSpacing = width / (COLS - 1);

    for (var j = 0; j < ROWS; j++) {
      var rowT = j / (ROWS - 1); // 0..1
      var rowOffset = (rowT - 0.5) * band;
      var rowFade = 1 - Math.abs(rowT - 0.5) * 1.7; // fades at top/bottom of ribbon
      var rowPhase = rowT * 0.9;

      for (var i = 0; i < COLS; i++) {
        var colT = i / (COLS - 1);
        var jitter = (hash(i * 12.9898 + j * 78.233) - 0.5) * colSpacing * 0.9;
        var x = colT * width + jitter;

        var wave = Math.sin(colT * Math.PI * 1.3 + t + rowPhase) * 0.75 +
          Math.sin(colT * Math.PI * 6 + t * 1.6 + rowPhase * 2) * 0.15;
        var y = midY + wave * amp + rowOffset;

        // Fade in from the left edge, like the reference.
        var edgeFade = Math.max(0, Math.min(1, colT / 0.3));

        var heightFactor = Math.max(0, Math.min(1, (wave + 1) / 2));
        var visibility = rowFade * edgeFade;
        if (visibility <= 0.02) continue;

        var color = lerpColor(trough, crest, heightFactor);
        var alpha = (0.15 + 0.7 * visibility);
        var radius = (0.5 + 1.7 * heightFactor) * (0.4 + 0.6 * visibility);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha.toFixed(2) + ')';
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function frame() {
    t += 0.012;
    draw();
    animId = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    if (reduceMotion) {
      draw();
    } else {
      animId = requestAnimationFrame(frame);
    }
  }

  function stop() {
    running = false;
    if (animId) cancelAnimationFrame(animId);
  }

  window.addEventListener('resize', function () {
    if (running) resize();
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  } else {
    start();
  }
});
