---
layout: page
title: Engagements
permalink: /engagements/
---

I'm actively interested in consulting, contract work, and strategic partnerships. Whether you're looking to build a new system, optimize existing infrastructure, or develop deep data insights, I'd love to hear from you.

## Let's Work Together

Describe your project, challenge, or opportunity, and I'll get back to you promptly with initial thoughts and next steps.

<form id="engagement-form" class="engagements-form" method="POST" action="https://formspree.io/f/YOUR_FORM_ID" novalidate>
  <div id="form-message" class="form-message"></div>

  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="organization">Organization</label>
    <input type="text" id="organization" name="organization">
  </div>

  <div class="form-group">
    <label for="message">Your Message *</label>
    <textarea id="message" name="message" required></textarea>
  </div>

  <!-- Honeypot field -->
  <div class="form-group form-honeypot">
    <label for="website">Website</label>
    <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
  </div>

  <button type="submit" class="form-submit">Send Message</button>
</form>

<div class="email-fallback">
  <p>Or contact me directly at: <a href="mailto:hello@example.com">hello@example.com</a></p>
</div>

<script src="/assets/js/form.js"></script>
