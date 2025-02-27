// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate business cards on scroll
document.querySelectorAll('.business-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    observer.observe(card);
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Add hover effect to navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.1)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
    });
});

// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.classList.add('loaded');
});

// Animate stats when in viewport
const stats = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const updateCount = () => {
            if(current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + '+';
                setTimeout(updateCount, 20);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateCount();
    });
    animated = true;
};

// Observe stats section
const statsSection = document.querySelector('.stats');
if(statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !animated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if(newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if(email) {
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Add smooth reveal animation to feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        observer.observe(card);
    }, index * 100);
}); 