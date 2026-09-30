const API = "https://mgt3745-hw4.travlr.workers.dev";
const LOCAL_META_KEY = 'travlr_local_meta';

const reviewForm = document.getElementById('review-form');
const spotNameInput = document.getElementById('spot-name');
const spotImageInput = document.getElementById('spot-image');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const reviewTextInput = document.getElementById('review-text');
const categoryButtons = document.getElementById('category-buttons');
const saveStatus = document.getElementById('save-status');
const emptyState = document.getElementById('empty-state');
const reviewsList = document.getElementById('reviews-list');
const filterBar = document.getElementById('filter-bar');

let currentBase64Image = '';
let selectedCategory = '';
let currentFilter = 'All';

categoryButtons.addEventListener('click', (event) => {
  const chip = event.target.closest('.category-chip');
  if (!chip) return;
  selectedCategory = chip.getAttribute('data-category');
  categoryButtons.querySelectorAll('.category-chip').forEach((c) => {
    c.setAttribute('aria-checked', c === chip ? 'true' : 'false');
  });
});

filterBar.addEventListener('click', (event) => {
  const chip = event.target.closest('.filter-chip');
  if (!chip) return;
  currentFilter = chip.getAttribute('data-filter');
  filterBar.querySelectorAll('.filter-chip').forEach((c) => {
    c.classList.toggle('active', c === chip);
    c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
  });
  renderReviews();
});

async function loadServerEntries() {
  const res = await fetch(API + "/entries");
  if (!res.ok) {
    showStatus('Could not load saved reviews.', false);
    return [];
  }
  return res.json();
}

async function saveEntryToServer(text, category) {
  const res = await fetch(API + "/entries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text, category }),
  });
  if (!res.ok) {
    const reason = await res.text();
    showStatus('Could not save: ' + (reason || res.status), false);
    return null;
  }
  const { id } = await res.json();
  return id;
}

function loadLocalMeta() {
  const saved = localStorage.getItem(LOCAL_META_KEY);
  return saved ? JSON.parse(saved) : {};
}

function setLocalMeta(id, spotName, imageData) {
  const meta = loadLocalMeta();
  meta[id] = { spotName, imageData };
  localStorage.setItem(LOCAL_META_KEY, JSON.stringify(meta));
}

async function renderReviews() {
  reviewsList.textContent = '';
  const entries = await loadServerEntries();
  const localMeta = loadLocalMeta();

  const filtered = currentFilter === 'All'
    ? entries
    : entries.filter((entry) => entry.category === currentFilter);

  if (filtered.length === 0) {
    emptyState.textContent = currentFilter === 'All'
      ? 'No photo reviews added yet.'
      : `No photo reviews in ${currentFilter} yet.`;
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  filtered.forEach((entry) => {
    const meta = localMeta[entry.id];

    const card = document.createElement('li');
    card.className = 'review-card';

    const header = document.createElement('div');
    header.className = 'review-card-header';

    const title = document.createElement('h3');
    title.className = 'review-card-title';
    title.textContent = meta && meta.spotName ? meta.spotName : 'Untitled Spot';
    header.appendChild(title);

    if (entry.category) {
      const badge = document.createElement('span');
      badge.className = 'category-badge';
      badge.textContent = entry.category;
      header.appendChild(badge);
    }

    card.appendChild(header);

    if (meta && meta.imageData) {
      const img = document.createElement('img');
      img.className = 'review-card-img';
      img.src = meta.imageData;
      img.alt = `Photo of ${meta.spotName || 'saved spot'}`;
      card.appendChild(img);
    }

    const text = document.createElement('p');
    text.className = 'review-card-text';
    text.textContent = entry.text;
    card.appendChild(text);

    reviewsList.appendChild(card);
  });
}

function showStatus(message, isSuccess) {
  saveStatus.textContent = message;
  saveStatus.className = isSuccess ? 'success' : 'error';
  saveStatus.classList.remove('hidden');

  setTimeout(() => {
    saveStatus.classList.add('hidden');
  }, 3000);
}

function resetForm() {
  spotNameInput.value = '';
  spotImageInput.value = '';
  reviewTextInput.value = '';
  currentBase64Image = '';
  selectedCategory = '';
  categoryButtons.querySelectorAll('.category-chip').forEach((c) => c.setAttribute('aria-checked', 'false'));
  imagePreviewContainer.classList.add('hidden');
}

spotImageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentBase64Image = e.target.result;
      imagePreview.src = currentBase64Image;
      imagePreviewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    currentBase64Image = '';
    imagePreviewContainer.classList.add('hidden');
  }
});

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const spotName = spotNameInput.value.trim();
  const reviewText = reviewTextInput.value.trim();

  if (!spotName || !currentBase64Image || !reviewText) {
    showStatus('Please provide a spot name, select an image, and write a review.', false);
    return;
  }
  if (!selectedCategory) {
    showStatus('Please pick a category for this review.', false);
    return;
  }

  try {
    const id = await saveEntryToServer(reviewText, selectedCategory);
    if (id === null) return;

    setLocalMeta(id, spotName, currentBase64Image);
    resetForm();
    showStatus('Photo review saved successfully!', true);
    await renderReviews();
  } catch (error) {
    showStatus('Could not reach the server. Please try again.', false);
  }
});

renderReviews();
