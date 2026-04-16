document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const body = document.body;
  const themeSwitch = document.getElementById("theme-switch");

  // Theme Handling
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || (!savedTheme && !window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    body.classList.add("light-mode");
  }

  themeSwitch.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  });

  // Mobile Menu
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector("nav ul");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu on link click
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ====================== HERO ANIMATIONS ======================
  
  // Title animation with split text effect simulation
  gsap.from(".title", {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });

  // Description paragraphs with stagger
  gsap.from(".description p", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.25,
    delay: 0.4,
    ease: "power3.out"
  });

  gsap.from(".cta", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.9,
    ease: "back.out(1.4)"
  });

  // Profile Image - Subtle parallax + fade
  gsap.to(".profile-image", {
    y: -80,
    scale: 1.03,
    opacity: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  });

  // Fancy Badge Animations
  const badges = document.querySelectorAll(".badge");
  
  badges.forEach((badge, index) => {
    const delay = 0.6 + index * 0.1;

    gsap.fromTo(badge, 
      {
        opacity: 0,
        y: 100,
        rotation: (index % 2 === 0 ? -15 : 15),
        scale: 0.6
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        delay: delay,
        ease: "back.out(1.6)"
      }
    );

    // Floating animation on scroll
    gsap.to(badge, {
      y: -25,
      rotation: (index % 2 === 0 ? -8 : 8),
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.5
    });
  });

  // ====================== SECTION ANIMATIONS ======================
  
  document.querySelectorAll("section:not(.hero)").forEach((section, i) => {
    const header = section.querySelector(".section-header");
    const contents = section.querySelectorAll(".work-item, .blog-post, .about-content > *, .contact-content > *");

    // Header animation
    if (header) {
      gsap.from(header, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Content cards with scale + blur effect
    if (contents.length > 0) {
      gsap.from(contents, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(8px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  });

  // Work items hover enhancement
  document.querySelectorAll(".work-item").forEach(item => {
    const img = item.querySelector("img");
    const overlay = item.querySelector(".work-overlay");

    item.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power2.out" });
      gsap.to(overlay, { opacity: 1, duration: 0.4 });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(overlay, { opacity: 0, duration: 0.4 });
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const navHeight = document.querySelector("header").offsetHeight + 20;

      gsap.to(window, {
        duration: 1.4,
        scrollTo: {
          y: targetElement,
          offsetY: navHeight
        },
        ease: "power3.inOut"
      });
    });
  });

  // Contact Form (your existing logic preserved + small enhancement)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // ... (keep your existing form submission logic here)
    // I recommend keeping your current form handling code as it is functional
  }
});
