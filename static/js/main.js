// main.js (clean + stable)
// --------------------------------------------
// 1) Smooth scroll with sticky-nav offset
// 2) Subtle tilt on .tilt element (optional)
// 3) Footer year
// 4) Premium futuristic mesh background on #techCanvas (stable, always-on)
// --------------------------------------------

(() => {
  // -----------------------------
  // Smooth Scroll (with nav offset)
  // -----------------------------
  function getNavHeight() {
    const nav = document.querySelector(".nav-wrap");
    return nav ? nav.offsetHeight : 72;
  }

  function smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    const navHeight = getNavHeight();
    const top = el.getBoundingClientRect().top + window.pageYOffset - (navHeight + 10);
    window.scrollTo({ top, behavior: "smooth" });
  }

  document.querySelectorAll("[data-scroll]").forEach((node) => {
    node.addEventListener("click", (e) => {
      const target = node.getAttribute("data-scroll");
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(target);
    });
  });

  // -----------------------------
  // Tilt effect (optional)
  // -----------------------------
  const tilt = document.querySelector(".tilt");
  if (tilt) {
    tilt.addEventListener("mousemove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      const rotY = x * 8;
      const rotX = -y * 8;

      tilt.style.transform =
        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-1px)`;
    });

    tilt.addEventListener("mouseleave", () => {
      tilt.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // -----------------------------
  // Footer year
  // -----------------------------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

// -----------------------------
// HERO PARTICLE (ALWAYS RUNNING)
// -----------------------------
const canvas = document.getElementById("techCanvas");
const hero = document.querySelector(".hero");

if (!canvas || !hero) return;

const ctx = canvas.getContext("2d", { alpha: true });

let mouseX = 0;
let mouseY = 0;

const settings = {
  nodeCount: 50,
  maxLinkDist: 120,
  nodeRadius: 0.6,
  nodeSpeed: 0.18,
  lineAlpha: 0.07,
  nodeAlpha: 0.5,
  parallax: 0.0002
};
// ✅ Responsive particle density (NOW in correct place)
if (window.innerWidth < 768) {
  settings.nodeCount = 25;
  settings.nodeRadius = 0.35;
} else if (window.innerWidth < 1200) {
  settings.nodeCount = 35;
}

let nodes = [];

function resizeCanvas() {
  const rect = hero.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function resetNodes() {
  const w = canvas.width;
  const h = canvas.height;

  nodes = Array.from({ length: settings.nodeCount }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * settings.nodeSpeed,
    vy: (Math.random() - 0.5) * settings.nodeSpeed,
  }));
}

function draw() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const px = (mouseX - w / 2) * settings.parallax;
  const py = (mouseY - h / 2) * settings.parallax;

  for (const n of nodes) {
    n.x += n.vx - px;
    n.y += n.vy - py;

    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < settings.maxLinkDist) {
        const alpha = (1 - dist / settings.maxLinkDist) * settings.lineAlpha;
        ctx.strokeStyle = `rgba(200,200,200,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  ctx.fillStyle = `rgba(220,220,220,${settings.nodeAlpha})`;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, settings.nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);   // 🔥 NEVER STOPS
}

document.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

window.addEventListener("resize", () => {
  resizeCanvas();
  resetNodes();
});

resizeCanvas();
resetNodes();
draw();

// ================= PORTFOLIO SYSTEM =================

document.addEventListener("DOMContentLoaded", function() {

  /* ===== MODEL SWITCH ===== */
  const modelItems = document.querySelectorAll(".model-item");
  const viewer = document.getElementById("mainViewer");

  modelItems.forEach(item => {
    item.addEventListener("click", () => {

      modelItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const newSrc = item.getAttribute("data-model");
      viewer.setAttribute("src", newSrc);

    });
  });

  /* ===== VIEW TOGGLE ===== */
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const contents = document.querySelectorAll(".portfolio-content");

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      const target = btn.getAttribute("data-view");

      // Remove active from buttons
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Hide all content
      contents.forEach(c => c.classList.remove("active"));

      // Show selected view
      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.classList.add("active");
      }

    });
  });

});

/* ===== RENDER IMAGE LIGHTBOX ===== */

const renderImages = document.querySelectorAll(".render-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox-close");

renderImages.forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", ()=>{
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove("active");
  }
});
// -----------------------------
// Hero Name Wave Animation (Auto Repeat)
// -----------------------------
const waveName = document.getElementById("waveName");

if (waveName) {
  const originalText = waveName.textContent;
  waveName.innerHTML = "";

  [...originalText].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    waveName.appendChild(span);
  });

  const letters = waveName.querySelectorAll("span");

  function triggerWave() {
    letters.forEach((span, index) => {
      span.style.animation = "none";
      span.offsetHeight; // force reflow
      span.style.animation = `waveUp 1.1s ease ${index * 0.1}s`;
    });
  }

  triggerWave(); // first time

  setInterval(() => {
    triggerWave();
  }, 4000); // every 4 seconds
}

// ===== ABOUT READ MORE (SAFE VERSION) =====
document.querySelectorAll(".read-more-btn").forEach(button => {

  button.addEventListener("click", function(){

    const card = this.closest(".about-card");

    card.classList.toggle("active");

    if(card.classList.contains("active")){
      this.textContent = "Show Less";
    } else {
      this.textContent = "Read More";
    }

  });

});

})();




