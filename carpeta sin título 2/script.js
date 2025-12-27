const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

/**
 * Composición (editable)
 * Nota: el dossier listaba una formación concreta; ajusta aquí a los 13 actuales.
 */
const members = {
  puas: [
    "Alberto Propín · bandurria",
    "Leo Vázquez · laúd y voz",
    "Bruno Timón · laúd",
  ],
  guitarras: [
    "Gonzalo García · guitarra y laúd",
    "Jaime Jiménez · guitarra",
  ],
  vocesPercu: [
  "Raquel Manzano · caldero y voz",
  "Paula Salinero · castañuelas y voz",
  "Mariela Vázquez · pandereta y coros",
  "María Sánchez · almirez y coros",
  "Javier Domínguez · voz, guitarra y laúd",
  "Javier Sánchez · voz y cántaro",
  "Daniela Lancho Pino · percusión",
  "Mary · apoyo musical (inicio)",
],

};

function mountList(id, items) {
  const el = $(id);
  if (!el) return;
  el.innerHTML = items.map(x => `<li>${x}</li>`).join("");
}
mountList("#listPuas", members.puas);
mountList("#listGuitarras", members.guitarras);
mountList("#listPercu", members.vocesPercu);

/**
 * Timeline (basado en el dossier; tags para filtros)
 */
const timeline = [
  { date: "Marzo 2024", title: "Concierto debut en Viandar de la Vera", place: "Viandar de la Vera", tag: "conciertos" },
  { date: "Marzo 2024", title: "Presentación del grupo en Radio Canal Extremadura", place: "Canal Extremadura Radio", tag: "medios" },
  { date: "Mayo 2024", title: "Reportaje en Canal Extremadura (Territorio Extremadura)", place: "Canal Extremadura TV", tag: "medios" },
  { date: "Agosto 2024", title: "XXIX Festival Internacional Pedro Vaquero", place: "Candeleda", tag: "festivales" },
  { date: "Octubre 2024", title: "XI Encuentro de Rondas Rosa del Azafrán", place: "Consuegra", tag: "festivales" },
  { date: "Marzo 2025", title: "Concierto en Parla (Casa de Extremadura)", place: "Parla", tag: "conciertos" },
  { date: "Abril 2025", title: "Guitarvera 2025 · “El día que me tallaron”", place: "Villanueva de la Vera", tag: "festivales" },
];

const timelineList = $("#timelineList");
const chips = $$(".chip");

function renderTimeline(filter = "all") {
  const items = timeline.filter(t => (filter === "all" ? true : t.tag === filter));
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

// Menú móvil
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

// Lightbox galería
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

// Footer year
$("#year").textContent = new Date().getFullYear();
