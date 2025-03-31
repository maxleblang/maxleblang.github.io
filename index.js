document.addEventListener('DOMContentLoaded', function() {
  const typewriterElement = document.getElementById('typewriter');
  const phrases = ['Max Leblang', 'an Engineer', 'a Programmer', 'a Builder', 'an Entrepreneur', 'a Musician'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 75; // Faster when deleting
    } else {
      // Typing text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150; // Slower when typing
    }

    // If we're done typing the current phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingSpeed = 1000; // Wait before deleting
    } 
    // If we're done deleting the current phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
      // Pause before typing new phrase
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing effect
  setTimeout(type, 1000);
});