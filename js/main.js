// Monta os cards de trabalhos a partir de conteudo.js
// (textos no idioma escolhido: tr() e campo() vêm de idiomas.js)
const grade = document.getElementById("grade-trabalhos");
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbLegenda = lightbox.querySelector(".lb-legenda");
let lbLista = [];
let lbIndice = 0;
let filtroAtual = "todos";

// Vídeos só tocam quando aparecem na tela (economiza bateria e dados)
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) e.target.play().catch(() => {});
    else e.target.pause();
  });
}, { threshold: 0.3 });

function montarTrabalhos() {
  observador.disconnect();
  grade.innerHTML = "";

  TRABALHOS.forEach((t) => {
    const titulo = campo(t, "titulo");
    const card = document.createElement("article");
    card.className = "card" + (t.falta ? " card-falta" : "");
    card.dataset.categoria = t.categoria;
    card.hidden = filtroAtual !== "todos" && t.categoria !== filtroAtual;

    let midia;
    if (t.youtube) {
      midia = `<iframe src="https://www.youtube-nocookie.com/embed/${t.youtube}" title="${titulo}" allowfullscreen loading="lazy"></iframe>`;
    } else if (t.video && t.filme) {
      midia = `<video class="filme" src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} controls playsinline preload="none"></video>`;
    } else if (t.video) {
      midia = `<video src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} muted loop playsinline preload="metadata"></video>`;
    } else if (t.imagem) {
      midia = `<img src="${t.imagem}" alt="${titulo}" loading="lazy">`;
    } else {
      midia = `<div class="vazio">+ material</div>`;
    }

    if (t.galeria) {
      card.classList.add("card-galeria");
      card.tabIndex = 0;
      midia += `<span class="contador">▦ ${t.galeria.length} ${tr("imagens")}</span>`;
      const abrir = () => abrirLightbox(t.galeria.map((src, i) => ({ imagem: src, legenda: `${titulo} · ${i + 1}/${t.galeria.length}` })), 0);
      card.addEventListener("click", abrir);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") abrir(); });
    }

    card.innerHTML = `
      <div class="card-midia">${midia}</div>
      <div class="card-info">
        <span class="card-cat">${tr("cat." + t.categoria)}</span>
        <h3>${titulo}</h3>
        <p>${campo(t, "descricao")}</p>
        <ul class="chips">${t.ferramentas.map((f) => `<li>${f}</li>`).join("")}</ul>
      </div>`;
    grade.appendChild(card);
  });

  grade.querySelectorAll("video:not(.filme)").forEach((v) => observador.observe(v));
}

// Slider do topo: passa pelos trabalhos prontos (sem "falta")
const slider = document.getElementById("slider");
const slidesBox = slider.querySelector(".slides");
const pontos = document.querySelector(".pontos");
const sliderLegenda = document.querySelector(".slider-legenda");
const DESTAQUES = TRABALHOS.filter((t) => !t.falta && (t.video || t.imagem || t.youtube));
const TEMPO_SLIDE = 6000;
// "Reduzir movimento" ligado no sistema: tudo começa parado (a pessoa pode ativar pelo aviso)
let semAnimacao = matchMedia("(prefers-reduced-motion: reduce)").matches;
let slideAtual = 0;
let timer;

DESTAQUES.forEach((t, i) => {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (t.video && !t.filme) {
    slide.innerHTML = `<video src="${t.video}" ${t.imagem ? `poster="${t.imagem}"` : ""} muted loop playsinline preload="${i === 0 ? "auto" : "none"}"></video>`;
  } else {
    const capa = t.imagem || `https://img.youtube.com/vi/${t.youtube}/hqdefault.jpg`;
    slide.innerHTML = `<img src="${capa}" alt="" ${i === 0 ? "" : 'loading="lazy"'}>`;
  }
  slidesBox.appendChild(slide);

  const ponto = document.createElement("button");
  ponto.addEventListener("click", () => irPara(i));
  pontos.appendChild(ponto);
});

// Textos do slider (legenda, nomes dos pontos e das imagens)
function textosSlider() {
  const t = DESTAQUES[slideAtual];
  sliderLegenda.innerHTML = `<small>${tr("cat." + t.categoria)}</small>${campo(t, "titulo")}`;
  pontos.querySelectorAll("button").forEach((p, n) => p.setAttribute("aria-label", campo(DESTAQUES[n], "titulo")));
  slidesBox.querySelectorAll(".slide img").forEach((img) => {
    const n = [...slidesBox.children].indexOf(img.parentElement);
    img.alt = campo(DESTAQUES[n], "titulo");
  });
}

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
  textosSlider();
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

// Filtros (botões de categorias sem nenhum trabalho ficam escondidos)
document.querySelectorAll(".filtros .filtro").forEach((botao) => {
  const f = botao.dataset.filtro;
  if (f !== "todos" && !TRABALHOS.some((t) => t.categoria === f)) botao.hidden = true;
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtros .filtro").forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    filtroAtual = f;
    grade.querySelectorAll(".card").forEach((c) => {
      c.hidden = f !== "todos" && c.dataset.categoria !== f;
    });
  });
});

