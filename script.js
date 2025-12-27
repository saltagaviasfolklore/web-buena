const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

/* ====== Composición (editable) ====== */
const members = {
  puas: [
    "Alberto · bandurria",
    "Leo · laúd",
    "Bruno · laúd",
    // Añade aquí si faltan:
    // "Nombre · instrumento",
  ],
  guitarras: [
    "Gonzalo · guitarra",
    "Jaime · guitarra",
    "Javi · guitarra",
    // "Nombre · guitarra",
  ],
  vocesPercu: [
    "Mariela · voz / percusión",
    "Mary · voz / percusión",
    "Daniela Lancho Pino · percusión",
    // Completa hasta ~13 si quieres:
    // "Nombre · voz",
  ],
};

function mountList(selector, items) {
  const el = $(selector);
  if (!el) return;
  el.innerHTML = items.map(x => `<li>${x}</li>`).join("");
}
mountList("#listPuas", members.puas);
mountList("#listGuitarras", members.guitarras);
mountList("#listVocesPercu", members.vocesPercu);

/* ====== Timeline (editable) ====== */
const timeline = [
  { date: "2023", title: "Inicio del proyecto y primeros ensayos", place: "La Vera", tag: "conciertos" },
  { date: "2024", title: "Actuaciones y crecimiento de la formación", place: "Extremadura / Madrid", tag: "conciertos" },
  { date: "2025", title: "Participación en eventos y difusión en redes", place: "Diversas localidades", tag: "festivales" },
  // Puedes añadir hitos específicos:
  // { date: "Mes/Año", title: "Hito", place: "Lugar", tag: "medios|festivales|conciertos" },
];

const timelineList = $("#timelineList");
const chips = $$(".chip");

function renderTimeline(filter = "all") {
  const items = timeline.filter(t => (filter === "all" ? true : t.tag === filter));
  if (!timelineList) return;

  timelineList.innerHTML = items.map(t => `
    <div class="tlItem">
      <div class="tlDot" aria-hidden="true"></div>
      <div class="tlCard">
        <div class="tlMeta">${t.date} · ${t.place}</div>
        <div class="tlTitle">${t.title}</div>
        <span class="tlTag">${t.tag}</span>
      </div>
    </div>
  `).join("");

  if (!items.length) {
    timelineList.innerHTML = `<div class="card"><p class="muted">No hay elementos para este filtro.</p></div>`;
  }
}

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderTimeline(btn.dataset.filter);
  });
});
renderTimeline("all");

/* ====== Prensa (YA RELLENA con tus enlaces, sin fechas) ====== */
const pressLinks = [
  {
    title: "Instagram Reel",
    outlet: "Instagram",
    date: "",
    url: "https://www.instagram.com/reel/DSr5h7PFWpH/"
  },
  {
    title: "Instagram Reel",
    outlet: "Instagram",
    date: "",
    url: "https://www.instagram.com/saltagavias_/reel/DSqVhICFY5F/"
  },
  {
    title: "Villanueva de la Vera, entre el bádminton y el folklore",
    outlet: "Canal Extremadura",
    date: "",
    url: "https://www.canalextremadura.es/video/villanueva-de-la-vera-entre-el-badminton-y-el-folklore"
  },
  {
    title: "A Belén Pastores (T2)",
    outlet: "Canal Extremadura App",
    date: "",
    url: "https://www.canalextremadura.app/videos/detail/306639-a-belen-pastores-t2"
  },
  {
    title: "Los Saltagavias · Territorio CEX (vídeo)",
    outlet: "Facebook · Territorio CEX",
    date: "",
    url: "https://www.facebook.com/territorioCEX/videos/los-saltagavias-as%C3%AD-se-hacen-llamar-estos-j%C3%B3venes-veratos-que-tienen-muy-claro-q/429813433272613/"
  }
];

const pressGrid = $("#pressGrid");
function renderPress() {
  if (!pressGrid) return;

  pressGrid.innerHTML = pressLinks.map(p => `
    <article class="card pressCard">
      <div class="pressMeta">${p.outlet}</div>
      <h3 style="margin:.25rem 0 .35rem">${p.title}</h3>
      <a href="${p.url}" target="_blank" rel="noopener">Ver enlace</a>
    </article>
  `).join("");

  if (!pressLinks.length) {
    pressGrid.innerHTML = `<div class="card card--soft"><p class="muted">Sin enlaces por ahora.</p></div>`;
  }
}
renderPress();

/* ====== Menú móvil ====== */
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

$$('#navMenu a').forEach(a => {
  a.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ====== Galería (Lightbox) ====== */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxClose = $("#lightboxClose");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

$$(".gallery__item").forEach(btn => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.full));
});
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

/* ====== Contacto (en Vercel: abrir email por defecto) ====== */
const contactForm = $("#contactForm");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const nombre = encodeURIComponent(data.get("nombre") || "");
  const email = encodeURIComponent(data.get("email") || "");
  const asunto = encodeURIComponent(data.get("asunto") || "");
  const mensaje = encodeURIComponent(data.get("mensaje") || "");

  const body = `Nombre: ${nombre}%0D%0AEmail: ${email}%0D%0A%0D%0A${mensaje}`;
  window.location.href = `mailto:saltagaviasfolklore@gmail.com?subject=${asunto}&body=${body}`;
});

/* ====== Footer year ====== */
$("#year").textContent = new Date().getFullYear();
