/*
  ============================================================
  CONTEÚDO DO SITE — é aqui que se adiciona ou troca trabalhos.
  ============================================================

  Para ADICIONAR um trabalho:
    1. Coloque o arquivo (imagem .jpg ou vídeo .mp4) na pasta assets/3d/
    2. Copie um bloco { ... }, do "{" até o "}," e cole abaixo dele
    3. Troque os textos e o caminho do arquivo

  Campos:
    titulo     → nome do trabalho
    titulo_en, descricao_en → as mesmas coisas em inglês (aparecem quando o site está em inglês)
    categoria  → "3d", "transicao" ou "edicao" (define o filtro)
    descricao  → uma ou duas frases
    ferramentas→ lista de programas usados
    video      → caminho de um .mp4 curto (toca sozinho, em loop)
    imagem     → caminho de uma imagem (usada como capa)
    youtube    → código do vídeo no YouTube (o que vem depois de "v=")
    galeria    → lista de imagens; clicar no card abre todas no visualizador
    filme      → true para vídeo com som: mostra os controles e só toca quando a pessoa clica
    falta      → true deixa o card como "espaço reservado" (some quando tiver o material)
*/

const TRABALHOS = [
  {
    titulo: "PI 2025 (Projeto Integrador)",
    titulo_en: "PI 2025 (Capstone Project)",
    categoria: "3d",
    descricao: "Curta animado no cenário do ateliê de costura. Pedro Barbosa: direção, roteiro, animatic, modelagem e 3D shading.",
    descricao_en: "Animated short film set in the sewing atelier. Pedro Barbosa: direction, script, animatic, modeling and 3D shading.",
    ferramentas: ["Blender"],
    video: "assets/3d/pi-2025.mp4",
    imagem: "assets/3d/pi-2025.jpg",
    filme: true,
  },
  {
    titulo: "Ateliê de costura",
    titulo_en: "Sewing atelier",
    categoria: "3d",
    descricao: "Cenário completo de um ateliê, do dia ao pôr do sol: máquinas, manequins, tecidos e luz entrando pelas janelas.",
    descricao_en: "A complete atelier environment, from daytime to sunset: sewing machines, mannequins, fabrics and light pouring in through the windows.",
    ferramentas: ["Blender"],
    imagem: "assets/3d/atelie/atelie-05.jpg",
    galeria: [
      "assets/3d/atelie/atelie-01.jpg",
      "assets/3d/atelie/atelie-02.jpg",
      "assets/3d/atelie/atelie-03.jpg",
      "assets/3d/atelie/atelie-04.jpg",
      "assets/3d/atelie/atelie-05.jpg",
      "assets/3d/atelie/atelie-06.jpg",
      "assets/3d/atelie/atelie-07.jpg",
      "assets/3d/atelie/atelie-08.jpg",
      "assets/3d/atelie/atelie-09.jpg",
      "assets/3d/atelie/atelie-10.jpg",
    ],
  },
  {
    titulo: "Besta estilizada",
    titulo_en: "Stylized beast",
    categoria: "3d",
    descricao: "Modelagem hard surface com shader cartoon e detalhes em neon.",
    descricao_en: "Hard-surface modeling with a cartoon shader and neon details.",
    ferramentas: ["Blender"],
    video: "assets/3d/besta-giro.mp4",
    imagem: "assets/3d/besta.jpg",
  },
  {
    titulo: "Guttural",
    titulo_en: "Guttural",
    categoria: "3d",
    descricao: "Projeto de faculdade 2024 · rigging, animação e áudio.",
    descricao_en: "College project, 2024 · rigging, animation and audio.",
    ferramentas: ["Blender"],
    video: "assets/3d/guttural.mp4",
    imagem: "assets/3d/guttural.jpg",
    filme: true,
  },
  {
    titulo: "Transição “Mordida”",
    titulo_en: "“Bite” transition",
    categoria: "transicao",
    descricao: "Transição animada para OBS Studio: uma boca com dentes brilhantes engole a cena.",
    descricao_en: "Animated transition for OBS Studio: a mouth with glowing teeth swallows the scene.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-dentes.mp4",
  },
  {
    titulo: "Transição com logomarca",
    titulo_en: "Logo transition",
    categoria: "transicao",
    descricao: "Transição personalizável para streamers, com espaço para a marca do canal.",
    descricao_en: "Customizable transition for streamers, with space for the channel’s logo.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-logo.mp4",
  },
  {
    titulo: "Transição “Penas”",
    titulo_en: "“Feathers” transition",
    categoria: "transicao",
    descricao: "Transição de cena para lives verticais: uma revoada de penas sobe e cobre a tela na troca de cena.",
    descricao_en: "Scene transition for vertical streams: a flurry of feathers rises and covers the screen during the scene change.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-penas.mp4",
    imagem: "assets/3d/transicao-penas.jpg",
  },
  {
    titulo: "Linhas e bolinhas",
    titulo_en: "Lines and dots",
    categoria: "transicao",
    descricao: "Fundo animado em loop: uma grade de linhas e pontos que acendem em vermelho neon.",
    descricao_en: "Looping animated background: a grid of lines and dots that light up in neon red.",
    ferramentas: ["Blender"],
    video: "assets/3d/linhas-bolinhas.mp4",
  },
  {
    titulo: "Fios",
    titulo_en: "Wires",
    categoria: "transicao",
    descricao: "Motion abstrato em loop: fios metálicos ondulando sobre luzes em ciano e magenta.",
    descricao_en: "Looping abstract motion: metallic wires rippling over cyan and magenta lights.",
    ferramentas: ["Blender"],
    video: "assets/3d/fios.mp4",
    imagem: "assets/3d/fios.jpg",
  },
];

/*
  Fora do site por enquanto (voltar para a lista acima quando o material chegar):
  {
    titulo: "Padrão hexagonal",
    titulo_en: "Hexagonal pattern",
    categoria: "transicao",
    descricao: "FALTA: este vídeo tem só 4 quadros. Precisamos da versão completa (0001-0240).",
    descricao_en: "MISSING: this video has only 4 frames. We need the full version (0001-0240).",
    ferramentas: ["Blender"],
    video: "assets/3d/hexagonos.mp4",
    falta: true,
  },
  {
    titulo: "Edição de vídeo",
    titulo_en: "Video editing",
    categoria: "edicao",
    descricao: "FALTA: um vídeo editado por ele (pode ser no YouTube; basta mandar o link).",
    descricao_en: "MISSING: a video edited by him (it can be on YouTube; just send the link).",
    ferramentas: ["Premiere", "After Effects"],
    falta: true,
  },
*/

/* Fotos e vídeos de bastidores das transmissões (legenda_en = legenda em inglês) */
const BASTIDORES = [
  { imagem: "assets/streaming/ilha-edicao.jpg", legenda: "Ilha de edição durante gravação", legenda_en: "Editing station during a shoot" },
  { imagem: "assets/streaming/cabine.jpg", legenda: "Cabine de transmissão com tratamento acústico", legenda_en: "Acoustically treated broadcast booth" },
  { imagem: "assets/streaming/mesa-controle.jpg", legenda: "Na mesa de controle", legenda_en: "At the control desk" },
  { imagem: "assets/streaming/camera-entrevista.jpg", legenda: "Enquadramento de entrevista", legenda_en: "Framing an interview" },
  { imagem: "assets/streaming/rig-bateria.jpg", legenda: "Montagem de câmera para gravação de bateria", legenda_en: "Camera rig for a drum recording" },
];
