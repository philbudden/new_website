/**
 * form.js - Engagement form handling with anti-spam measures
 */

(function() {
  const FORM_ID = 'engagement-form';
  const MESSAGE_ID = 'form-message';
  const MIN_TIME_MS = 1500; // Minimum time before form can be submitted (1.5 seconds)
  
  let formStartTime = null;

  function init() {
    const form = document.getElementById(FORM_ID);
    if (!form) return;

    // Record when the form becomes interactive
    formStartTime = Date.now();

    // Handle form submission
    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const messageEl = document.getElementById(MESSAGE_ID);

    // Anti-spam check 1: Honeypot field
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      // Silently fail: honeypot was filled (likely a bot)
      resetForm(form);
      return;
    }

    // Anti-spam check 2: Time-to-submit
    const timeElapsed = Date.now() - formStartTime;
    if (timeElapsed < MIN_TIME_MS) {
      // Form submitted too quickly (likely a bot)
      showMessage(messageEl, 'Please take a moment to type your message.', 'error');
      return;
    }

    // Validate required fields
    if (!validateForm(form)) {
      showMessage(messageEl, 'Please fill in all required fields.', 'error');
      return;
    }

    // Form is valid; prepare to submit to third-party handler
    submitForm(form);
  }

  function validateForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    if (!name || !name.value.trim()) return false;
    if (!email || !isValidEmail(email.value.trim())) return false;
    if (!message || !message.value.trim()) return false;

    return true;
  }

  function isValidEmail(email) {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function submitForm(form) {
    const messageEl = document.getElementById(MESSAGE_ID);

    // Disable submit button to prevent double-submission
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Submission will proceed naturally to the form action URL (Formspree)
    // This uses the native form submission which should be more reliable
    // For better UX, we'd ideally fetch instead of submit (to prevent page reload)
    // but native submission is safer for GitHub Pages sites

    // Show a pending message while form processes
    showMessage(messageEl, 'Sending your message...', 'pending');

    // The form will naturally POST to the action URL
    // After a brief delay to allow the user to see the message, allow submission
    setTimeout(() => {
      form.submit();
    }, 500);
  }

  function resetForm(form) {
    form.reset();
    formStartTime = Date.now();
    const messageEl = document.getElementById(MESSAGE_ID);
    if (!messageEl) return;
    messageEl.classList.remove('success');
    messageEl.classList.remove('error');
    messageEl.classList.remove('pending');
    messageEl.innerHTML = '';
  }

  function showMessage(el, message, type) {
    if (!el) return;
    
    el.innerHTML = message;
    el.className = 'form-message';
    
    if (type === 'success') {
      el.classList.add('success');
    } else if (type === 'error') {
      el.classList.add('error');
    } else if (type === 'pending') {
      el.classList.add('pending');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
