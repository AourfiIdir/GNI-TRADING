/* GNI — logique du site (rendu, navigation, fiche produit, QR) */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ------- En-tête / pied de page partagés ------- */
function renderChrome(active) {
  const header = `
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html">
          <span class="dot"></span>
          <span>GNI<small>Global Négoce International</small></span>
        </a>
        <button class="nav-toggle" aria-label="Menu">&#9776;</button>
        <nav class="nav">
          <a href="index.html" class="${active === "home" ? "active" : ""}">Accueil</a>
          <a href="patpro.html" class="${active === "patpro" ? "active" : ""}">PATPRO</a>
          <a href="puroilia.html" class="${active === "puroilia" ? "active" : ""}">PUR'OILIA</a>
          <a href="vivant.html" class="${active === "vivant" ? "active" : ""}">Vivant</a>
          <a href="index.html#contact" class="${active === "contact" ? "active" : ""}">Contact</a>
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="cols">
          <div>
            <div class="brand" style="color:#fff"><span class="dot"></span><span>GNI<small style="color:#9fb09c">Global Négoce International</small></span></div>
            <p class="about" style="margin-top:14px">${SITE.intro}</p>
          </div>
          <div>
            <h4>Activités</h4>
            <a href="patpro.html">PATPRO Distribution</a>
            <a href="puroilia.html">PUR'OILIA — Huile de tournesol</a>
            <a href="vivant.html">GNI Vivant — Bétail & viandes</a>
            <a href="index.html#contact">Contact</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
            <a href="${SITE.website}" target="_blank" rel="noopener">${SITE.websiteLabel}</a>
          </div>
        </div>
        <div class="bottom">
          <span>© ${new Date().getFullYear()} ${SITE.legal}. Tous droits réservés.</span>
          <span>Site réalisé pour la présentation en stand — scannez le QR code.</span>
        </div>
      </div>
    </footer>`;

  const h = $("#site-header");
  const f = $("#site-footer");
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;

  const toggle = $(".nav-toggle");
  const nav = $(".nav");
  if (toggle) toggle.addEventListener("click", () => nav.classList.toggle("open"));
  $$(".nav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* ------- Rendu du catalogue PATPRO ------- */
function renderCatalogue() {
  const root = $("#catalogue");
  if (!root) return;
  root.innerHTML = PATPRO.map((cat) => `
    <section class="cat-block reveal" id="${cat.id}">
      <div class="cat-banner">
        <img src="${cat.banner}" alt="${cat.name}" loading="lazy">
        <div class="overlay">
          <span>Collection</span>
          <h2>${cat.name}</h2>
        </div>
      </div>
      <div class="product-grid">
        ${cat.products.map((p) => `
          <button class="product" data-cat="${cat.id}" data-id="${p.id}">
            <div class="thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
            <div class="info">
              <h3>${p.name}</h3>
              <div class="formats">${(p.sizes || []).map((s) => `<span class="chip">${s}</span>`).join("")}</div>
              <span class="more">Voir la fiche →</span>
            </div>
          </button>`).join("")}
      </div>
    </section>`).join("");

  $$(".product", root).forEach((el) =>
    el.addEventListener("click", () => openProduct(el.dataset.cat, el.dataset.id))
  );
}

/* ------- Fiche produit (modal) ------- */
function openProduct(catId, prodId) {
  const cat = PATPRO.find((c) => c.id === catId);
  const p = cat && cat.products.find((x) => x.id === prodId);
  if (!p) return;

  const rows = [];
  rows.push(row("Catégorie", cat.name));
  if (p.desc) rows.push(row("Description", p.desc));
  if (p.usage) rows.push(row("Utilisation", p.usage));
  if (p.tip) rows.push(row("Dosage / conseil", p.tip));
  if (p.flavors) rows.push(row("Saveurs / couleurs", `<div class="flavors">${p.flavors.map((f) => `<span class="chip">${f}</span>`).join("")}</div>`));
  if (p.items) rows.push(row("Gamme", `<ul style="padding-left:18px;color:var(--muted)">${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>`));
  rows.push(row("Formats", `<div class="flavors">${(p.sizes || []).map((s) => `<span class="chip">${s}</span>`).join("")}</div>`));

  const modal = $("#modal");
  modal.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-panel">
      <button class="modal-close" data-close aria-label="Fermer">✕</button>
      <div class="modal-media"><img src="${p.image}" alt="${p.name}"></div>
      <div class="modal-body">
        <span class="tag">${cat.name}</span>
        <h2>${p.name}</h2>
        <div class="modal-meta">${rows.join("")}</div>
        <div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-primary" href="tel:${SITE.contact.phoneRaw}">Commander / infos</a>
          <a class="btn btn-outline" href="mailto:${SITE.email}?subject=${encodeURIComponent("Demande d'information — " + p.name)}">Demander par e-mail</a>
        </div>
      </div>
    </div>`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  $$("[data-close]", modal).forEach((b) => b.addEventListener("click", closeModal));
}

function row(label, val) {
  return `<div class="meta-row"><div class="label">${label}</div><div class="val">${val}</div></div>`;
}

function closeModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.innerHTML = "";
  document.body.style.overflow = "";
}

/* ------- Secteurs GNI ------- */
function renderSectors() {
  const root = $("#gni-sectors");
  if (!root) return;
  const intro = $("#gni-intro");
  if (intro) intro.textContent = SITE.intro;
  const pos = $("#gni-positioning");
  if (pos) pos.textContent = SITE.positioning;
  const soon = $("#gni-soon");
  if (soon) soon.textContent = SITE.comingSoon;
  const hp = $("#hero-positioning");
  if (hp) hp.textContent = SITE.positioning;
  const hs = $("#hero-site");
  if (hs) hs.href = SITE.website;
  root.innerHTML = SITE.sectors.map((s) => `
    <article class="sector reveal">
      <span class="num">${s.n}</span>
      <span class="ic">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
    </article>`).join("");
}

/* ------- Rendu PUROILIA ------- */
function renderPuroilia() {
  const intro = $("#puro-intro");
  if (intro) intro.textContent = PUROILIA.intro;
  const root = $("#puro-products");
  if (!root) return;
  root.innerHTML = PUROILIA.products.map((p) => `
    <button class="product" data-puro="${p.id}">
      <div class="thumb"><img src="${p.image}" alt="${p.name} ${p.format}" loading="lazy"></div>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="formats"><span class="chip">${p.format}</span></div>
        <p style="color:var(--muted);font-size:0.85rem;margin-top:8px">${p.desc}</p>
        <span class="more">Agrandir l'image →</span>
      </div>
    </button>`).join("");

  $$(".product", root).forEach((el) =>
    el.addEventListener("click", () => openPuroilia(el.dataset.puro))
  );
}

/* ------- Fiche produit PUR'OILIA (agrandissement) ------- */
function openPuroilia(prodId) {
  const p = PUROILIA.products.find((x) => x.id === prodId);
  if (!p) return;

  const modal = $("#modal");
  modal.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-panel">
      <button class="modal-close" data-close aria-label="Fermer">✕</button>
      <div class="modal-media modal-media-puro">
        <a href="${p.image}" target="_blank" rel="noopener" title="Ouvrir l'image en grand">
          <img src="${p.image}" alt="${p.name} ${p.format}">
        </a>
      </div>
      <div class="modal-body">
        <span class="tag">${PUROILIA.name}</span>
        <h2>${p.name}</h2>
        <div class="modal-meta">
          ${row("Format", p.format)}
          ${row("Description", p.desc)}
        </div>
        <div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-primary" href="tel:${SITE.contact.phoneRaw}">Commander / infos</a>
          <a class="btn btn-outline" href="mailto:${SITE.email}?subject=${encodeURIComponent("Demande d'information — " + p.name + " " + p.format)}">Demander par e-mail</a>
        </div>
      </div>
    </div>`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  $$("[data-close]", modal).forEach((b) => b.addEventListener("click", closeModal));
}

/* ------- Rendu GNI Vivant ------- */
function renderVivant() {
  const root = $("#vivant-categories");
  if (!root) return;

  root.innerHTML = VIVANT.categories.map((c) => `
    <article class="v-filiere reveal">
      <div class="v-media"><img src="${c.image}" alt="${c.name}" loading="lazy"></div>
      <div class="v-filiere-body">
        <span class="v-filiere-tag">${c.subtitle}</span>
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
        <ul>${c.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    </article>`).join("");

  const gallery = $("#vivant-gallery");
  if (gallery) gallery.innerHTML = VIVANT.gallery.map((g) => `
    <figure class="v-gallery-item reveal">
      <img src="${g.image}" alt="${g.caption}" loading="lazy">
      <figcaption>${g.caption}</figcaption>
    </figure>`).join("");

  const intro = $("#vivant-intro");
  if (intro) intro.textContent = VIVANT.intro;

  const tel = $("#vivant-tel");
  if (tel) tel.href = "tel:" + SITE.contact.phoneRaw;

  const telCta = $("#vivant-cta-tel");
  if (telCta) telCta.href = "tel:" + SITE.contact.phoneRaw;

  const mail = $("#vivant-mail");
  if (mail) mail.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Demande de devis — GNI Vivant");
}

/* ------- Carte de visite (rendu) ------- */
function renderVCard() {
  const c = SITE.contact;
  $$("[data-vcard]").forEach((mount) => {
    mount.classList.add("vcard", "reveal");
    mount.innerHTML = `
      <div class="logo">GNI <span>GLOBAL NÉGOCE</span></div>
      <div class="person">
        <div class="p-name">${c.name}</div>
        <div class="role">${c.role}</div>
      </div>
      <div class="lines">
        <div class="line"><span class="ic">📞</span><a href="tel:${c.phoneRaw}">${c.phone}</a></div>
        <div class="line"><span class="ic">✉️</span><a href="mailto:${SITE.email}">${SITE.email}</a></div>
        <div class="line"><span class="ic">🌐</span><a href="${SITE.website}" target="_blank" rel="noopener">${SITE.websiteLabel}</a></div>
      </div>
      <div class="actions">
        <button class="btn btn-gold" data-vcard-download>＋ Ajouter au contact</button>
        <a class="btn btn-outline" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.4)" href="tel:${c.phoneRaw}">Appeler</a>
      </div>`;
  });
  $$("[data-vcard-download]").forEach((b) => b.addEventListener("click", downloadVCard));
}

/* ------- QR code ------- */
function renderQR() {
  const img = $("#qr-img");
  if (!img) return;
  const fallback = location.href.split("#")[0];
  const publicUrl = (SITE.publicUrl && SITE.publicUrl.trim()) || "";
  const url = publicUrl || fallback;

  /* Si une URL publique est définie, on utilise un QR code local (fiable, aucun
     service externe). Sinon, on génère à la volée pour le test local. */
  img.src = publicUrl
    ? "assets/img/qr.svg"
    : "https://api.qrserver.com/v1/create-qr-code/?size=440x440&margin=10&data=" + encodeURIComponent(url);

  const link = $("#qr-link");
  if (link) link.textContent = url;

  /* Avertir si l'URL n'est pas encore publique (le QR ne marchera pas sur un téléphone) */
  const isLocal = /localhost|127\.0\.0\.1|^file:/i.test(url);
  const note = $("#qr-note");
  if (note) {
    note.style.display = isLocal ? "block" : "none";
    note.textContent = isLocal
      ? "⚠️ Le site n'est pas encore hébergé : ce QR code pointe vers une adresse locale et ne fonctionnera que sur l'ordinateur. Publiez le site (ou renseignez l'URL publique dans data.js) pour que le QR fonctionne sur les téléphones."
      : "";
  }
}

/* ------- Carte de visite (vCard) ------- */
function downloadVCard() {
  const c = SITE.contact;
  const v = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:BENNACER;Mustapha;;;",
    "FN:" + c.name,
    "ORG:" + SITE.full,
    "TITLE:" + c.role,
    "TEL;TYPE=CELL:" + c.phoneRaw,
    "EMAIL:" + SITE.email,
    "URL:" + SITE.website,
    "END:VCARD",
  ].join("\n");
  const blob = new Blob([v], { type: "text/vcard" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gni-mustapha-bennacer.vcf";
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ------- Animations à l'apparition ------- */
const REVEAL_SELECTOR = [
  ".reveal", ".section-head", ".biz-card", ".cat-block", ".product", ".feature",
  ".qr-box", ".soon", ".contact-wrap > *", ".cat-nav", ".v-section-head",
  ".v-intro-grid > *", ".v-split > *", ".v-quality-media", ".v-quality-copy",
  ".v-moment", ".v-pledge", ".v-stat", ".v-cta-inner", ".v-filiere",
  ".v-gallery-item", ".v-contact-grid > *", ".vcard", ".v-order"
].join(",");

function setupReveal() {
  const els = $$(REVEAL_SELECTOR);
  if (!els.length) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }

  els.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const siblings = [...parent.children].filter((child) => child.matches(REVEAL_SELECTOR));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  els.forEach((el) => io.observe(el));
}

/* ------- Compteurs animés ------- */
function setupCounters() {
  const els = $$("[data-count]");
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      io.unobserve(el);
      if (!Number.isFinite(target)) return;

      const duration = 1300;
      const start = performance.now();
      el.textContent = `0${suffix}`;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  els.forEach((el) => io.observe(el));
}

/* ------- Mouvements au scroll ------- */
function setupMotion() {
  const header = $(".site-header");
  const heroImage = $(".v-hero-media img");
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || window.pageYOffset || 0;
    if (header) header.classList.toggle("scrolled", y > 10);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (!reduced && heroImage && y < 1200) {
      heroImage.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
    }
    ticking = false;
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
  update();
}

/* ------- Init ------- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  renderChrome(page === "home" && location.hash === "#contact" ? "contact" : page);
  renderCatalogue();
  renderPuroilia();
  renderVivant();
  renderSectors();
  renderVCard();
  renderQR();
  setupReveal();
  setupCounters();
  setupMotion();
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
});
