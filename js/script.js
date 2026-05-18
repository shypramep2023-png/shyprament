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

// ===== Footer interactions: newsletter & floating buttons =====
(function(){
    // newsletter form handling
    const form = document.getElementById('newsletter-form');
    const email = document.getElementById('newsletter-email');
    if(form && email){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const val = (email.value || '').trim();
            const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            if(!ok){
                email.style.outline = '2px solid #ffb4b4';
                setTimeout(()=> email.style.outline = '', 1800);
                return;
            }
            // TODO: wire to real endpoint. For now show a success tooltip
            const note = document.querySelector('.newsletter-note');
            if(note){ note.textContent = 'Thank you — subscribed!'; note.style.color = '#9fd7ff'; }
            email.value = '';
            setTimeout(()=>{ if(note) note.textContent = 'Subscribe to get updates on our latest products and offers.'; }, 5000);
        });
    }

    // simple accessibility: add focus outline for floating actions
    const actions = document.querySelectorAll('.action-btn');
    actions.forEach(a => a.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') a.click(); }));
    // move floating actions up when footer bottom is visible to avoid overlap
    try{
        const floating = document.querySelector('.floating-actions');
        const footerBottom = document.querySelector('.footer-bottom');
        if(floating && footerBottom && 'IntersectionObserver' in window){
            const obs = new IntersectionObserver(entries =>{
                entries.forEach(entry =>{
                    if(entry.isIntersecting){
                        floating.classList.add('floating-up');
                    } else {
                        floating.classList.remove('floating-up');
                    }
                });
            }, { root: null, threshold: 0 });
            obs.observe(footerBottom);
        }
    }catch(e){/* ignore */}
})();
