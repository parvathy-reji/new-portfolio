/* ==================== SLIDING NAVIGATION INDICATOR LINE ==================== */
const navIndicator = document.getElementById('nav-indicator');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('nav-menu');

function updateIndicatorPosition(activeLink) {
    if (!navIndicator || !activeLink) return;
    
    // Position of active link relative to the menu container
    const linkRect = activeLink.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();
    
    const leftOffset = linkRect.left - menuRect.left;
    const linkWidth = linkRect.width;
    
    navIndicator.style.left = `${leftOffset}px`;
    navIndicator.style.width = `${linkWidth}px`;
}

// Initial positioning on page load
window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav-link.active-link');
    if (activeLink) {
        // Wait minor timeout for CSS layout calculations
        setTimeout(() => updateIndicatorPosition(activeLink), 100);
    }
});

// Update indicator position on window resize
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active-link');
    if (activeLink) updateIndicatorPosition(activeLink);
});

/* ==================== MOBILE MENU TOGGLE ==================== */
const navToggle = document.getElementById('nav-toggle');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });
}

// Close mobile navigation drawer on link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links and add to clicked
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
        updateIndicatorPosition(link);
        
        if (navMenu) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });
});

/* ==================== TYPEWRITER EFFECT ==================== */
const typewriterText = document.getElementById('typewriter');
const phrases = [
    "Front-End Developer", 
    "Integrated MCA Student", 
    "Angular Specialist", 
    "Full-Stack Enthusiast"
];
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!typewriterText) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
        typeSpeed = 40; 
    } else {
        typewriterText.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
        typeSpeed = 100; 
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}

if (typewriterText) {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, 1200);
    });
}

/* ==================== SCROLL REVEALS & ACTIVE NAVBAR HIGHLIGHTS ==================== */
const sections = document.querySelectorAll('section[id]');
const revealElements = [
    '.home-content', '.home-img-wrapper',
    '.about-details', '.about-highlight-card',
    '.skills-card',
    '.experience-card',
    '.project-card',
    '.edu-card',
    '.cert-item-card',
    '.contact-card-box', '.contact-form'
];

revealElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
});

// Reveal Intersection Observer
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active Section Navbar Highlight on scroll
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; // offset for nav height
        const sectionId = current.getAttribute('id');
        const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (activeLink && !activeLink.classList.contains('active-link')) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                activeLink.classList.add('active-link');
                updateIndicatorPosition(activeLink);
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== CONTACT FORM HANDLER ==================== */
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const submitBtn = document.getElementById('btn-submit-form');

if (contactForm && contactStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        contactStatus.textContent = '';
        contactStatus.className = 'contact-form-status';

        setTimeout(() => {
            contactStatus.textContent = "Thank you! I will get in touch with you soon.";
            contactStatus.classList.add('status-success');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();

            // Clear status label after showing
            setTimeout(() => {
                contactStatus.style.opacity = '0';
                setTimeout(() => {
                    contactStatus.textContent = '';
                    contactStatus.style.opacity = '1';
                    contactStatus.className = 'contact-form-status';
                }, 400);
            }, 6000);

        }, 1500);
    });
}
