document.addEventListener("DOMContentLoaded", () => {
    // 1. Accordion implementation (FAQ & Engine & System)
    const accordions = document.querySelectorAll(".accordion-header, .engine-header, .faq-header, .system-header");
    accordions.forEach((acc) => {
        acc.addEventListener("click", function () {
            // Find if this accordion belongs to a group (e.g. system accordion)
            const parentContainer = this.closest('.engine-grid, .faq-container');
            const isActive = this.classList.contains("active");

            // Close all accordions in the same container first (exclusive accordion behavior)
            if (parentContainer) {
                const siblings = parentContainer.querySelectorAll(".accordion-header, .engine-header, .faq-header, .system-header");
                siblings.forEach((sibling) => {
                    sibling.classList.remove("active");
                    const siblingPanel = sibling.nextElementSibling;
                    if (siblingPanel) {
                        siblingPanel.style.maxHeight = null;
                        siblingPanel.classList.remove('active');
                        // Also remove active from parent card if it exists (for styling)
                        const parentCard = sibling.closest('.engine-item');
                        if (parentCard) parentCard.classList.remove('active');
                    }
                });
            }

            // If it wasn't active before we closed everything, open it
            if (!isActive) {
                this.classList.add("active");
                const panel = this.nextElementSibling;
                if (panel) {
                    panel.style.maxHeight = panel.scrollHeight + 60 + "px"; // added extra padding buffer
                    panel.classList.add('active');
                    // Add active to parent card if it exists (for styling)
                    const parentCard = this.closest('.engine-item');
                    if (parentCard) parentCard.classList.add('active');
                }
            }
        });
    });

    // 2. Number Counter Animation on scroll
    const counters = document.querySelectorAll('.counter-value');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // If the element doesn't have a numeric target, just skip or fade
            if (isNaN(target)) return;

            const increment = target / 40;

            let current = 0;
            const updateCounter = () => {
                if (current < target) {
                    current = Math.ceil(current + increment);
                    counter.innerText = current;
                    setTimeout(updateCounter, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // 3. Scroll Intersection Observer for reveal animations & counters
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter if metrics section is visible
                if (entry.target.classList.contains('metrics-section') && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .metrics-section');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetEl = document.querySelector(this.getAttribute('href'));
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
