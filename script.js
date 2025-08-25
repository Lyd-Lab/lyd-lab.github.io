// script.js – minimal interactivity for the portfolio site

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }

  // Simple smooth scroll for internal anchor links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({ top: targetEl.offsetTop - 40, behavior: 'smooth' });
      }
    });
  });
});
