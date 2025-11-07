document.addEventListener('DOMContentLoaded', function() {
  // ============================================================================
  // TYPEWRITER EFFECT
  // ============================================================================
  
  const typewriterElement = document.getElementById('typewriter');
  const typewriterContainer = document.querySelector('.typewriter-container');
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
  // STABILIZE TYPEWRITER CONTAINER WIDTH (prevents layout shift on mobile)
  // ============================================================================

  function measureAndSetTypewriterWidth() {
    if (!typewriterElement || !typewriterContainer) return;
    const style = getComputedStyle(typewriterElement);
    const measurer = document.createElement('span');
    measurer.style.position = 'absolute';
    measurer.style.visibility = 'hidden';
    measurer.style.whiteSpace = 'pre';
    measurer.style.fontFamily = style.fontFamily;
    measurer.style.fontSize = style.fontSize;
    measurer.style.fontWeight = style.fontWeight;
    measurer.style.letterSpacing = style.letterSpacing;
    measurer.textContent = phrases.reduce((a, b) => (a.length > b.length ? a : b));
    document.body.appendChild(measurer);
    const width = Math.ceil(measurer.getBoundingClientRect().width);
    measurer.remove();
    // Add small padding for cursor and gap; clamp to viewport width
    const extra = 10;
    const maxWidth = Math.max(0, window.innerWidth - 2 * 24); // account for padding
    const finalWidth = Math.min(width + extra, maxWidth);
    typewriterContainer.style.minWidth = finalWidth + 'px';
    typewriterContainer.style.width = finalWidth + 'px';
  }

  // Measure after fonts load for accuracy
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureAndSetTypewriterWidth);
  } else {
    window.addEventListener('load', measureAndSetTypewriterWidth);
  }

  // Recalculate on resize (debounced)
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(measureAndSetTypewriterWidth, 150);
  });

  // Initial measure
  measureAndSetTypewriterWidth();

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
