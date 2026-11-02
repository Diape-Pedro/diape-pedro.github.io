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
    categoria: "3d",
    descricao: "Curta animado no cenário do ateliê de costura. Pedro Barbosa: direção, roteiro, animatic, modelagem e 3D shading.",
    ferramentas: ["Blender"],
    video: "assets/3d/pi-2025.mp4",
    imagem: "assets/3d/pi-2025.jpg",
    filme: true,
  },
  {
    titulo: "Ateliê de costura",
    categoria: "3d",
    descricao: "Cenário completo de um ateliê, do dia ao pôr do sol: máquinas, manequins, tecidos e luz entrando pelas janelas.",
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
    categoria: "3d",
    descricao: "Modelagem hard surface com shader cartoon e detalhes em neon.",
    ferramentas: ["Blender"],
    video: "assets/3d/besta-giro.mp4",
    imagem: "assets/3d/besta.jpg",
  },
  {
    titulo: "Guttural",
    categoria: "3d",
    descricao: "Projeto de faculdade 2024 · rigging, animação e áudio.",
    ferramentas: ["Blender"],
    video: "assets/3d/guttural.mp4",
    imagem: "assets/3d/guttural.jpg",
    filme: true,
  },
  {
    titulo: "Transição “Mordida”",
    categoria: "transicao",
    descricao: "Transição animada para OBS Studio: uma boca com dentes brilhantes engole a cena.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-dentes.mp4",
  },
  {
    titulo: "Transição com logomarca",
    categoria: "transicao",
    descricao: "Transição personalizável para streamers, com espaço para a marca do canal.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-logo.mp4",
  },
  {
    titulo: "Transição “Penas”",
    categoria: "transicao",
    descricao: "Transição de cena para lives verticais: uma revoada de penas sobe e cobre a tela na troca de cena.",
    ferramentas: ["Blender", "OBS Studio"],
    video: "assets/3d/transicao-penas.mp4",
    imagem: "assets/3d/transicao-penas.jpg",
  },
  {
    titulo: "Linhas e bolinhas",
    categoria: "transicao",
    descricao: "Fundo animado em loop: uma grade de linhas e pontos que acendem em vermelho neon.",
    ferramentas: ["Blender"],
    video: "assets/3d/linhas-bolinhas.mp4",
  },
  {
    titulo: "Fios",
    categoria: "transicao",
    descricao: "Motion abstrato em loop: fios metálicos ondulando sobre luzes em ciano e magenta.",
    ferramentas: ["Blender"],
    video: "assets/3d/fios.mp4",
    imagem: "assets/3d/fios.jpg",
  },
];

/*
  Fora do site por enquanto (voltar para a lista acima quando o material chegar):
  {
    titulo: "Padrão hexagonal",
    categoria: "transicao",
    descricao: "FALTA: este vídeo tem só 4 quadros. Precisamos da versão completa (0001-0240).",
    ferramentas: ["Blender"],
    video: "assets/3d/hexagonos.mp4",
    falta: true,
  },
  {
    titulo: "Edição de vídeo",
    categoria: "edicao",
    descricao: "FALTA: um vídeo editado por ele (pode ser no YouTube; basta mandar o link).",
    ferramentas: ["Premiere", "After Effects"],
    falta: true,
  },
*/

/* Fotos e vídeos de bastidores das transmissões */
const BASTIDORES = [
  { imagem: "assets/streaming/ilha-edicao.jpg", legenda: "Ilha de edição durante gravação" },
  { imagem: "assets/streaming/cabine.jpg", legenda: "Cabine de transmissão com tratamento acústico" },
  { imagem: "assets/streaming/mesa-controle.jpg", legenda: "Na mesa de controle" },
  { imagem: "assets/streaming/camera-entrevista.jpg", legenda: "Enquadramento de entrevista" },
  { imagem: "assets/streaming/rig-bateria.jpg", legenda: "Montagem de câmera para gravação de bateria" },
];
