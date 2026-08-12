(function () {
  var STORAGE_KEY = 'kayko-vsdc-api-base-url';
  var SERVERS = [
    { label: 'Local EBM', url: 'http://localhost:3000/ebm' },
    { label: 'Production VSDC', url: 'https://vsdc.kayko.rw/rra-2.1.2.3.8' },
    { label: 'Local VSDC', url: 'http://localhost:8080' },
  ];

  function getSelectedUrl() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SERVERS.some(function (s) { return s.url === stored; })) {
      return stored;
    }
    return SERVERS[0].url;
  }

  function allUrls() {
    return SERVERS.map(function (s) { return s.url; });
  }

  function replaceBaseUrlInNode(node, url) {
    if (!node) return;
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    var textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    textNodes.forEach(function (textNode) {
      var value = textNode.nodeValue;
      if (!value) return;
      var next = value;
      allUrls().forEach(function (serverUrl) {
        next = next.split(serverUrl).join(url);
      });
      next = next.split('{{baseUrl}}').join(url);
      if (next !== value) {
        textNode.nodeValue = next;
      }
    });
  }

  function updateVisibleExamples(url) {
    document.documentElement.dataset.apiBaseUrl = url;
    [
      '#request-example',
      '#response-example',
      'code-group',
      'code-block',
      '#api-playground-input',
      'api-section',
    ].forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        replaceBaseUrlInNode(el, url);
      });
    });
  }

  function syncPlaygroundServer(url) {
    var labels = SERVERS.filter(function (s) { return s.url === url; }).map(function (s) { return s.label; });
    if (!labels.length) return;

    document.querySelectorAll('option-dropdown button, option-dropdown [role="combobox"]').forEach(function (trigger) {
      var text = (trigger.textContent || '').trim();
      if (labels.indexOf(text) !== -1) return;
      trigger.click();
      setTimeout(function () {
        document.querySelectorAll('option-dropdown [role="option"], option-dropdown li, option-dropdown button').forEach(function (option) {
          var optionText = (option.textContent || '').trim();
          if (labels.some(function (label) { return optionText.indexOf(label) !== -1; })) {
            option.click();
          }
        });
      }, 0);
    });
  }

  function findThemeToggle() {
    return (
      document.querySelector('[data-component-name="theme-toggle"]') ||
      document.querySelector('#navbar button[aria-label*="theme" i]') ||
      document.querySelector('#navbar button[title*="theme" i]')
    );
  }

  function buildSelector() {
    var wrapper = document.createElement('div');
    wrapper.id = 'kayko-api-env';
    wrapper.className = 'kayko-api-env';

    var label = document.createElement('span');
    label.className = 'kayko-api-env-label';
    label.textContent = 'API Environment';

    var select = document.createElement('select');
    select.id = 'kayko-api-env-select';
    select.setAttribute('aria-label', 'API environment');

    SERVERS.forEach(function (server) {
      var option = document.createElement('option');
      option.value = server.url;
      option.textContent = server.label;
      select.appendChild(option);
    });

    select.value = getSelectedUrl();
    select.addEventListener('change', function () {
      localStorage.setItem(STORAGE_KEY, select.value);
      updateVisibleExamples(select.value);
      syncPlaygroundServer(select.value);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    return wrapper;
  }

  function placeSelectorNearTheme(wrapper) {
    var themeToggle = findThemeToggle();
    if (themeToggle && themeToggle.parentElement) {
      themeToggle.parentElement.insertBefore(wrapper, themeToggle);
      return true;
    }

    var container =
      document.querySelector('topbar-right-container') ||
      document.querySelector('#navbar [class*="right"]') ||
      document.getElementById('navbar');

    if (!container) return false;
    container.appendChild(wrapper);
    return true;
  }

  function injectSelector() {
    var existing = document.getElementById('kayko-api-env');
    var themeToggle = findThemeToggle();

    if (existing) {
      if (themeToggle && themeToggle.parentElement && existing.nextElementSibling !== themeToggle) {
        themeToggle.parentElement.insertBefore(existing, themeToggle);
      }
      return;
    }

    var wrapper = buildSelector();
    placeSelectorNearTheme(wrapper);
  }

  function init() {
    injectSelector();
    updateVisibleExamples(getSelectedUrl());
    syncPlaygroundServer(getSelectedUrl());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var scheduled = false;
  var observer = new MutationObserver(function () {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      injectSelector();
      var select = document.getElementById('kayko-api-env-select');
      if (select && select.value !== getSelectedUrl()) {
        select.value = getSelectedUrl();
      }
      updateVisibleExamples(getSelectedUrl());
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
