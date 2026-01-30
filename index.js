// =======================
// NAVBAR SCROLL EFFECT
// =======================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

window.addEventListener("load", () => {
    document.querySelector(".animate-left").classList.add("show");
    document.querySelector(".animate-bottom").classList.add("show");
});
