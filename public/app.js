// Preserve links to sections from the earlier single-page website.
const oldPages = {research:'research.html', reports:'research.html', writing:'blogposts.html', projects:'code.html', education:'education.html', theses:'education.html', scholarships:'education.html', contact:'contact.html'};
const oldTarget = oldPages[location.hash.slice(1)];
if (oldTarget && (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html'))) {
  location.replace(new URL(oldTarget + location.search + location.hash, location.href));
}
const sections = [...document.querySelectorAll('.collection')];

function applyFilters(section, topic, language = 'All') {
  const buttons = [...section.querySelectorAll('[data-topic]')];
  const select = section.querySelector('[data-language]');
  if (!buttons.some(button => button.dataset.topic === topic)) topic = 'All';
  if (!select || ![...select.options].some(option => option.value === language)) language = 'All';
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
  if (select) select.value = language;
  let count = 0;
  section.querySelectorAll('.filter-entries > .entry').forEach(entry => {
    const matchesTopic = topic === 'All' || entry.dataset.topics.split(' ').includes(topic);
    const matchesLanguage = language === 'All' || JSON.parse(entry.dataset.languages).includes(language);
    entry.hidden = !matchesTopic || !matchesLanguage;
    if (!entry.hidden) count++;
  });
  section.querySelector('.count').textContent = String(count).padStart(2, '0');
  section.querySelector('.count').setAttribute('aria-label', `${count} entries`);
  section.querySelector('.empty').hidden = count !== 0;
  section.querySelector('.filter-status').textContent = `${count} ${section.querySelector('h2').textContent.toLowerCase()} shown${topic === 'All' ? '' : ` for ${topic}`}${language === 'All' ? '' : ` using ${language}`}.`;
}

function restoreFilters() {
  const url = new URL(location.href);
  // Old shared-filter bookmarks now apply only to the linked collection.
  if (sections.length && url.searchParams.has('topic')) {
    const target = sections.find(section => `#${section.id}` === url.hash) || sections[0];
    if (!url.searchParams.has(`${target.id}-topic`)) url.searchParams.set(`${target.id}-topic`, url.searchParams.get('topic'));
    url.searchParams.delete('topic');
    history.replaceState({}, '', url);
  }
  if (url.searchParams.get('writing-topic') === 'Quantum') {
    url.searchParams.set('writing-topic', 'Post-quantum');
    history.replaceState({}, '', url);
  }
  sections.forEach(section => applyFilters(section, url.searchParams.get(`${section.id}-topic`) || 'All', section.id === 'projects' ? url.searchParams.get('projects-language') || 'All' : 'All'));
}

function updateSection(section, topic, language) {
  applyFilters(section, topic, language);
  const url = new URL(location.href);
  const selectedTopic = section.querySelector('[aria-pressed="true"]').dataset.topic;
  if (selectedTopic === 'All') url.searchParams.delete(`${section.id}-topic`);
  else url.searchParams.set(`${section.id}-topic`, selectedTopic);
  const select = section.querySelector('[data-language]');
  if (select) {
    if (select.value === 'All') url.searchParams.delete('projects-language');
    else url.searchParams.set('projects-language', select.value);
  }
  if (url.href !== location.href) history.pushState({}, '', url);
}

sections.forEach(section => {
  section.querySelector('.topic-filter').hidden = false;
  const select = section.querySelector('[data-language]');
  section.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => updateSection(section, button.dataset.topic, select?.value || 'All')));
  select?.addEventListener('change', () => updateSection(section, section.querySelector('[aria-pressed="true"]').dataset.topic, select.value));
});
addEventListener('popstate', restoreFilters);
restoreFilters();
