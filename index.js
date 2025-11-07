document.addEventListener('DOMContentLoaded', function() {
  // ============================================================================
  // TYPEWRITER EFFECT
  // ============================================================================
  
  const typewriterElement = document.getElementById('typewriter');
  const phrases = ['Max Leblang', 'an Engineer', 'a Programmer', 'a Builder', 'an Entrepreneur'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      // Typing text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    // If we're done typing the current phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1200;
    } 
    // If we're done deleting the current phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing effect with delay
  setTimeout(type, 800);

  // ============================================================================
  // STAGGER ANIMATIONS FOR ELEMENTS
  // ============================================================================

  // Elements with animation will fade in on page load (handled by CSS)
  // This ensures smooth, coordinated reveals

  // ============================================================================
  // SMOOTH SCROLL BEHAVIOR
  // ============================================================================

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

  // ============================================================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ============================================================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe project cards and section titles for fade-in
  document.querySelectorAll('.project-card, .section-title, .cta-content').forEach(el => {
    observer.observe(el);
  });

  // ============================================================================
  // PARALLAX EFFECT ON BACKGROUND GLOWS (SUBTLE)
  // ============================================================================

  let ticking = false;
  window.addEventListener('mousemove', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        const glow1 = document.querySelector('.bg-glow-1');
        const glow2 = document.querySelector('.bg-glow-2');
        
        if (glow1) {
          glow1.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
        if (glow2) {
          glow2.style.transform = `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
});
