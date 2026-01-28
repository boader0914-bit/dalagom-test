/**
 * 큐플컴퍼니 Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Engine Card Toggle
    window.toggleEngineDetail = (card) => {
        // Toggle active class on the clicked card
        card.classList.toggle('active');

        // Optional: Close other cards when one is opened
        const allCards = document.querySelectorAll('.engine-card');
        allCards.forEach(c => {
            if (c !== card) c.classList.remove('active');
        });
    };

    // 2. Scroll Animations (Fade-in)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply animation to sections and cards
    const animatedElements = document.querySelectorAll('.section, .metric-card, .engine-card, .feature-item, .value-item, .drop-flash');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // IntersectionObserver for flash-sequence elements with Loop Logic
    const flashSequences = document.querySelectorAll('.flash-sequence');

    const startFlashLoop = (el) => {
        el.classList.add('visible');

        // Total sequence time (7s + 1s buffer) + 5s pause = 13s total loop
        setTimeout(() => {
            if (el.dataset.intersecting === 'true') {
                el.classList.remove('visible');
                // Short timeout to ensure class removal is registered
                setTimeout(() => startFlashLoop(el), 500);
            }
        }, 12000);
    };

    const flashObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.dataset.intersecting = 'true';
                if (!entry.target.classList.contains('visible')) {
                    startFlashLoop(entry.target);
                }
            } else {
                entry.target.dataset.intersecting = 'false';
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    flashSequences.forEach(el => flashObserver.observe(el));

    // 3. Smooth Scrolling for Navigation
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

    // 4. Header Background Change on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});
