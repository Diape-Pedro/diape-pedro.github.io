/*
  ============================================================
  IDIOMAS — português (padrão) e inglês.
  ============================================================

  O texto em português fica no próprio index.html. Aqui ficam só as versões
  em inglês, pela mesma chave do atributo data-i18n do HTML.
  Os trabalhos e as fotos de bastidores são traduzidos em conteudo.js
  (campos titulo_en, descricao_en e legenda_en).

  Qual idioma abre primeiro:
    1. ?lang=en ou ?lang=pt no endereço (ex.: https://diape.com.br/?lang=en)
    2. a última escolha da pessoa nas bandeiras
    3. o idioma do navegador (português → PT; qualquer outro → EN)
*/

const TEXTOS = {
  en: {
    "meta.titulo": "Diape · 3D Animation & Streaming",
    "meta.descricao": "Portfolio of Pedro Barbosa Rodrigues (TioDiape): 3D animation and modeling, streaming technician and video editing.",

    "nav.trabalhos": "Work",
    "nav.streaming": "Streaming",
    "nav.sobre": "About",
    "nav.contato": "Contact",
    menu: "Open menu",

    "hero.sub": "3D animation &amp; modeling · Streaming technician · Video editing",
    "hero.ver": "▶ See my work",
    "hero.falar": "Get in touch",
    slider: "Featured work",
    "slider.anterior": "Previous project",
    "slider.proxima": "Next project",

    "trabalhos.titulo": "Work in Blender",
    "filtro.todos": "All",
    "cat.3d": "3D",
    "cat.transicao": "Motion for live",
    "cat.edicao": "Editing",
    imagens: "images",

    "streaming.titulo": "Streaming &amp; behind the scenes",
    "streaming.intro": "I set up and run live broadcasts: OBS and Streamlabs, multistreaming, audio, custom transitions, chat moderation and bots for Twitch, YouTube, Kick, TikTok and Instagram.",
    "festival.tag": "// live",
    "festival.texto": "Technical operation of the festival broadcast: I ran the live feed of the Mario Kart Live game to the big screen.",
    "festival.audio": "Audio",
    "festival.cenas": "Scenes",

    "sobre.titulo": "About",
    "sobre.p1": "I'm <strong>Pedro Barbosa</strong>, from Brasília, Brazil. I speak Portuguese, English and Italian, and I hold degrees in <strong>Digital Games</strong> and <strong>Animation Design</strong> from IESB.",
    "sobre.p2": "I work in two distinct fields: as a 3D environment artist focused on cinematography and motion graphics, building everything from fantasy worlds to dystopian futurism with hard-surface modeling and shaders; and as an audio and video technician for live broadcasts.",
    "sobre.p3": "In streaming, my passion is improving the interaction between chat and streamer, helping creators make their streams more dynamic and engaging.",
    "exp.titulo": "Experience",
    "exp.atual": "2026 – present",
    "exp.treehouse": "2D and 3D animation, modeling, rigging, video editing and workshop streaming.",
    "exp.voluntariado": "Volunteering",
    "exp.italia": "Italy",

    "atributos.titulo": "Attributes",
    "atributos.plataformas": "Live platforms and bots",
    "nivel.avancado": "Advanced",
    "nivel.intermediario": "Intermediate",
    "nivel.basico": "Basic",
    "idiomas.titulo": "Languages",
    "idiomas.pt": "Portuguese",
    "idiomas.en": "English",
    "idiomas.it": "Italian",
    "idiomas.es": "Spanish",

    "contato.titulo": "Let's create something together?",
    "contato.intro": "3D animation, transitions for your stream or a well-tuned broadcast: just reach out.",
    "rodape.ia": "This website was set up with the help of AI. The artwork and materials on it were made without AI.",

    "lb.fechar": "Close",
    "lb.anterior": "Previous image",
    "lb.proxima": "Next image",
  },
  // O português vem do HTML; aqui só o que não está escrito na página
  pt: {
    imagens: "imagens",
  },
};

// Guarda o português que está no HTML para poder voltar a ele
document.querySelectorAll("[data-i18n]").forEach((el) => (TEXTOS.pt[el.dataset.i18n] ??= el.innerHTML.trim()));
document.querySelectorAll("[data-i18n-aria]").forEach((el) => (TEXTOS.pt[el.dataset.i18nAria] ??= el.getAttribute("aria-label")));
TEXTOS.pt["meta.titulo"] = document.title;
TEXTOS.pt["meta.descricao"] = document.querySelector('meta[name="description"]').content;

let idioma = escolherIdioma();
let aoTrocarIdioma = () => {}; // main.js troca por uma função que remonta os cards

function escolherIdioma() {
  const daUrl = new URLSearchParams(location.search).get("lang");
  if (daUrl === "pt" || daUrl === "en") return daUrl;
  try {
    const salvo = localStorage.getItem("idioma");
    if (salvo === "pt" || salvo === "en") return salvo;
  } catch (e) {}
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
}

// Texto pela chave, no idioma atual
function tr(chave) {
  return TEXTOS[idioma][chave] ?? TEXTOS.pt[chave] ?? chave;
}

// Campo de um trabalho/foto no idioma atual (ex.: campo(t, "titulo") usa titulo_en em inglês)
function campo(item, nome) {
  return (idioma === "en" && item[nome + "_en"]) || item[nome];
}

function aplicarIdioma(novo) {
  idioma = novo;
  try { localStorage.setItem("idioma", novo); } catch (e) {}
  document.documentElement.lang = novo === "en" ? "en" : "pt-BR";
  document.title = tr("meta.titulo");
  document.querySelector('meta[name="description"]').content = tr("meta.descricao");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.innerHTML = tr(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", tr(el.dataset.i18nAria)));
  document.querySelectorAll(".idioma-troca button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === novo));
  aoTrocarIdioma();
}

document.querySelectorAll(".idioma-troca button").forEach((b) =>
  b.addEventListener("click", () => b.dataset.lang !== idioma && aplicarIdioma(b.dataset.lang))
);
