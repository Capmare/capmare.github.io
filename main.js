// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => io.observe(el));

// Hero particle canvas
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, pts;

const resize = () => {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  pts = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .25,
    r: Math.random() * 1.2 + .4,
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,58,237,${.12 * (1 - d / 130)})`;
        ctx.lineWidth = .6;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(167,139,250,0.5)';
    ctx.fill();
    pts[i].x += pts[i].vx;
    pts[i].y += pts[i].vy;
    if (pts[i].x < 0 || pts[i].x > W) pts[i].vx *= -1;
    if (pts[i].y < 0 || pts[i].y > H) pts[i].vy *= -1;
  }
  requestAnimationFrame(draw);
};

window.addEventListener('resize', resize);
resize();
draw();
