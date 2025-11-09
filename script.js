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
            color: new THREE.Color('#00ffff'),
            emissive: new THREE.Color('#00d4ff'),
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
        { color: 0xff00ff, intensity: 1.2 },
        { color: 0x00ffff, intensity: 1.3 },
        { color: 0x00d4ff, intensity: 1.1 }
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

            const hue = ((hueOffset + elapsed * 30) % 120 + 180) / 360;
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
        const hue = Math.random() * 60 + (Math.random() > 0.5 ? 180 : 300);
        const saturation = Math.random() * 50 + 50;
        const lightness = Math.random() * 40 + 50;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * 8;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, ${color}, rgba(0, 255, 255, 0.2));
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
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 70; // Adjust for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Consolidated Scroll Handler for Better Performance
let ticking = false;
let lastScrollY = 0;

function handleScroll() {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollEffects(lastScrollY);
            ticking = false;
        });
        ticking = true;
    }
}

function updateScrollEffects(scrollY) {
    // Active Navigation Link
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
    
    // Navbar Background
    const navbar = document.querySelector('.navbar');
    if (scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.2)';
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

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

// Animate Skill Bars on Scroll - Optimized
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0';
                // Stagger animations for better effect
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 150 + (index * 50));
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}


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
        background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%);
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

// Enhanced Scroll Animations - Optimized
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                entry.target.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
});

document.querySelectorAll('.scroll-reveal').forEach(element => {
    scrollObserver.observe(element);
});

document.querySelectorAll('.contact-item').forEach(item => {
    if (item.textContent.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const email = this.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <span>Email Copied!</span>';
                this.style.color = '#00ffff';
                
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

// Performance Optimization - Debounce (now integrated in handleScroll)
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

// Image Error Handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/300x300/6b7280/FFFFFF?text=Image+Not+Found';
    });
});

// Enhanced 3D Scroll Animation for Elements - Optimized
function init3DScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll="3d"]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'perspective(1000px) rotateX(0deg) translateZ(0)';
                // Remove will-change after animation completes
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 800);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'perspective(1000px) rotateX(15deg) translateZ(-30px)';
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.willChange = 'transform, opacity';
        scrollObserver.observe(el);
    });
}

// Advanced Mouse Tracking for 3D Depth - Optimized
function init3DMouseTracking() {
    const tiltTargets = document.querySelectorAll('[data-tilt="section"]');
    if (!tiltTargets.length) return;
    
    // Disable on mobile/touch devices for better performance
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        return;
    }

    const target = { x: 0, y: 0 };
    const states = new Map();
    let isMouseMoving = false;
    let mouseTimeout;

    tiltTargets.forEach((element) => {
        states.set(element, { currentX: 0, currentY: 0 });
        element.style.transformStyle = 'preserve-3d';
    });

    window.addEventListener('mousemove', (event) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 2;
        target.y = (event.clientY / window.innerHeight - 0.5) * 2;
        
        if (!isMouseMoving) {
            isMouseMoving = true;
            states.forEach((state, element) => {
                element.style.willChange = 'transform';
            });
        }
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            states.forEach((state, element) => {
                element.style.willChange = 'auto';
            });
        }, 200);
    }, { passive: true });

    function update() {
        states.forEach((state, element) => {
            // Reduced tilt intensity for smoother effect
            state.currentX += ((target.y * -2) - state.currentX) * 0.06;
            state.currentY += ((target.x * 2) - state.currentY) * 0.06;

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

// Enhanced Parallax with Multiple Layers - Optimized
let parallaxTicking = false;

function enhancedParallax() {
    const scrolled = window.pageYOffset;
    
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            // Hero parallax - reduced intensity for smoother performance
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight * 1.5) {
                // Only apply parallax when hero is visible
                hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
            
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
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

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    let progressTicking = false;
    
    function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
        progressTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!progressTicking) {
            window.requestAnimationFrame(updateProgress);
            progressTicking = true;
        }
    }, { passive: true });
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================

function initCursorTrail() {
    let lastTime = 0;
    const throttleTime = 50;
    
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTime < throttleTime) return;
        lastTime = currentTime;
        
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 800);
    }, { passive: true });
}

// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================

function initEnhancedScrollAnimations() {
    const animationTypes = {
        'fade-in': { opacity: 0 },
        'slide-in-up': { opacity: 0, transform: 'translateY(40px)' },
        'slide-in-left': { opacity: 0, transform: 'translateX(-40px)' },
        'slide-in-right': { opacity: 0, transform: 'translateX(40px)' },
        'zoom-in': { opacity: 0, transform: 'scale(0.9)' }
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                });
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    Object.keys(animationTypes).forEach(type => {
        document.querySelectorAll(`[data-scroll-effect="${type}"]`).forEach(el => {
            Object.assign(el.style, animationTypes[type]);
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            scrollObserver.observe(el);
        });
    });
}

// ============================================
// STAGGER ANIMATIONS FOR ELEMENTS
// ============================================

