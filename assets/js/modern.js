/* ===================================
   MODERN PORTFOLIO JAVASCRIPT
   Interactive Elements & Animations
   =================================== */

(function() {
  'use strict';

  // ===================================
  // TYPING ANIMATION
  // ===================================
  
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const roles = [
      'Full Stack Developer',
      'Java Developer',
      'Spring Boot Developer',
      'Problem Solver',
      'Tech Enthusiast'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }
      
      setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing animation after page load
    setTimeout(typeRole, 1000);
  }

  // ===================================
  // PARTICLES ANIMATION
  // ===================================
  
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles (reduced count for mobile)
    function initParticles() {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 30 : Math.floor(canvas.width / 10);
      const particleCount = Math.min(baseCount, isMobile ? 30 : 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    // Animation loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect nearby particles
      connectParticles();
      
      animationId = requestAnimationFrame(animateParticles);
    }
    
    // Connect particles with lines
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Initialize and start animation
    initParticles();
    animateParticles();
    
    // Reinitialize on resize
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      initParticles();
      animateParticles();
    });
  }

  // ===================================
  // SMOOTH SCROLL ENHANCEMENT
  // ===================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 60;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===================================
  // NAVIGATION ACTIVE STATE
  // ===================================
  
  const sections = document.querySelectorAll('article[id]');
  const navLinks = document.querySelectorAll('#nav a');
  
  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
    observer.observe(el);
  });

  // ===================================
  // PARALLAX EFFECT ON SCROLL
  // ===================================
  
  const hero = document.querySelector('.modern-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }
    });
  }

  // ===================================
  // MOUSE MOVE EFFECT ON HERO (Desktop Only)
  // ===================================
  
  const heroContent = document.querySelector('.hero-content');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (heroContent && !isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      
      heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // ===================================
  // TECH STACK HOVER EFFECT
  // ===================================
  
  const techItems = document.querySelectorAll('.tech-item');
  techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===================================
  // BUTTON RIPPLE EFFECT
  // ===================================
  
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', createRipple);
    // Add touch support for mobile
    button.addEventListener('touchstart', createRipple);
  });

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================
  
  // Reduce animations on low-end devices
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }

  // ===================================
  // PAGE LOAD ANIMATION
  // ===================================
  
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations
    setTimeout(() => {
      document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 100);
  });

  // ===================================
  // CONSOLE MESSAGE
  // ===================================
  
  console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
  console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #64748b;');

})();
