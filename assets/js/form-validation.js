/**
 * Contact Form Validation
 * Validates name, email, and message fields with real-time feedback
 */

(function() {
  'use strict';

  function initFormValidation() {
    const form = document.querySelector('form.gform');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const charCount = document.getElementById('char-count');
    const messageHint = document.querySelector('.message-hint');
    const emailInvalid = document.querySelector('.email-invalid');

    // Email validation regex
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    // Sensitive/inappropriate words list
    const sensitiveWords = [
      'spam', 'scam', 'fuck', 'shit', 'damn', 'bitch', 'asshole', 'bastard',
      'idiot', 'stupid', 'hate', 'kill', 'die', 'death', 'porn', 'sex',
      'viagra', 'casino', 'lottery', 'winner', 'congratulations', 'prize',
      'click here', 'buy now', 'limited time', 'act now', 'urgent'
    ];

    // Check for sensitive words
    function containsSensitiveWords(text) {
      const lowerText = text.toLowerCase();
      return sensitiveWords.some(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'i');
        return regex.test(lowerText);
      });
    }

    // Validate individual field
    function validateField(field) {
      if (!field) return false;

      const value = field.value.trim();

      switch(field.id) {
        case 'name':
          const nameLength = value.length >= 2 && value.length <= 50;
          const noSensitiveInName = !containsSensitiveWords(value);
          return nameLength && noSensitiveInName;
        
        case 'email':
          const email = value.toLowerCase();
          return emailRegex.test(email);
        
        case 'message':
          const length = value.length;
          const validLength = length >= 50 && length <= 500;
          const noSensitiveInMessage = !containsSensitiveWords(value);
          return validLength && noSensitiveInMessage;
        
        default:
          return false;
      }
    }

    // Validate entire form
    function validateForm() {
      const nameValid = validateField(nameInput);
      const emailValid = validateField(emailInput);
      const messageValid = validateField(messageInput);

      // Enable/disable submit button
      if (nameValid && emailValid && messageValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
      }

      return nameValid && emailValid && messageValid;
    }

    // Update character count for message
    function updateCharCount() {
      if (!messageInput || !charCount) return;

      const message = messageInput.value;
      const length = message.length;
      const min = 50;
      const max = 500;

      charCount.textContent = `(${length}/${min}-${max} characters)`;

      // Check for sensitive words first
      if (containsSensitiveWords(message)) {
        charCount.style.color = '#ff4444';
        messageInput.style.borderColor = '#ff4444';
        if (messageHint) {
          messageHint.textContent = 'Message contains inappropriate or spam content';
          messageHint.style.display = 'block';
        }
      }
      // Check length
      else if (length < min) {
        charCount.style.color = '#ff4444';
        messageInput.style.borderColor = '#ff4444';
        if (messageHint) {
          messageHint.textContent = 'Message must be at least 50 characters';
          messageHint.style.display = 'block';
        }
      } else if (length > max) {
        charCount.style.color = '#ff4444';
        messageInput.style.borderColor = '#ff4444';
        if (messageHint) {
          messageHint.textContent = 'Message too long (max 500 characters)';
          messageHint.style.display = 'block';
        }
      } else if (length >= min && length <= max) {
        charCount.style.color = '#4CAF50';
        messageInput.style.borderColor = '#4CAF50';
        if (messageHint) messageHint.style.display = 'none';
      }
    }

    // Validate email on blur
    function validateEmailField() {
      if (!emailInput || !emailInvalid) return;

      const email = emailInput.value.trim();
      if (email && !emailRegex.test(email.toLowerCase())) {
        emailInvalid.style.display = 'block';
        emailInput.style.borderColor = '#ff4444';
      } else {
        emailInvalid.style.display = 'none';
        emailInput.style.borderColor = '';
      }
    }

    // Add visual feedback for name field
    function validateNameField() {
      if (!nameInput) return;

      const name = nameInput.value.trim();
      const nameHint = document.querySelector('.name-hint');
      
      // Check for sensitive words
      if (containsSensitiveWords(name)) {
        nameInput.style.borderColor = '#ff4444';
        if (nameHint) {
          nameHint.textContent = 'Name contains inappropriate content';
          nameHint.style.display = 'block';
          nameHint.style.color = '#ff4444';
        }
      }
      // Check length
      else if (name.length > 50) {
        nameInput.style.borderColor = '#ff4444';
        if (nameHint) {
          nameHint.textContent = 'Name too long (max 50 characters)';
          nameHint.style.display = 'block';
          nameHint.style.color = '#ff4444';
        }
      }
      else if (name.length > 0 && name.length < 2) {
        nameInput.style.borderColor = '#ff4444';
        if (nameHint) {
          nameHint.textContent = 'Minimum 2 characters';
          nameHint.style.display = 'block';
          nameHint.style.color = '#888';
        }
      } 
      else if (name.length >= 2 && name.length <= 50) {
        nameInput.style.borderColor = '#4CAF50';
        if (nameHint) {
          nameHint.style.display = 'none';
        }
      } 
      else {
        nameInput.style.borderColor = '';
        if (nameHint) {
          nameHint.textContent = 'Minimum 2 characters';
          nameHint.style.display = 'block';
          nameHint.style.color = '#888';
        }
      }
    }

    // Event listeners
    if (nameInput) {
      nameInput.addEventListener('input', function() {
        validateNameField();
        validateForm();
      });
      nameInput.addEventListener('blur', validateNameField);
    }

    if (emailInput) {
      emailInput.addEventListener('input', function() {
        validateForm();
      });
      emailInput.addEventListener('blur', validateEmailField);
    }

    if (messageInput) {
      messageInput.addEventListener('input', function() {
        updateCharCount();
        validateForm();
      });
      // Initialize character count
      updateCharCount();
    }

    // Reset button handler
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        setTimeout(function() {
          if (charCount) charCount.textContent = '(0/50-500 characters)';
          if (charCount) charCount.style.color = '#888';
          if (messageHint) messageHint.style.display = 'none';
          if (emailInvalid) emailInvalid.style.display = 'none';
          if (nameInput) nameInput.style.borderColor = '';
          if (emailInput) emailInput.style.borderColor = '';
          validateForm();
        }, 10);
      });
    }

    // Form submit validation
    if (form) {
      form.addEventListener('submit', function(e) {
        if (!validateForm()) {
          e.preventDefault();
          alert('Please fill all required fields correctly:\n\n' +
                '• Name: Minimum 2 characters\n' +
                '• Email: Valid email address\n' +
                '• Message: Between 50-500 characters');
          return false;
        }
      });
    }

    // Initial validation
    validateForm();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
  } else {
    initFormValidation();
  }

})();
