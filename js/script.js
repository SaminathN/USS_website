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

// Nav scroll behaviour — transparent over hero, solid white on scroll
(function () {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');

    function updateNav() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
            // Restore logo to full colour on white nav
            if (logo) { logo.classList.remove('brightness-0', 'invert'); }
        } else {
            navbar.classList.remove('scrolled');
            // Keep logo white (inverted) on transparent dark nav
            if (logo) { logo.classList.add('brightness-0', 'invert'); }
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run on load
})();

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

    // Quote Form Handling
    const quoteForm = document.getElementById('quote-form');
    const quoteSuccess = document.getElementById('quote-success');
    const quoteError = document.getElementById('quote-error');
    const errorMessage = document.getElementById('error-message');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);

            // Hide previous messages
            quoteSuccess.classList.add('hidden');
            quoteError.classList.add('hidden');

            // Simple client-side validation
            if (!data.name || !data.email || !data.phone || !data.industry || !data.message) {
                quoteError.classList.remove('hidden');
                errorMessage.textContent = 'Please fill in all required fields.';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                quoteError.classList.remove('hidden');
                errorMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            // Construct mailto link
            const subject = `Quote Request: ${data.industry} - ${data.company || data.name}`;
            const body = `Name: ${data.name}%0D%0ACompany: ${data.company}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0AIndustry: ${data.industry}%0D%0ATimeline: ${data.timeline}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;

            // Show success message before opening mail client
            quoteSuccess.classList.remove('hidden');
            quoteForm.reset();

            setTimeout(() => {
                window.location.href = `mailto:sales@uss.org.za,saminan24@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            }, 1500);
        });
    }
});
