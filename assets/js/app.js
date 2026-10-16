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
          <a href="puroilia.html" class="${active === "puroilia" ? "active" : ""}">PUROILIA</a>
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
            <a href="puroilia.html">PUROILIA — Huile d'olive</a>
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
          <a class="btn btn-primary" href="tel:${PATPRO_CONTACT.phones[0].replace(/\s/g, "")}">Commander / infos</a>
          <a class="btn btn-outline" href="mailto:${PATPRO_CONTACT.email}?subject=${encodeURIComponent("Demande d'information — " + p.name)}">Demander par e-mail</a>
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
    <div class="product" style="cursor:default" data-puro="${p.id}">
      <div class="thumb"><img src="${p.image}" alt="${p.name} ${p.format}" loading="lazy"></div>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="formats"><span class="chip">${p.format}</span></div>
        <p style="color:var(--muted);font-size:0.85rem;margin-top:8px">${p.desc}</p>
      </div>
    </div>`).join("");
}

/* ------- Carte de visite (remplissage) ------- */
function renderContact() {
  const set = (id, val) => { const el = $("#" + id); if (el) el.textContent = val; };
  set("vc-email", SITE.email);
  set("vc-website", SITE.websiteLabel);
  set("vc-positioning", SITE.positioning);
  set("vc-puro", PUROILIA.name);
  set("vc-patpro-tel", PATPRO_CONTACT.phones.join(" / "));
  set("vc-patpro-address", PATPRO_CONTACT.address);
  const siteLink = $("#vc-site");
  if (siteLink) siteLink.href = SITE.website;
  const patproTel = $("#vc-patpro-call");
  if (patproTel) patproTel.href = "tel:" + PATPRO_CONTACT.phones[0].replace(/\s/g, "");
  const mail = $("#vc-mail");
  if (mail) mail.href = "mailto:" + SITE.email;

  // Bloc contact PATPRO (page patpro)
  set("patpro-tel", PATPRO_CONTACT.phones.join(" / "));
  set("patpro-address", PATPRO_CONTACT.address);
  set("patpro-email", PATPRO_CONTACT.email);
  set("patpro-facebook", PATPRO_CONTACT.facebook);
  const pc = $("#patpro-call");
  if (pc) pc.href = "tel:" + PATPRO_CONTACT.phones[0].replace(/\s/g, "");
  const pm = $("#patpro-mail");
  if (pm) pm.href = "mailto:" + PATPRO_CONTACT.email;
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
  const v = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:" + SITE.full,
    "ORG:" + SITE.legal,
    "TEL;TYPE=WORK:" + PATPRO_CONTACT.phones[0].replace(/\s/g, ""),
    "TEL;TYPE=WORK:" + PATPRO_CONTACT.phones[1].replace(/\s/g, ""),
    "EMAIL:" + SITE.email,
    "URL:" + SITE.website,
    "ADR;TYPE=WORK:;;" + PATPRO_CONTACT.address + ";;;;",
    "NOTE:" + SITE.tagline,
    "END:VCARD",
  ].join("\n");
  const blob = new Blob([v], { type: "text/vcard" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gni-global-negoce-international.vcf";
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ------- Animations à l'apparition ------- */
function setupReveal() {
  const els = $$(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ------- Init ------- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  renderChrome(page === "home" && location.hash === "#contact" ? "contact" : page);
  renderCatalogue();
  renderPuroilia();
  renderSectors();
  renderContact();
  renderQR();
  setupReveal();
  const vc = $("#vcard-btn");
  if (vc) vc.addEventListener("click", downloadVCard);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
});
