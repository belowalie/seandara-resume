/* ---------- Project data ---------- */
const projects = [
  {
    tags: ["python", "js"],
    tagLabel: "Python · Flask · JS",
    title: "Renovation Consultation Platform",
    type: "Group project",
    desc: "Helps first-time homeowners explore interior styles, browse renovation projects and land on a home concept they actually like, through an interactive recommendation flow."
  },
  {
    tags: ["database"],
    tagLabel: "MySQL Workbench",
    title: "Student Information Management System",
    type: "Individual project",
    desc: "Designed a relational database from scratch — ERDs, primary/foreign key relationships, and a clean schema built in MySQL Workbench."
  },
  {
    tags: ["analytics"],
    tagLabel: "Power BI · Power Query",
    title: "Environmental Sustainability Dashboard",
    type: "Group project",
    desc: "An interactive dashboard comparing sustainability indicators across Singapore, Japan and South Korea, with data cleaned in Power Query and turned into insights people could act on."
  },
  {
    tags: ["js"],
    tagLabel: "HTML · CSS · JS",
    title: "Student Council Club Website",
    type: "Individual project",
    desc: "A responsive multi-page site introducing the Student Council CCA, built around intuitive navigation and a genuinely easy browsing experience."
  },
  {
    tags: ["csharp", "database"],
    tagLabel: "ASP.NET Core · C#",
    title: "Arcane Vault Collection Manager",
    type: "Individual project",
    desc: "A web app for managing personal collectible collections — auth, categories, full CRUD and search, built on ASP.NET Core Web API, Entity Framework Core and SQLite."
  }
];

/* ---------- Carousel ---------- */
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBar = document.getElementById('filterBar');

let currentSet = projects;
let index = 0;

function cardHTML(p) {
  return `<article class="project-card">
    <span class="tag">${p.tagLabel}</span>
    <h3>${p.title}</h3>
    <p class="project-type">${p.type}</p>
    <p>${p.desc}</p>
  </article>`;
}

function renderCarousel() {
  track.innerHTML = currentSet.map(cardHTML).join('');
  dotsWrap.innerHTML = currentSet.map((_, i) =>
    `<button class="carousel-dot${i === index ? ' active' : ''}" data-index="${i}" aria-label="Go to project ${i + 1}"></button>`
  ).join('');
  updatePosition();
}

function updatePosition() {
  track.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goTo(i) {
  if (!currentSet.length) return;
  index = (i + currentSet.length) % currentSet.length;
  updatePosition();
}

prevBtn.addEventListener('click', () => goTo(index - 1));
nextBtn.addEventListener('click', () => goTo(index + 1));

dotsWrap.addEventListener('click', (e) => {
  const dot = e.target.closest('.carousel-dot');
  if (dot) goTo(Number(dot.dataset.index));
});

/* Swipe support */
let touchStartX = 0;
track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
track.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 40) delta > 0 ? goTo(index - 1) : goTo(index + 1);
});

/* ---------- Filters ---------- */
filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  currentSet = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));
  index = 0;
  renderCarousel();
});

renderCarousel();

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
