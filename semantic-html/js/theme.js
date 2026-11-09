const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

function safeGetItem(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

// --- ТЕМА ---
function applyTheme(choice) {
  if (choice === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', choice);
  }
  themeSelect.value = choice;
}

const savedTheme = safeGetItem('atlas-theme');
if (['auto', 'light', 'dark'].includes(savedTheme)) {
  applyTheme(savedTheme);
} else {
  applyTheme('auto');
}

themeSelect.addEventListener('change', (e) => {
  applyTheme(e.target.value);
  safeSetItem('atlas-theme', e.target.value);
});

// --- ПЛОТНОСТЬ ---
function applyDensity(choice) {
  if (choice === 'compact') {
    root.setAttribute('data-density', 'compact');
  } else {
    root.removeAttribute('data-density');
  }
  densitySelect.value = choice;
}

const savedDensity = safeGetItem('atlas-density');
if (savedDensity === 'compact') {
  applyDensity('compact');
} else {
  applyDensity('normal');
}

densitySelect.addEventListener('change', (e) => {
  applyDensity(e.target.value);
  safeSetItem('atlas-density', e.target.value);
});

// --- ДЕМО-КНОПКА ---
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});
