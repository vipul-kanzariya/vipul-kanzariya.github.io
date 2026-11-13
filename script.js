document.addEventListener("DOMContentLoaded", () => {
  const config = window.PORTFOLIO_CONFIG || {};
  const valid = (value) => typeof value === "string" && value.trim() !== "" && !value.includes("YOUR_") && !value.includes("example.com");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuButton?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
  navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  document.querySelector("#year").textContent = new Date().getFullYear();

  const emailLink = document.querySelector("[data-email-link]");
  const emailSocial = document.querySelector('[data-social="email"]');
  if (valid(config.email)) {
    emailLink.href = `mailto:${config.email}`;
    emailSocial.href = `mailto:${config.email}`;
    document.querySelector("[data-contact-note]").textContent = `You can reach me at ${config.email}.`;
  } else {
    emailLink.href = "#";
    emailLink.addEventListener("click", event => {
      event.preventDefault();
      alert("Please add your email address in config.js before publishing.");
    });
    emailSocial.href = "#";
    emailSocial.addEventListener("click", event => {
      event.preventDefault();
      alert("Please add your email address in config.js before publishing.");
    });
  }

  ["github", "linkedin"].forEach(name => {
    const link = document.querySelector(`[data-social="${name}"]`);
    if (valid(config[name])) {
      link.href = config[name];
    } else {
      link.href = "#";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert(`Please add your ${name} profile URL in config.js before publishing.`);
      });
    }
  });

  ["fittrackDemo", "fittrackCode"].forEach(key => {
    const link = document.querySelector(`[data-link="${key}"]`);
    if (valid(config[key])) {
      link.href = config[key];
    } else {
      link.removeAttribute("target");
      link.addEventListener("click", event => {
        event.preventDefault();
        alert(`Please add the ${key === "fittrackDemo" ? "live demo" : "source code"} URL in config.js.`);
      });
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }
});
