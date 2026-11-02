// Monta os cards de trabalhos a partir de conteudo.js
const grade = document.getElementById("grade-trabalhos");
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbLegenda = lightbox.querySelector(".lb-legenda");
let lbLista = [];
let lbIndice = 0;
const NOMES = { "3d": "3D", transicao: "Motion para live", edicao: "Edição" };

TRABALHOS.forEach((t) => {
  const card = document.createElement("article");
  card.className = "card" + (t.falta ? " card-falta" : "");
  card.dataset.categoria = t.categoria;

  let midia;
  if (t.youtube) {
    midia = `<iframe src="https://www.youtube-nocookie.com/embed/${t.youtube}" title="${t.titulo}" allowfullscreen loading="lazy"></iframe>`;
  } else if (t.video && t.filme) {
    midia = `<video class="filme" src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} controls playsinline preload="none"></video>`;
  } else if (t.video) {
    midia = `<video src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} muted loop playsinline preload="metadata"></video>`;
  } else if (t.imagem) {
    midia = `<img src="${t.imagem}" alt="${t.titulo}" loading="lazy">`;
  } else {
    midia = `<div class="vazio">+ material</div>`;
  }

  if (t.galeria) {
    card.classList.add("card-galeria");
    card.tabIndex = 0;
    midia += `<span class="contador">▦ ${t.galeria.length} imagens</span>`;
    const abrir = () => abrirLightbox(t.galeria.map((src, i) => ({ imagem: src, legenda: `${t.titulo} · ${i + 1}/${t.galeria.length}` })), 0);
    card.addEventListener("click", abrir);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") abrir(); });
  }

  card.innerHTML = `
    <div class="card-midia">${midia}</div>
    <div class="card-info">
      <span class="card-cat">${NOMES[t.categoria] || t.categoria}</span>
      <h3>${t.titulo}</h3>
      <p>${t.descricao}</p>
      <ul class="chips">${t.ferramentas.map((f) => `<li>${f}</li>`).join("")}</ul>
    </div>`;
  grade.appendChild(card);
});

// Slider do topo: passa pelos trabalhos prontos (sem "falta")
const slider = document.getElementById("slider");
const slidesBox = slider.querySelector(".slides");
const pontos = document.querySelector(".pontos");
const sliderLegenda = document.querySelector(".slider-legenda");
const DESTAQUES = TRABALHOS.filter((t) => !t.falta && (t.video || t.imagem || t.youtube));
const TEMPO_SLIDE = 6000;
const semAnimacao = matchMedia("(prefers-reduced-motion: reduce)").matches;
let slideAtual = 0;
let timer;

DESTAQUES.forEach((t, i) => {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (t.video && !t.filme) {
    slide.innerHTML = `<video src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} muted loop playsinline preload="${i === 0 ? "auto" : "none"}"></video>`;
  } else {
    const capa = t.imagem || `https://img.youtube.com/vi/${t.youtube}/hqdefault.jpg`;
    slide.innerHTML = `<img src="${capa}" alt="${t.titulo}" ${i === 0 ? "" : 'loading="lazy"'}>`;
  }
  slidesBox.appendChild(slide);

  const ponto = document.createElement("button");
  ponto.setAttribute("aria-label", t.titulo);
  ponto.addEventListener("click", () => irPara(i));
  pontos.appendChild(ponto);
});

function irPara(i) {
  slideAtual = (i + DESTAQUES.length) % DESTAQUES.length;
  slidesBox.querySelectorAll(".slide").forEach((s, n) => {
    const ativo = n === slideAtual;
    s.classList.toggle("ativo", ativo);
    const v = s.querySelector("video");
    if (!v) return;
    if (ativo) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause();
  });
  pontos.querySelectorAll("button").forEach((p, n) => p.classList.toggle("ativo", n === slideAtual));
  const t = DESTAQUES[slideAtual];
  sliderLegenda.innerHTML = `<small>${NOMES[t.categoria] || t.categoria}</small>${t.titulo}`;
  reiniciarTimer();
}
function reiniciarTimer() {
  clearInterval(timer);
  if (!semAnimacao) timer = setInterval(() => irPara(slideAtual + 1), TEMPO_SLIDE);
}

slider.querySelector(".anterior").addEventListener("click", () => irPara(slideAtual - 1));
slider.querySelector(".proxima").addEventListener("click", () => irPara(slideAtual + 1));
slider.addEventListener("mouseenter", () => clearInterval(timer));
slider.addEventListener("mouseleave", reiniciarTimer);

// Arrastar com o dedo no celular
let toqueX = null;
slider.addEventListener("touchstart", (e) => (toqueX = e.touches[0].clientX), { passive: true });
slider.addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 40) irPara(slideAtual + (dx < 0 ? 1 : -1));
  toqueX = null;
});

irPara(0);

// Vídeos só tocam quando aparecem na tela (economiza bateria e dados)
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) e.target.play().catch(() => {});
    else e.target.pause();
  });
}, { threshold: 0.3 });
grade.querySelectorAll("video:not(.filme)").forEach((v) => observador.observe(v));

// Filtros (botões de categorias sem nenhum trabalho ficam escondidos)
document.querySelectorAll(".filtro").forEach((botao) => {
  const f = botao.dataset.filtro;
  if (f !== "todos" && !TRABALHOS.some((t) => t.categoria === f)) botao.hidden = true;
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    const f = botao.dataset.filtro;
    grade.querySelectorAll(".card").forEach((c) => {
      c.hidden = f !== "todos" && c.dataset.categoria !== f;
    });
  });
});

// Galeria de bastidores
const galeria = document.getElementById("galeria");

BASTIDORES.forEach((b, i) => {
  const botao = document.createElement("button");
  botao.className = "foto";
  botao.innerHTML = `<img src="${b.imagem}" alt="${b.legenda}" loading="lazy"><span>${b.legenda}</span>`;
  botao.addEventListener("click", () => abrirLightbox(BASTIDORES, i));
  galeria.appendChild(botao);
});

// Lightbox (visualizador de imagens com setas)
function mostrarFoto() {
  const f = lbLista[lbIndice];
  lbImg.src = f.imagem;
  lbImg.alt = f.legenda;
  lbLegenda.textContent = f.legenda;
  lightbox.classList.toggle("unica", lbLista.length < 2);
}
function abrirLightbox(lista, indice) {
  lbLista = lista;
  lbIndice = indice;
  mostrarFoto();
  lightbox.hidden = false;
}
function passar(n) {
  lbIndice = (lbIndice + n + lbLista.length) % lbLista.length;
  mostrarFoto();
}

lightbox.querySelector(".anterior").addEventListener("click", (e) => { e.stopPropagation(); passar(-1); });
lightbox.querySelector(".proxima").addEventListener("click", (e) => { e.stopPropagation(); passar(1); });
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") lightbox.hidden = true;
  if (e.key === "ArrowLeft") passar(-1);
  if (e.key === "ArrowRight") passar(1);
});

// Menu no celular
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("aberto")));

document.getElementById("ano").textContent = new Date().getFullYear();
