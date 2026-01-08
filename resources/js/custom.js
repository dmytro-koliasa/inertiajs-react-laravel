// Theme switcher functionality
// Runs immediately to prevent flash of unstyled content (FOUC)
(function () {
    const html = document.documentElement;

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme immediately (before DOM is ready)
    html.setAttribute('data-theme', savedTheme);

    // Wait for DOM to set checkbox state and attach event listener
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeSwitcher);
    } else {
        // DOM is already ready
        initThemeSwitcher();
    }

    function initThemeSwitcher() {
        const themeCheckbox = document.getElementById('theme-checkbox');
        if (themeCheckbox) {
            themeCheckbox.checked = savedTheme === 'dark';

            // Toggle theme on checkbox change
            themeCheckbox.addEventListener('change', function () {
                if (this.checked) {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    html.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                }
            });
        }
    }
})();

// Carousel functionality - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Function to scroll to a specific slide
    function scrollToSlide(carouselId, index) {
        const carousel = document.getElementById(`carousel-${carouselId}`);
        if (carousel) {
            const items = carousel.querySelectorAll('.carousel-item');
            if (items[index]) {
                items[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        }
    }

    // Make scrollToSlide available globally for inline onclick handlers
    window.scrollToSlide = scrollToSlide;

    // Navigation for carousel #6
    (function () {
        const carousel6 = document.getElementById('carousel-6');
        const prevBtn6 = document.getElementById('prev-btn-6');
        const nextBtn6 = document.getElementById('next-btn-6');

        if (carousel6 && prevBtn6 && nextBtn6) {
            const items = carousel6.querySelectorAll('.carousel-item');
            let currentIndex = 0;

            function updateCarousel() {
                items.forEach((item, index) => {
                    item.style.scrollSnapAlign =
                        index === currentIndex ? 'center' : 'start';
                });
                items[currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }

            prevBtn6.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            });

            nextBtn6.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            });

            // Handle mouse wheel scrolling
            carousel6.addEventListener('scroll', () => {
                const scrollLeft = carousel6.scrollLeft;
                const itemWidth = items[0].offsetWidth;
                currentIndex = Math.round(scrollLeft / itemWidth);
            });
        }
    })();
});
