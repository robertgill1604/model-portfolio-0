// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.3)';
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.borderBottomColor = '#334155';
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Success message
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to a backend
        console.log('Form submitted with:', { name, email, message });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .achievement-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Progress bar animation
const proficiencyItems = document.querySelectorAll('.proficiency-item');
const animateProgressBars = () => {
    proficiencyItems.forEach(item => {
        const progressFill = item.querySelector('.progress-fill');
        const width = progressFill.style.width;
        progressFill.style.width = '0';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 1.5s ease-in-out';
            progressFill.style.width = width;
        }, 100);
    });
};

// Trigger progress bar animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Scroll to top button (optional)
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.3)';
    });
};

createScrollTopButton();

// Add subtle background animation
const addBackgroundAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }
    `;
    document.head.appendChild(style);
};

addBackgroundAnimation();

// Initialize particles effect (optional lightweight version)
const createParticles = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create a few floating particles
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 300 + 100}px;
            height: ${Math.random() * 300 + 100}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            z-index: 0;
        `;
        
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
        
        heroSection.style.position = 'relative';
        heroSection.insertBefore(particle, heroSection.firstChild);
    }
};

createParticles();

// Tooltip functionality
const addTooltips = () => {
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
};

addTooltips();

// Counter animation for stats
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                let currentValue = 0;
                
                // Extract numeric value
                const numericValue = parseInt(finalValue);
                if (isNaN(numericValue)) return;
                
                const increment = Math.ceil(numericValue / 30);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue;
                    }
                }, 30);
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
};

animateCounters();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Skip to main content with keyboard
    if (e.altKey && e.key === 's') {
        document.querySelector('section[id]')?.focus();
    }
});

// Log initialization
console.log('%cRobert\'s Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c2nd Year BE CSE Student', 'color: #8b5cf6; font-size: 14px;');