function initStaggerAnimations() {
    const staggerGroups = [
        { selector: '.project-card-3d', animation: 'animate-fadeInUp', baseDelay: 100 },
        { selector: '.skill-category', animation: 'animate-fadeInLeft', baseDelay: 150 },
        { selector: '.timeline-item', animation: 'animate-fadeInRight', baseDelay: 200 },
        { selector: '.stat', animation: 'animate-scaleIn', baseDelay: 100 }
    ];
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('[data-stagger]');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.classList.add(el.dataset.animation || 'animate-fadeInUp');
                            el.style.opacity = '1';
                        });
                    }, index * parseInt(el.dataset.staggerDelay || 100));
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-stagger-group]').forEach(group => {
        staggerObserver.observe(group);
    });
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// ANIMATED NUMBER COUNTERS
// ============================================

function initAnimatedCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.dataset.count);
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let current = 0;
                
                function updateCounter() {
                    current += increment;
                    if (current < finalValue) {
                        target.textContent = Math.ceil(current) + (target.dataset.suffix || '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue + (target.dataset.suffix || '+');
                    }
                }
                
                updateCounter();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-count]').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ============================================
// PARALLAX TEXT EFFECTS
// ============================================

function initParallaxText() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let parallaxTicking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax || 0.5);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });
}

// ============================================
// MAGNETIC BUTTONS EFFECT
// ============================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-link, .social-icon');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// TEXT REVEAL ANIMATIONS
// ============================================

function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const words = text.split(' ');
                entry.target.textContent = '';
                entry.target.style.opacity = '1';
                
                words.forEach((word, index) => {
                    const span = document.createElement('span');
                    span.textContent = word + ' ';
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
                    entry.target.appendChild(span);
                });
                
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        textObserver.observe(el);
    });
}

// ============================================
// SKILL BAR PERCENTAGE DISPLAY
// ============================================

function initSkillPercentages() {
    document.querySelectorAll('.skill-item').forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentage = progressBar.style.width;
        
        const percentSpan = document.createElement('span');
        percentSpan.className = 'skill-percentage';
        percentSpan.textContent = percentage;
        percentSpan.style.cssText = `
            position: absolute;
            right: 0;
            top: -25px;
            font-size: 0.85rem;
            color: #a78bfa;
            font-weight: 600;
        `;
        
        item.style.position = 'relative';
        item.insertBefore(percentSpan, item.firstChild);
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    let scrollTicking = false;
    
    function checkScroll() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
        scrollTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(checkScroll);
            scrollTicking = true;
        }
    }, { passive: true });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMATED BACKGROUND GRADIENT
// ============================================

function initAnimatedGradients() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const currentBg = window.getComputedStyle(section).backgroundColor;
        if (currentBg && currentBg !== 'rgba(0, 0, 0, 0)') {
            section.style.backgroundSize = '400% 400%';
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ============================================

function initLazyAnimations() {
    const lazyElements = document.querySelectorAll('[data-animate]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationClass = entry.target.dataset.animate;
                entry.target.classList.add(animationClass);
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// ============================================
// SMOOTH REVEAL FOR IMAGES
// ============================================

function initImageReveal() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                
                img.addEventListener('load', () => {
                    requestAnimationFrame(() => {
                        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    });
                });
                
                if (img.complete) {
                    requestAnimationFrame(() => {
                        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    });
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// FORM SUBMISSION ANIMATION
// ============================================

function enhanceFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        this.classList.add('submitting');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.classList.remove('submitting');
        }, 3000);
    });
}

// ============================================
// DYNAMIC PARTICLE BACKGROUND
// ============================================

function initDynamicParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'h':
                    e.preventDefault();
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'p':
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'c':
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
        
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// ============================================
// HOVER SOUND EFFECTS (OPTIONAL)
// ============================================

function initHoverEffects() {
    const hoverElements = document.querySelectorAll('.btn, .project-card, .skill-category');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ============================================
// TEXT GLITCH EFFECT (for special elements)
// ============================================

function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const originalText = this.textContent;
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            let iterations = 0;
            
            const interval = setInterval(() => {
                this.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });
}

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================

function initAllAnimations() {
    initScrollProgress();
    initScrollToTop();
    
    if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        initCursorTrail();
        initMagneticButtons();
    }
    
    initEnhancedScrollAnimations();
    initStaggerAnimations();
    initRippleEffect();
    initAnimatedCounters();
    initParallaxText();
    initTextReveal();
    initSkillPercentages();
    initAnimatedGradients();
    initLazyAnimations();
    initImageReveal();
    enhanceFormSubmission();
    initDynamicParticles();
    initKeyboardShortcuts();
    initHoverEffects();
    initGlitchEffect();
}

// Initialize all animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// Console welcome message
console.log('%c🎨 Welcome to Robert\'s 3D Portfolio!', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
console.log('%c✨ Hover over elements to see 3D effects!', 'font-size: 14px; color: #667eea;');
console.log('%cFeel free to explore the interactive 3D animations!', 'font-size: 14px; color: #6b7280;');
