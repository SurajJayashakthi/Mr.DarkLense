const isMobile = window.innerWidth <= 768;
if (isMobile) document.body.classList.add('mobile-device');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.querySelector('#home').classList.add('in-view');
        }, 500);
    }, 1500);
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (isMobile) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(() => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) currentSection = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
    });

    const backToTop = document.getElementById('back-to-top');
    backToTop.classList.toggle('show', window.scrollY > 200);

    const animatedSections = document.querySelectorAll('[data-animation="scroll-slide"]');
    animatedSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + windowHeight;
        section.classList.toggle('in-view', scrollPosition > sectionTop && window.scrollY < sectionTop + sectionHeight);
    });
}, 100));

// Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    keyboard: { enabled: true },
    a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
    }
});

// Portfolio Swiper
let portfolioSwiper = new Swiper('.swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    slidesPerView: 1,
    spaceBetween: 10,
    keyboard: { enabled: true },
    a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
    },
    breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 } }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const allSlides = Array.from(document.querySelectorAll('.swiper-slide'));

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        if (portfolioSwiper) portfolioSwiper.destroy(true, true);

        swiperWrapper.innerHTML = '';

        const filteredSlides = filter === 'all' ? allSlides : allSlides.filter(slide => slide.getAttribute('data-category') === filter);
        if (filteredSlides.length === 0) {
            swiperWrapper.innerHTML = '<div class="text-center text-white py-4">No images available for this category.</div>';
            return;
        }

        filteredSlides.forEach(slide => swiperWrapper.appendChild(slide));

        portfolioSwiper = new Swiper('.swiper', {
            loop: filteredSlides.length > 1,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
            slidesPerView: 1,
            spaceBetween: 10,
            keyboard: { enabled: true },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            },
            breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 } }
        });
    });
});

function togglePackages(button) {
    const packageList = button.previousElementSibling;
    packageList.classList.toggle('show');
    button.textContent = packageList.classList.contains('show') ? 'Show Less' : 'Show More';
}

particlesJS('hero-particles', {
    particles: {
        number: { value: isMobile ? 20 : 50, density: { enable: true, value_area: 800 } },
        color: { value: '#DAA520' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 2, random: true },
        move: { enable: true, speed: 0.5, direction: 'top', out_mode: 'out' }
    },
    interactivity: { events: { onhover: { enable: !isMobile, mode: 'repulse' } } }
});

function validateForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

document.getElementById('contact-form').addEventListener('submit', e => {
    if (!validateForm(e.target)) {
        e.preventDefault();
    } else {
        e.preventDefault();
        const button = e.target.querySelector('button');
        button.classList.add('loading');
        button.querySelector('.loading-spinner').classList.remove('hidden');
        setTimeout(() => {
            button.classList.remove('loading');
            button.querySelector('.loading-spinner').classList.add('hidden');
            alert('Thank you! We’ll get back to you soon.');
            e.target.reset();
        }, 1000);
    }
});

document.getElementById('quick-book-form').addEventListener('submit', e => {
    if (!validateForm(e.target)) {
        e.preventDefault();
    } else {
        e.preventDefault();
        const button = e.target.querySelector('button');
        button.classList.add('loading');
        button.querySelector('.loading-spinner').classList.remove('hidden');
        setTimeout(() => {
            button.classList.remove('loading');
            button.querySelector('.loading-spinner').classList.add('hidden');
            alert('Booking request sent! We’ll confirm your slot shortly.');
            e.target.reset();
            document.getElementById('booking-modal').classList.add('hidden');
        }, 1000);
    }
});

const modal = document.getElementById('booking-modal');
document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        modal.classList.remove('hidden');
    });
});
document.getElementById('close-modal').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = document.querySelector('#theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});