// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#a78bfa';
        }
    });
});

/* ------------------------------------------------------------------
   3D Tilt Interaction
   Tracks the pointer over each card and sets --mx / --my (0-100)
   custom properties, which styles.css uses to drive a live rotation
   and a light "glare" that follows the cursor. This is what makes
   the skill/project/education/cert/achievement/contact/timeline
   cards feel three-dimensional instead of flat hover boxes.
------------------------------------------------------------------- */
(function initTiltCards() {
    const tiltSelectors = [
        '.skill-category',
        '.project-card',
        '.education-card',
        '.cert-card',
        '.achievement-item',
        '.contact-item',
        '.timeline-content'
    ];

    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return; // skip on touch — tilt needs a real pointer

    const cards = document.querySelectorAll(tiltSelectors.join(','));

    cards.forEach(card => {
        card.style.setProperty('--mx', 50);
        card.style.setProperty('--my', 50);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', mx.toFixed(1));
            card.style.setProperty('--my', my.toFixed(1));
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mx', 50);
            card.style.setProperty('--my', 50);
        });
    });
})();

/* ------------------------------------------------------------------
   Hero photo 3D tilt — follows the cursor anywhere in the hero
   section, resets smoothly when the pointer leaves.
------------------------------------------------------------------- */
(function initHeroTilt() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    if (!hero || !heroImage) return;
    if (window.matchMedia('(hover: none)').matches) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0 -> 1
        const py = (e.clientY - rect.top) / rect.height;   // 0 -> 1
        const ry = (px - 0.5) * 16;   // rotateY range
        const rx = (0.5 - py) * 12;   // rotateX range
        heroImage.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        heroImage.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    });

    hero.addEventListener('mouseleave', () => {
        heroImage.style.setProperty('--ry', '-8deg');
        heroImage.style.setProperty('--rx', '4deg');
    });
})();