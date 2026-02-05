// Handles hero-merged navbar scroll behavior
// Requirements: see premium hero-navbar merge spec

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoImg = document.querySelector('.logo-image');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hero = document.querySelector('.hero');

    // Path to dark logo (for scrolled state)
    const darkLogo = 'assets/images/logo_h.png'; // Replace with dark logo if available
    const lightLogo = 'assets/images/logo_h.png'; // Replace with white/inverted logo if available

    // Helper: set nav link color
    function setNavLinkColor(color) {
        navLinks.forEach(link => {
            link.style.color = color;
        });
    }

    // Helper: set hamburger color
    function setHamburgerColor(color) {
        if (!hamburgerBtn) return;
        hamburgerBtn.querySelectorAll('span').forEach(span => {
            span.style.background = color;
        });
    }

    // On scroll, toggle merged/scrolled state
    function onScroll() {
        const scrollY = window.scrollY;
        const heroHeight = hero ? hero.offsetHeight : 80;
        const threshold = Math.min(heroHeight, 80);
        if (scrollY > threshold) {
            header.classList.add('scrolled');
            setNavLinkColor('hsl(215, 60%, 16%)'); // Deep navy
            if (logoImg) logoImg.src = darkLogo;
            setHamburgerColor('hsl(215, 60%, 16%)');
        } else {
            header.classList.remove('scrolled');
            setNavLinkColor('#fff');
            if (logoImg) logoImg.src = lightLogo;
            setHamburgerColor('#fff');
        }
    }

    // Initial state
    onScroll();
    window.addEventListener('scroll', onScroll);
});
