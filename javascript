// Toggle tema
const toggleTheme = document.getElementById('toggleTheme');
const root = document.documentElement;
const sun = document.getElementById('icon-sun');
const moon = document.getElementById('icon-moon');

// Ambil preferensi sebelumnya
if (localStorage.getItem('theme') === 'light') {
  root.setAttribute('data-theme', 'light');
  sun.style.display = 'none';
  moon.style.display = 'block';
}

toggleTheme.addEventListener('click', () => {
  if (root.getAttribute('data-theme') === 'dark') {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    sun.style.display = 'none';
    moon.style.display = 'block';
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sun.style.display = 'block';
    moon.style.display = 'none';
  }
});

// Tambah artikel baru
const form = document.getElementById('postForm');
const preview = document.getElementById('preview');

form.addEventListener('input', () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  preview.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const articles = document.getElementById('articles');
  const newArticle = document.createElement('article');
  newArticle.className = 'card';
  newArticle.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
  articles.prepend(newArticle);
  form.reset();
  preview.innerHTML = '';
});

// Cari artikel
const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', () => {
  const filter = searchInput.value.toLowerCase();
  const articles = document.querySelectorAll('.articles .card');
  articles.forEach(article => {
    const text = article.innerText.toLowerCase();
    article.style.display = text.includes(filter) ? 'block' : 'none';
  });
});
```            
