/* ══════════════════════════════════════
   KHUSHI RANI — PORTFOLIO JS
   main.js
══════════════════════════════════════ */

"use strict";

// ── CUSTOM CURSOR ──────────────────────
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();


// ── NAVBAR SCROLL ──────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});


// ── HAMBURGER MENU ────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
});

// Close on nav link click
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});


// ── SCROLL REVEAL ─────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for groups
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach((el, i) => {
  // Auto stagger siblings in the same parent
  const siblings = el.parentElement.querySelectorAll(".reveal");
  let idx = Array.from(siblings).indexOf(el);
  el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});


// ── ROLE ROTATOR ──────────────────────
const roles = document.querySelectorAll(".role");
let currentRole = 0;

function rotateRoles() {
  roles[currentRole].classList.remove("active");
  roles[currentRole].classList.add("exit");

  setTimeout(() => {
    roles[currentRole].classList.remove("exit");
    currentRole = (currentRole + 1) % roles.length;
    roles[currentRole].classList.add("active");
  }, 500);
}

if (roles.length > 0) {
  setInterval(rotateRoles, 2500);
}


// ── STAT COUNTER ──────────────────────
const statNums = document.querySelectorAll(".stat-num");

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));


// ── ACTIVE NAV HIGHLIGHT ──────────────
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinkEls.forEach(link => {
        link.classList.toggle("active-nav", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// ── SMOOTH SCROLL (safety fallback) ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ── CONTACT FORM ─────────────────────
const contactForm = "xlgznqkk";

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector(".btn-submit");
  const originalText = btn.textContent;

  // ── OPTION A: Formspree (recommended, free) ──
  // 1. Go to formspree.io, create account, get your form ID
  // 2. Replace "YOUR_FORM_ID" below with your actual ID

  const FORMSPREE_ID = "YOUR_FORM_ID"; // ← REPLACE THIS

  if (FORMSPREE_ID === "YOUR_FORM_ID") {
    // Placeholder — show instructions
    alert("📌 Setup required:\n\n1. Go to formspree.io\n2. Create a free account\n3. Get your form ID\n4. Replace YOUR_FORM_ID in js/main.js");
    return;
  }

  btn.textContent = "Sending...";
  btn.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "#28ca41";
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (err) {
    btn.textContent = "✗ Error — Try email directly";
    btn.style.background = "#ff5f57";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.disabled = false;
    }, 3000);
  }
});


// ── SKILL PILL HOVER GLOW ─────────────
document.querySelectorAll(".sp").forEach(pill => {
  pill.addEventListener("mouseenter", () => {
    pill.style.boxShadow = "0 0 20px rgba(124,106,247,0.3)";
  });
  pill.addEventListener("mouseleave", () => {
    pill.style.boxShadow = "";
  });
});


// ── PROJECT CARD TILT ─────────────────
document.querySelectorAll(".proj-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// ── PAGE LOAD ANIMATION ───────────────
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  // Trigger hero reveals immediately
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 120);
  });
});

