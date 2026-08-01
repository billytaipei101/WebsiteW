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

  function draw() {
    ctx.clearRect(0, 0, width, height);
    var midY = height * 0.55;
    var amp = height * 0.22;

    for (var j = 0; j < ROWS; j++) {
      var rowT = j / (ROWS - 1);
      var rowSpread = (rowT - 0.5) * 2; // -1..1
      var rowFade = 1 - Math.abs(rowSpread) * 0.85;

      for (var i = 0; i < COLS; i++) {
        var colT = i / (COLS - 1);
        var x = colT * width;
        var wave = Math.sin(colT * Math.PI * 2.4 + t + rowSpread * 1.4) * 0.6 +
          Math.sin(colT * Math.PI * 4.2 - t * 0.7 + rowSpread * 2.1) * 0.35;
        var y = midY + rowSpread * height * 0.28 + wave * amp * (0.5 + 0.5 * rowFade);

        var heightFactor = Math.max(0, Math.min(1, (wave + 1) / 2));
        var color = lerpColor(trough, crest, heightFactor * rowFade);
        var alpha = 0.25 + 0.65 * rowFade;
        var radius = (1.2 + 2.6 * heightFactor) * (0.5 + 0.5 * rowFade);

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
