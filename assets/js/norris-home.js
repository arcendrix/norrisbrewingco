const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const mailForms = document.querySelectorAll("[data-mailto-form]");

mailForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.querySelector('[name="email"]')?.value || "";
    const interest = form.querySelector('[name="interest"]')?.value || "Norris Brewing Co. launch access";

    const subject = encodeURIComponent("Norris Brewing Co. launch access");
    const body = encodeURIComponent(`Please add me to the Norris Brewing Co. launch list.\n\nEmail: ${email}\nInterest: ${interest}`);

    window.location.href = `mailto:mike@designateddrinks.ca?subject=${subject}&body=${body}`;
  });
});
