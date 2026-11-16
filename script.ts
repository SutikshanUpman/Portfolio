const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

// Keep content visible without JavaScript; animate only when it enters view.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.project, section:not(.hero) h2, #about .col-md-8, #experience .col-md-8, #skills .col-md-4').forEach(element => observer.observe(element));
}

// Bootstrap owns the collapse state; use its existing toggle to close the menu.
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (document.getElementById('navigation')?.classList.contains('show')) {
      document.querySelector<HTMLButtonElement>('.navbar-toggler')?.click();
    }
  });
});
