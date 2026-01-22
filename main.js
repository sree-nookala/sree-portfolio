document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');

  function navigateToPage(targetPage) {
    const currentPage = document.querySelector('.page.active');

    if (currentPage) {
      currentPage.style.opacity = '0';
      currentPage.style.transform = 'translateY(-20px)';

      setTimeout(() => {
        currentPage.classList.remove('active');

        const targetSection = document.getElementById(targetPage);
        if (targetSection) {
          targetSection.classList.add('active');
          setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
          }, 50);
        }
      }, 300);
    }

    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');
      navigateToPage(targetPage);
      history.pushState({ page: targetPage }, '', `#${targetPage}`);
    });
  });

  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    const targetPage = hash || 'about';
    navigateToPage(targetPage);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon!`);

      contactForm.reset();
    });
  }

  const hash = window.location.hash.substring(1);
  if (hash && ['about', 'projects', 'resume', 'contact'].includes(hash)) {
    navigateToPage(hash);
  } else {
    navigateToPage('about');
  }
});
