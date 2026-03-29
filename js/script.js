/*!
* Custom Script for Premier Pearl Hotel
* Handles animations, navbar behavior and interactive elements.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('mainNav');
    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    // Initial check
    onScroll();
    window.addEventListener('scroll', onScroll);

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 4. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitButton');
    const successMsg = document.getElementById('submitSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (contactForm.checkValidity()) {
                // Mock API call or successful submission
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    contactForm.classList.remove('was-validated');
                    contactForm.reset();
                    submitBtn.innerText = 'Gửi Yêu Cầu';
                    submitBtn.disabled = false;
                    
                    successMsg.classList.remove('d-none');
                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 5000);
                    
                }, 1500);
            } else {
                contactForm.classList.add('was-validated');
            }
        }, false);
    }
});
