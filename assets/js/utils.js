/**
 * utils.js - Shared utility functions for search and filtering
 */

/**
 * Parse query string parameters from the URL
 * @returns {Object} Key-value pairs of query parameters
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

/**
 * Update the URL query string without reloading the page
 * @param {Object} params - Parameters to set in the query string
 */
function updateQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key]) {
      searchParams.set(key, params[key]);
    }
  });
  const newUrl = window.location.pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
  window.history.replaceState({}, '', newUrl);
}

/**
 * Simple substring search (case-insensitive)
 * @param {string} query - Search query
 * @param {Object} item - Item to search in (should have title, summary, tags)
 * @returns {boolean} True if item matches query
 */
function matchesQuery(query, item) {
  if (!query) return true;
  const q = query.toLowerCase();
  const title = (item.title || '').toLowerCase();
  const summary = (item.summary || '').toLowerCase();
  const tags = (item.tags || []).map(t => t.toLowerCase()).join(' ');
  const combined = (title + ' ' + summary + ' ' + tags).toLowerCase();
  return combined.includes(q);
}

/**
 * Filter items by tag (case-insensitive)
 * @param {string} tag - Tag to filter by
 * @param {Array} items - Items to filter
 * @returns {Array} Filtered items
 */
function filterByTag(tag, items) {
  if (!tag) return items;
  const normalizedTag = tag.toLowerCase();
  return items.filter(item => {
    return item.tags && item.tags.map(t => t.toLowerCase()).includes(normalizedTag);
  });
}

/**
 * Sort items by date (most recent first)
 * @param {Array} items - Items to sort
 * @returns {Array} Sorted items
 */
function sortByDateDesc(items) {
  return items.slice().sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate - aDate;
  });
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Format a date object to a readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

/**
 * Get or create an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement} The element
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return (text || '').replace(/[&<>"']/g, char => map[char]);
}
