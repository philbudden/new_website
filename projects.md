---
layout: page
title: Projects
permalink: /projects/
---

<div class="projects-grid">
  {% for project in site.data.projects %}
    <div class="project-card">
      <h3>{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <a href="{{ project.github_url }}" class="project-link" target="_blank" rel="noopener noreferrer">
        View on GitHub <span aria-hidden="true">→</span><span class="sr-only">(opens in new tab)</span>
      </a>
    </div>
  {% endfor %}
</div>
