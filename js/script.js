// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll effects
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });

    // Back to top
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // Active section highlight
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`a[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');

                if (entry.target.classList.contains('skills')) animateSkillBars();
                if (entry.target.classList.contains('about')) animateStats();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, .skill-card, .project-card, .stat-card')
        .forEach(el => observer.observe(el));

    function animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => { bar.style.width = width + '%'; }, 200);
        });
    }

    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseFloat(stat.dataset.target);
            let current = 0;
            const increment = target / 50;
            const isDecimal = target % 1 !== 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = isDecimal ? target.toFixed(1) : target + (target > 10 ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current) + (target > 10 ? '+' : '');
                }
            }, 50);
        });
    }

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) return showNotification('Please fill in all fields', 'error');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showNotification('Please enter a valid email address', 'error');

        showNotification("Thank you for your message! I'll get back to you soon.", 'success');
        contactForm.reset();
    });

    function showNotification(message, type) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => container.removeChild(notification), 300);
        }, 5000);
    }

    // Typewriter effect
    function typeWriter() {
        const heroTitle = document.querySelector('.hero-title');
        const fullText = "Hi, I'm Lasya priya";
        let i = 0;
        heroTitle.innerHTML = '';

        function type() {
            if (i < fullText.length) {
                heroTitle.innerHTML += fullText.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                heroTitle.innerHTML = `Hi, I'm <span class="highlight">Lasya priya</span>`;
            }
        }
        setTimeout(type, 1500);
    }

    typeWriter();

    // Hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-icon');
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => img.style.opacity = '1');
        img.addEventListener('error', () => img.style.display = 'none');
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = window.pageYOffset * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    function revealElements() {
        document.querySelectorAll('.skill-card, .project-card, .stat-card, .education-item').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 150) {
                el.classList.add('fade-in-up');
            }
        });
    }

    window.addEventListener('scroll', revealElements);
    revealElements();

    // Ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyle);

    if ('performance' in window) {
        window.addEventListener('load', () => {
            const time = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', time + 'ms');
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `.keyboard-navigation *:focus { outline: 2px solid #2563eb !important; outline-offset: 2px !important; }`;
    document.head.appendChild(keyboardStyle);

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    if (!('scrollBehavior' in document.documentElement.style)) {
        const polyfill = document.createElement('script');
        polyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(polyfill);
    }

    console.log('Portfolio website initialized successfully!');
});

window.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
}, true);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}
