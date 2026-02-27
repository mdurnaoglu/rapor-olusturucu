const navLinks = Array.from(document.querySelectorAll(".menu a"));
const sections = navLinks
  .map((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (!id) return null;
    return document.getElementById(id);
  })
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.style.opacity = active ? "1" : "0.62";
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

const revealGroups = Array.from(document.querySelectorAll(".reveal-group"));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const children = Array.from(entry.target.children);
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("is-visible");
        }, index * 80);
      });
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealGroups.forEach((group) => revealObserver.observe(group));
