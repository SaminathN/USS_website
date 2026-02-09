function initCarousel(config) {
    const track = document.getElementById(config.trackId);
    const prevBtn = document.getElementById(config.prevId);
    const nextBtn = document.getElementById(config.nextId);
    const dotsContainer = document.getElementById(config.dotsId);

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = track.children;
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Responsive Config
    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return config.desktopSlides || 3;
        if (window.innerWidth >= 768) return config.tabletSlides || 2;
        return 1;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const limit = totalSlides - getSlidesPerView() + 1;
        // Safety check if slides < view
        const dotsCount = Math.max(0, limit);

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300');
            if (i === currentIndex) {
                dot.classList.add('bg-accent', 'scale-125');
            } else {
                dot.classList.add('bg-gray-600', 'hover:bg-accent');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);

        // Bounds Check
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        // Move Track
        const moveAmount = currentIndex * (100 / slidesPerView);
        track.style.transform = `translateX(-${moveAmount}%)`;

        // Update Dots
        const dots = dotsContainer.children;
        // Re-create dots if resizing changed count significantly or just update style
        // For simplicity, we just update style of existing indexes if they match
        for (let i = 0; i < dots.length; i++) {
            if (i === currentIndex) {
                dots[i].classList.remove('bg-gray-600', 'hover:bg-accent');
                dots[i].classList.add('bg-accent', 'scale-125');
            } else {
                dots[i].classList.add('bg-gray-600', 'hover:bg-accent');
                dots[i].classList.remove('bg-accent', 'scale-125');
            }
        }
    }

    nextBtn.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createDots();
            updateCarousel();
        }, 200);
    });

    // Init
    createDots();
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link'); // Fixed selector class

    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    // Initialize Projects Carousel
    initCarousel({
        trackId: 'carouselTrack',
        prevId: 'prevBtn',
        nextId: 'nextBtn',
        dotsId: 'carouselDots',
        desktopSlides: 3,
        tabletSlides: 2
    });

    // Initialize Services Carousel
    initCarousel({
        trackId: 'servicesTrack',
        prevId: 'servicesPrev',
        nextId: 'servicesNext',
        dotsId: 'servicesDots',
        desktopSlides: 3, // User asked for 3-4. 3 looks better on 1280px container.
        tabletSlides: 2
    });
});
