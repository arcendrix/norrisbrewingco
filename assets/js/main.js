const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

const emailForms = document.querySelectorAll('[data-mailto-form]');
emailForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('[name="email"]')?.value || '';
    const interest = form.querySelector('[name="interest"]')?.value || 'Norris Brewing Co. launch list';
    const subject = encodeURIComponent('Norris Brewing Co. — launch list');
    const body = encodeURIComponent(`Please add me to the Norris Brewing Co. launch list.\n\nEmail: ${email}\nInterest: ${interest}`);
    window.location.href = `mailto:mike@designateddrinks.ca?subject=${subject}&body=${body}`;
  });
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const lines = [];
    for (const [key, value] of data.entries()) {
      lines.push(`${key}: ${value}`);
    }
    const subject = encodeURIComponent('Norris Brewing Co. inquiry');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:mike@designateddrinks.ca?subject=${subject}&body=${body}`;
  });
}
