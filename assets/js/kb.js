/**
 * kb.js - Knowledge Base search and tag filtering
 */

(function() {
  const COLLECTIONS_INDEX = '/assets/search/kb.json';
  let allItems = [];
  let itemsContainer = null;

  function init() {
    itemsContainer = getElement('kb-items');
    if (!itemsContainer) {
      console.warn('Knowledge Base container not found');
      return;
    }

    // Load JSON index and initialize search
    fetch(COLLECTIONS_INDEX)
      .then(response => response.json())
      .then(data => {
        allItems = sortByDateDesc(data);
        setupEventListeners();
        applyFiltersFromUrl();
      })
      .catch(error => console.error('Error loading KB index:', error));
  }

  function setupEventListeners() {
    const searchInput = getElement('kb-search');
    const filterInfoEl = getElement('kb-filter-info');

    if (searchInput) {
      searchInput.addEventListener('input', debounce(handleSearch, 300));
      // Restore search from URL
      const params = getQueryParams();
      if (params.q) {
        searchInput.value = params.q;
      }
    }

    // Tag filtering is handled by clicks on tags with data-tag attribute
    document.addEventListener('click', handleTagClick);
  }

  function handleSearch(e) {
    const query = e.target.value;
    updateQueryString({ q: query, tag: getQueryParams().tag || '' });
    applyFilters();
  }

  function handleTagClick(e) {
    if (e.target.classList.contains('tag-link')) {
      e.preventDefault();
      const tag = e.target.getAttribute('href').match(/tag=([^&]*)/)?.[1];
      if (tag) {
        updateQueryString({ tag: decodeURIComponent(tag), q: getQueryParams().q || '' });
        applyFilters();
      }
    }
  }

  function applyFiltersFromUrl() {
    const params = getQueryParams();
    const searchInput = getElement('kb-search');
    if (searchInput && params.q) {
      searchInput.value = params.q;
    }
    applyFilters();
  }

  function applyFilters() {
    const params = getQueryParams();
    const query = params.q || '';
    const tag = params.tag || '';

    let filtered = allItems;

    // Apply search filter
    if (query) {
      filtered = filtered.filter(item => matchesQuery(query, item));
    }

    // Apply tag filter
    if (tag) {
      filtered = filterByTag(decodeURIComponent(tag), filtered);
    }

    // Update displayed items and filter info
    renderItems(filtered);
    updateFilterInfo(query, tag, filtered.length, allItems.length);
  }

  function renderItems(items) {
    if (!itemsContainer) return;

    if (items.length === 0) {
      itemsContainer.innerHTML = '<div class="no-results"><p>No notes found. Try adjusting your search or filters.</p></div>';
      return;
    }

    const html = items.map(item => createItemHtml(item)).join('');
    itemsContainer.innerHTML = html;
  }

  function createItemHtml(item) {
    const date = formatDate(item.date);
    const tagsHtml = item.tags ? item.tags.map(tag => 
      `<a href="?tag=${encodeURIComponent(tag)}" class="tag-link">${tag}</a>`
    ).join('') : '';

    return `
      <article class="card" data-date="${item.date}" data-tags="${item.tags?.join(',') || ''}">
        <header class="card-header">
          <h3 class="card-title">
            <a href="${item.url}">${item.title}</a>
          </h3>
          <time class="card-date" datetime="${item.date}">
            ${date}
          </time>
        </header>
        <div class="card-body">
          <p class="card-summary">${item.summary || ''}</p>
        </div>
        ${tagsHtml ? `<footer class="card-footer"><div class="card-tags"><ul class="tag-list">${tagsHtml.split('').map(tag => `<li>${tag}</li>`).join('')}</ul></div></footer>` : ''}
      </article>
    `;
  }

  function updateFilterInfo(query, tag, resultCount, totalCount) {
    const filterInfoEl = getElement('kb-filter-info');
    if (!filterInfoEl) return;

    let info = '';
    if (query || tag) {
      if (tag) {
        info += `Tagged with "<strong>${decodeURIComponent(tag)}</strong>"`;
      }
      if (query) {
        if (tag) info += ' and ';
        info += `matching "<strong>${query}</strong>"`;
      }
      info += ` — ${resultCount} of ${totalCount} notes`;
    } else {
      info = `${totalCount} notes`;
    }

    filterInfoEl.innerHTML = `<p class="filter-info">${info}</p>`;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
