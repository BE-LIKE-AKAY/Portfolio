// Projects data
const projectsData = [
    {
        id: 1,
        title: "Chat System",
        description: "Real-time chat application with user authentication, chat rooms, message reactions, and profile management",
        tech: ["Firebase", "HTML", "CSS", "JavaScript"],
        category: "Web Apps",
        demo: "https://be-like-akay.github.io/Friends/",
        github: "https://github.com/BE-LIKE-AKAY/Friends"
    },
    {
        id: 2,
        title: "CSRF PoC Generator",
        description: "Python tool to generate HTML Proof-of-Concept files for testing CSRF vulnerabilities",
        tech: ["Python", "HTML", "Security Testing"],
        category: "Security Tools",
        demo: "https://be-like-akay.github.io/CSRF-PoC-Generator/",
        github: "https://github.com/BE-LIKE-AKAY/CSRF-PoC-Generator"
    },
    {
        id: 3,
        title: "CORS Exploit Tool",
        description: "Lightweight Python script to test and exploit insecure CORS implementations",
        tech: ["Python", "Security Testing", "HTTP"],
        category: "Security Tools",
        demo: "https://be-like-akay.github.io/CORS-Exploit/",
        github: "https://github.com/BE-LIKE-AKAY/CORS-Exploit"
    },
    {
        id: 4,
        title: "Request Analyzer",
        description: "Web-based tool for HTTP request analysis with security header detection and race condition testing",
        tech: ["HTML", "CSS", "JavaScript", "HTTP Security"],
        category: "Security Tools",
        demo: "https://be-like-akay.github.io/request-analyzer/",
        github: "https://github.com/BE-LIKE-AKAY/request-analyzer"
    },
    {
        id: 5,
        title: "OTP Verification Tool",
        description: "Python tool for sending and verifying OTPs using external APIs for 2FA testing",
        tech: ["Python", "API Integration", "Security Testing"],
        category: "Security Tools",
        github: "https://github.com/BE-LIKE-AKAY/Otp-verification-tool"
    },
    {
        id: 6,
        title: "FileInspector",
        description: "Local file scanner for detecting sensitive data like API keys and credentials",
        tech: ["Python", "File Analysis", "Security"],
        category: "Security Tools",
        github: "https://github.com/BE-LIKE-AKAY/FileInspector"
    },
    {
        id: 7,
        title: "Batch File Combiner",
        description: "Bash utility for merging multiple text files for log analysis and data processing",
        tech: ["Bash", "File Processing", "Linux"],
        category: "Security Tools",
        github: "https://github.com/BE-LIKE-AKAY/batch-file-combiner"
    }
];

// Typing animation
class TypingAnimation {
    constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetween = delayBetween;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Particles animation
class ParticlesAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00f5ff', '#8b5cf6', '#00ff88', '#ff6b35'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.connectParticles();
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = 0.1;
                    this.ctx.strokeStyle = '#00f5ff';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.init();
    }
    
    init() {
        // Observe skill items
        document.querySelectorAll('.skill-item').forEach(skill => {
            this.observer.observe(skill);
        });
        
        // Observe stat cards
        document.querySelectorAll('.stat-card').forEach(stat => {
            this.observer.observe(stat);
        });
        
        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            this.observer.observe(card);
        });
        
        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.observer.observe(item);
        });
    }
    
    animateElement(element) {
        if (element.classList.contains('skill-item')) {
            this.animateSkill(element);
        } else if (element.classList.contains('stat-card')) {
            this.animateCounter(element);
        } else if (element.classList.contains('project-card')) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else if (element.classList.contains('timeline-item')) {
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    }
    
    animateSkill(skillItem) {
        skillItem.classList.add('animate');
        const progress = skillItem.querySelector('.skill-progress');
        const width = progress.dataset.width;
        
        setTimeout(() => {
            progress.style.width = width + '%';
        }, 200);
    }
    
    animateCounter(statCard) {
        const numberElement = statCard.querySelector('.stat-number');
        const target = parseInt(numberElement.dataset.target);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(current) + (target >= 15 ? '+' : '');
        }, 40);
    }
}

// Project filtering
class ProjectFilter {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.setupFilterButtons();
    }
    
    renderProjects(filter = 'all') {
        const projectsGrid = document.getElementById('projects-grid');
        const filteredProjects = filter === 'all' ? 
            projectsData : 
            projectsData.filter(project => project.category === filter);
        
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">${project.title.charAt(0)}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">Live Demo</a>` : ''}
                        <a href="${project.github}" target="_blank" class="project-link">GitHub</a>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-observe new project cards
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                scrollAnimations.observer.observe(card);
            });
        }, 100);
    }
    
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter projects
                const filter = button.dataset.filter;
                this.renderProjects(filter);
            });
        });
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.formMessage = document.getElementById('form-message');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }
    
    setupValidation() {
        const inputs = this.form.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Basic validation
        if (field.hasAttribute('required') && !value) {
            this.addFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.addFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    addFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#ff0040';
        field.style.boxShadow = '0 0 10px rgba(255, 0, 64, 0.3)';
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('.form-control');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showMessage('Please correct the errors above', 'error');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateSubmission();
            
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate network delay
        });
    }
    
    setLoadingState(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoader = this.submitBtn.querySelector('.btn-loader');
        
        if (loading) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            this.submitBtn.disabled = true;
        } else {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            this.submitBtn.disabled = false;
        }
    }
    
    showMessage(message, type) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        this.formMessage.classList.remove('hidden');
        
        setTimeout(() => {
            this.formMessage.classList.add('hidden');
        }, 5000);
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Navbar scroll effect
class NavbarEffect {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    const roles = ['Bug Bounty Hunter', 'Android Developer', 'Security Researcher'];
    new TypingAnimation(typingElement, roles, 150, 75, 2000);
    
    // Initialize particles animation
    const canvas = document.getElementById('particles-canvas');
    new ParticlesAnimation(canvas);
    
    // Initialize scroll animations
    window.scrollAnimations = new ScrollAnimations();
    
    // Initialize project filter
    new ProjectFilter();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize navbar effect
    new NavbarEffect();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});