// Slider dos destaques de streaming (abas, setas, pontos, arrastar e troca automática)
const ss = document.getElementById("slider-streaming");
const ssTrilho = ss.querySelector(".ss-trilho");
const ssSlides = [...ssTrilho.children];
const ssAbas = [...ss.querySelectorAll(".ss-abas button")];
const ssPontos = ss.querySelector(".ss-pontos");
const TEMPO_SS = 8000;
let ssAtual = 0;
let ssTimer;

ssSlides.forEach((_, i) => {
  const p = document.createElement("button");
  p.setAttribute("aria-label", ssAbas[i] ? ssAbas[i].textContent : String(i + 1));
  p.addEventListener("click", () => ssIr(i));
  ssPontos.appendChild(p);
});
ssAbas.forEach((a, i) => a.addEventListener("click", () => ssIr(i)));

function ssIr(i) {
  ssAtual = (i + ssSlides.length) % ssSlides.length;
  ssTrilho.style.transform = `translateX(-${ssAtual * 100}%)`;
  ssSlides.forEach((s, n) => {
    s.setAttribute("aria-hidden", n !== ssAtual);
    s.inert = n !== ssAtual;
    if (n !== ssAtual) s.querySelectorAll("video").forEach((v) => v.pause());
  });
  ssAbas.forEach((a, n) => a.classList.toggle("ativo", n === ssAtual));
  ssPontos.querySelectorAll("button").forEach((p, n) => p.classList.toggle("ativo", n === ssAtual));
  ssReiniciar();
}
function ssReiniciar() {
  clearInterval(ssTimer);
  if (semAnimacao) return;
  ssTimer = setInterval(() => {
    // não troca enquanto o mouse está em cima ou algum vídeo do slider está tocando
    if (ss.matches(":hover") || ss.contains(document.activeElement) || [...ss.querySelectorAll("video")].some((v) => !v.paused)) return;
    ssIr(ssAtual + 1);
  }, TEMPO_SS);
}

ss.querySelector(".anterior").addEventListener("click", () => ssIr(ssAtual - 1));
ss.querySelector(".proxima").addEventListener("click", () => ssIr(ssAtual + 1));
let ssToqueX = null;
ssTrilho.addEventListener("touchstart", (e) => (ssToqueX = e.touches[0].clientX), { passive: true });
ssTrilho.addEventListener("touchend", (e) => {
  if (ssToqueX === null) return;
  const dx = e.changedTouches[0].clientX - ssToqueX;
  if (Math.abs(dx) > 40) ssIr(ssAtual + (dx < 0 ? 1 : -1));
  ssToqueX = null;
});
ssIr(0);

// Galeria de bastidores
const galeria = document.getElementById("galeria");

function montarBastidores() {
  galeria.innerHTML = "";
  const lista = BASTIDORES.map((b) => ({ imagem: b.imagem, legenda: campo(b, "legenda") }));
  lista.forEach((b, i) => {
    const botao = document.createElement("button");
    botao.className = "foto";
    botao.innerHTML = `<img src="${b.imagem}" alt="${b.legenda}" loading="lazy"><span>${b.legenda}</span>`;
    botao.addEventListener("click", () => abrirLightbox(lista, i));
    galeria.appendChild(botao);
  });
}

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

// Troca de idioma: remonta o que vem de conteudo.js
aoTrocarIdioma = () => {
  montarTrabalhos();
  montarBastidores();
  textosSlider();
  lightbox.hidden = true;
};
aplicarIdioma(idioma);
irPara(0);

// Fundo animado + aviso para ativar as animações quando ele não toca
// (sistema com "reduzir movimento" ligado, modo economia de bateria etc.)
const fundo = document.querySelector(".fundo-animado video");
const aviso = document.getElementById("aviso-animacao");

function lerEscolha() {
  try { return localStorage.getItem("animacoes"); } catch (e) { return null; }
}
function salvarEscolha(valor) {
  try { localStorage.setItem("animacoes", valor); } catch (e) {}
}

function ativarAnimacoes() {
  semAnimacao = false;
  document.documentElement.classList.add("animacoes-ativas");
  reiniciarTimer();
  ssReiniciar();
  return fundo.play();
}

function perguntar() {
  if (lerEscolha() === "nao") return;
  aviso.hidden = false;
}

aviso.querySelectorAll("button").forEach((b) =>
  b.addEventListener("click", () => {
    aviso.hidden = true;
    salvarEscolha(b.dataset.resposta);
    if (b.dataset.resposta === "sim") ativarAnimacoes().catch(() => {});
  })
);

// Tenta tocar o fundo; se o navegador recusar (economia de bateria etc.), pergunta
function tocarFundo() {
  if (semAnimacao || document.hidden) return;
  fundo.play().catch((e) => e.name === "NotAllowedError" && perguntar());
}
// Abas em segundo plano pausam vídeos: ao voltar para a aba, retoma
document.addEventListener("visibilitychange", tocarFundo);

if (semAnimacao) {
  fundo.pause();
  if (lerEscolha() === "sim") ativarAnimacoes().catch(() => {});
  else perguntar();
} else {
  tocarFundo();
}
