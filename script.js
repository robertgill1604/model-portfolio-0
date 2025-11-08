// ============================================
// 3D ANIMATIONS AND EFFECTS
// ============================================

// Initialize Three.js 3D Background
function init3DBackground() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const backgroundGroup = new THREE.Group();
    scene.add(backgroundGroup);

    const geometries = [
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.TorusGeometry(1, 0.3, 24, 64),
        new THREE.OctahedronGeometry(1),
        new THREE.TetrahedronGeometry(1.1)
    ];

    const shapes = [];

    for (let i = 0; i < 7; i++) {
        const geometry = geometries[i % geometries.length].clone();
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#667eea'),
            emissive: new THREE.Color('#4f46e5'),
            metalness: 0.2,
            roughness: 0.35,
            transparent: true,
            opacity: 0.85
        });

        const mesh = new THREE.Mesh(geometry, material);
        const basePosition = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
        );

        mesh.position.copy(basePosition);
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        const baseScale = 0.8 + Math.random() * 0.7;
        mesh.scale.setScalar(baseScale);

        backgroundGroup.add(mesh);

        shapes.push({
            mesh,
            basePosition,
            baseScale,
            hueOffset: (i * 45 + Math.random() * 20),
            floatOffset: Math.random() * Math.PI * 2,
            rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            )
        });
    }

    const lights = [
        { color: 0xff6b9d, intensity: 1.1 },
        { color: 0x667eea, intensity: 1 },
        { color: 0x00d9ff, intensity: 1.2 }
    ].map((config, index) => {
        const light = new THREE.PointLight(config.color, config.intensity, 40);
        light.position.set(Math.cos(index) * 6, Math.sin(index) * 4, 6 - index);
        scene.add(light);
        return light;
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const targetRotation = new THREE.Vector2(0, 0);
    const currentRotation = new THREE.Vector2(0, 0);

    function handleMouseMove(event) {
        const normalizedX = event.clientX / window.innerWidth;
        const normalizedY = event.clientY / window.innerHeight;

        targetRotation.x = (normalizedY - 0.5) * 0.8;
        targetRotation.y = (normalizedX - 0.5) * 0.8;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function animate(time = 0) {
        requestAnimationFrame(animate);
        const elapsed = time * 0.001;

        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

        backgroundGroup.rotation.x = currentRotation.x;
        backgroundGroup.rotation.y = currentRotation.y;

        shapes.forEach((shape) => {
            const { mesh, basePosition, baseScale, floatOffset, hueOffset, rotationSpeed } = shape;

            mesh.rotation.x += rotationSpeed.x;
            mesh.rotation.y += rotationSpeed.y;
            mesh.rotation.z += rotationSpeed.z;

            const floatX = Math.cos(elapsed + floatOffset) * 0.6;
            const floatY = Math.sin(elapsed * 1.2 + floatOffset) * 0.6;
            const floatZ = Math.sin(elapsed * 0.8 + floatOffset) * 0.6;

            mesh.position.x = basePosition.x + floatX;
            mesh.position.y = basePosition.y + floatY;
            mesh.position.z = basePosition.z + floatZ;

            const scalePulse = baseScale + Math.sin(elapsed * 2 + floatOffset) * 0.2;
            mesh.scale.setScalar(scalePulse);

            const hue = ((hueOffset + elapsed * 25) % 360) / 360;
            mesh.material.color.setHSL(hue, 0.7, 0.6);
            mesh.material.emissive.setHSL((hue + 0.1) % 1, 0.65, 0.45);
        });

        lights.forEach((light, index) => {
            light.position.x = Math.cos(elapsed * 0.6 + index * 2) * 7;
            light.position.y = Math.sin(elapsed * 0.7 + index * 1.5) * 5;
            light.position.z = Math.sin(elapsed * 0.5 + index) * 6;
        });

        renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
}

// Create Floating 3D Particles with Enhanced Effects
function create3DParticles() {
    const container = document.body;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle particle-3d';
        
        const size = Math.random() * 6 + 2;
        const hue = Math.random() * 120 + 200;
        const saturation = Math.random() * 50 + 50;
        const lightness = Math.random() * 40 + 50;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * 8;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, ${color}, rgba(100, 150, 255, 0.3));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${size * 3}px ${color}, inset -2px -2px ${size}px rgba(0,0,0,0.2);
            animation: float3d ${duration}s ease-in-out infinite, drift ${duration * 1.5}s ease-in-out infinite;
            animation-delay: ${delay}s, ${delay * 0.8}s;
            opacity: ${Math.random() * 0.3 + 0.4};
        `;
        
        container.appendChild(particle);
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Typing Animation for Hero Title
function typeWriter() {
    const text = "Hi, I'm Robert";
    const heroTitle = document.querySelector('.hero-title');
    const textArray = text.split('');
    let index = 0;
    
    function type() {
        if (index < textArray.length) {
            heroTitle.innerHTML = textArray.slice(0, index + 1).join('') + '<span class="cursor">|</span>';
            index++;
            setTimeout(type, 100);
        } else {
            heroTitle.innerHTML = text + '<span class="cursor">|</span>';
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = '0';
                }
            }, 2000);
        }
    }
    
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Animate Skill Bars on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Animate Elements on Scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply initial styles and observe elements
document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        console.log('Form submitted:', { name, email, subject, message });
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Hero parallax handled in enhancedParallax()

// Project Card 3D Hover Effect (Mouse Tracking)
document.querySelectorAll('.project-card-3d').forEach(cardContainer => {
    const card = cardContainer.querySelector('.project-card');
    
    cardContainer.addEventListener('mousemove', function(e) {
        const rect = cardContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    cardContainer.addEventListener('mouseleave', function() {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// Add glow effect to social links
document.querySelectorAll('.social-link, .social-icon').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.5)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Theme Toggle
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
createThemeToggle();

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p style="font-size: 1.2rem; font-weight: 500;">Loading Portfolio...</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Copy Email Functionality
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.textContent.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const email = this.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <span>Email Copied!</span>';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance Optimization - Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Image Error Handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/300x300/6b7280/FFFFFF?text=Image+Not+Found';
    });
});

// Enhanced 3D Scroll Animation for Elements
function init3DScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll="3d"]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            }
        });
    }, { threshold: 0.2 });
    
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(20deg) translateZ(-50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.willChange = 'transform, opacity';
        scrollObserver.observe(el);
    });
}

// Advanced Mouse Tracking for 3D Depth
function init3DMouseTracking() {
    const tiltTargets = document.querySelectorAll('[data-tilt="section"]');
    if (!tiltTargets.length) return;

    const target = { x: 0, y: 0 };
    const states = new Map();

    tiltTargets.forEach((element) => {
        states.set(element, { currentX: 0, currentY: 0 });
        element.style.transformStyle = 'preserve-3d';
        element.style.willChange = 'transform';
    });

    window.addEventListener('mousemove', (event) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 2;
        target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function update() {
        states.forEach((state, element) => {
            state.currentX += ((target.y * -3) - state.currentX) * 0.08;
            state.currentY += ((target.x * 3) - state.currentY) * 0.08;

            element.style.transform = `perspective(1200px) rotateX(${state.currentX}deg) rotateY(${state.currentY}deg)`;
        });

        requestAnimationFrame(update);
    }

    update();
}

// Initialize 3D Effects
window.addEventListener('load', () => {
    try {
        init3DBackground();
    } catch (e) {
        console.log('3D Background initialization skipped', e);
    }
    
    create3DParticles();
    init3DScrollAnimations();
    init3DMouseTracking();
});

// Enhanced Parallax with Multiple Layers
function enhancedParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `perspective(1000px) translateZ(${scrolled * 0.2}px) translateY(${scrolled * 0.3}px)`;
    }
    
    // Project cards parallax
    const projectCards = document.querySelectorAll('.project-card-3d');
    projectCards.forEach((card, index) => {
        const offset = (scrolled * 0.15) + (index * 20);
        card.style.transform = `translateY(${offset}px) perspective(1000px)`;
    });
}

window.addEventListener('scroll', enhancedParallax, { passive: true });

// Scroll-triggered text animation
function initScrollTextAnimations() {
    const textElements = document.querySelectorAll('.hero-title, .section-title, .hero-subtitle');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'neon-glow 3s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        textObserver.observe(el);
    });
}

initScrollTextAnimations();

// Console welcome message
console.log('%c🎨 Welcome to Robert\'s 3D Portfolio!', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
console.log('%c✨ Hover over elements to see 3D effects!', 'font-size: 14px; color: #667eea;');
console.log('%cFeel free to explore the interactive 3D animations!', 'font-size: 14px; color: #6b7280;');
