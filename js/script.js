// ===== Scroll Animation =====
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);


// ===== Image Slider =====
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    if (slides.length === 0) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");

    index = (index + 1) % slides.length;
}
setInterval(showSlide, 3000);


// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Toggle menu
menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// Close when clicking menu item
document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// ===== Footer Quick Links: mark current page and show arrow =====
document.addEventListener('DOMContentLoaded', function(){
    const footerLinks = document.querySelectorAll('.footer-links a');
    if(!footerLinks) return;
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    footerLinks.forEach(a => {
        const href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
        if(!href) return;
        if(href === current || (href === 'index.html' && (current === '' || current === 'index.html'))){
            a.classList.add('active');
        }
        // optional: add keyboard focus trigger so arrow appears on focus
        a.addEventListener('focus', () => a.classList.add('active'));
        a.addEventListener('blur', () => a.classList.remove('active'));
    });
});
