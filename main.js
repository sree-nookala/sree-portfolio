import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

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

  window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1);
    const targetPage = hash || 'about';
    navigateToPage(targetPage);
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      alert(`Thank you, ${formData.name}! Your message has been received. I'll get back to you at ${formData.email} soon!`);

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
