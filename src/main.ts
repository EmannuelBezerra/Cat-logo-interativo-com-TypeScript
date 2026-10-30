//Lista de categorias
const CATEGORIAS = ["Ação", 
    "Aventura", 
    "Terror", 
    "Esporte",
    "Quebra-cabeça",
    "RPG",
    "FPS",
    "TPS",
    "Multi-player",
    "Single-player",
    "Cooperativo",
    "PvP"
] as const;

// Type alias: Categoria só pode ser um dos textos acima
type Categoria = (typeof CATEGORIAS)[number];

//Interface para representar um jogo
interface Jogo {
    id: number;
    titulo: string;
    categoria: Categoria;
    preco: number;
    lancado: boolean;
}

//Interface para o resumo
interface Resumo {
    totalJogos: number;
    lancados: number;
    EmDesenvolvimento: number;
}

//Array tipado para armazenar os jogos
let jogos: Jogo[] = [];
let proximoId: number = 1;

//Estado dos filtros
let termoBusca: string = "";
let categoriaFiltro: Categoria | "todas" = "todas";

//Função para captar os elementos do DOM
function obterElemento<T extends HTMLElement>(id:string): T {
    const elemento = document.getElementById(id);
    if(elemento===null){
        throw new Error(`Elemento com id ${id} não encontrado no HTML.`);
    }
    return elemento as T;
}

const formulario = obterElemento<HTMLFormElement>("formulario");
const inputTitulo = obterElemento<HTMLInputElement>("titulo");
const selectCategoria = obterElemento<HTMLSelectElement>("categoria");
const inputPreco = obterElemento<HTMLInputElement>("preco");
const inputLancado = obterElemento<HTMLInputElement>("lancado");
const mensagemErro = obterElemento<HTMLParagraphElement>("mensagem-erro");

const inputBusca = obterElemento<HTMLInputElement>("busca");
const selectFiltro = obterElemento<HTMLSelectElement>("filtro-categoria");

const listaJogos = obterElemento<HTMLDivElement>("lista-jogos");
const mensagemVazia = obterElemento<HTMLParagraphElement>("mensagem-vazia");

const resumoTotal = obterElemento<HTMLElement>("resumo-total");
const resumoLancados = obterElemento<HTMLElement>("resumo-lancamentos");
const resumoEmDesenvolvimento = obterElemento<HTMLElement>("resumo-em-desenvolvimento");

//Funcção para confirmar a categoria como válida ao TypeScript
function ehCategoria(valor: string): valor is Categoria {
    return (CATEGORIAS as readonly string[]).includes(valor);
}

//Validação de dados do formulário
function validarDados(titulo: string, categoria: string, precoTexto: string): string | null {
    if (titulo === ""){
        return "Informe o título do jogo.";
    }
    if(!ehCategoria(categoria)){
        return "Categoria inválida. Escolha uma válida.";
    }
    const preco = Number(precoTexto);
    if (precoTexto.trim() === "" || Number.isNaN(preco)){
        return "Informe um preço válido. Númerico.";
    }
    if(preco < 0){
        return "O preço não pode ser negativo.";
    }
    return null;
}

function formatarPreco(valor: number): string{
        return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}


//Funções da aplicação: CASTRAR, ALTERAR, REMOVER, FILTRAR E RESUMIR
function adicionarJogo(titulo: string, categoria: Categoria, preco: number, lancado: boolean): void {
    const novo: Jogo = {
        id: proximoId,
        titulo,
        categoria,
        preco,
        lancado,
    };
    proximoId++;
    jogos.push(novo);
}

function alternarEstado(id: number): void{
    const jogo = jogos.find((j: Jogo) => j.id === id);
    if(jogo!==undefined){
        jogo.lancado= !jogo.lancado;
    }
}

function removerJogo(id: number): void{
    jogos = jogos.filter((j: Jogo) => j.id !== id);
}

function filtrarJogos(lista: Jogo[], termo: string, categoria: Categoria | "todas"): Jogo[]{
    const busca = termo.trim().toLowerCase();
    return lista.filter((j: Jogo) => {
        const bateTitulo = j.titulo.toLowerCase().includes(busca);
        const bateCategoria = categoria === "todas" || j.categoria === categoria;
        return bateTitulo && bateCategoria;
    });

}

function calcularResumo(lista: Jogo[]): Resumo {
  const lancados = lista.filter((j: Jogo) => j.lancado).length;
  return {
    totalJogos: lista.length,
    lancados,
    EmDesenvolvimento: lista.length - lancados,
  };
}

function criarCard(jogo: Jogo): HTMLElement {
    const card = document.createElement("article");
    card.className = jogo.lancado ? "card lancado" : "card em-desenvolvimento";

    const titulo = document.createElement("h3");
    titulo.textContent = jogo.titulo;

    const info = document.createElement("p");
    info.textContent = `${jogo.categoria} • ${formatarPreco(jogo.preco)}`;

    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = jogo.lancado ? "Lançado" : "Em desenvolvimento";

    const botaoEstado = document.createElement("button");
    botaoEstado.type = "button";
    botaoEstado.textContent = jogo.lancado ? "Marcar como em desenvolvimento" : "Marcar como lançado";
    botaoEstado.addEventListener("click", () => {
        alternarEstado(jogo.id);
        renderizar();
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "perigo";
    botaoRemover.textContent = "Excluir";
    botaoRemover.addEventListener("click", () => {
        removerJogo(jogo.id);
        renderizar();
    });

    card.append(titulo, info, estado, botaoEstado, botaoRemover);
    return card;
}

function atualizarResumo(): void{
    const resumo = calcularResumo(jogos);
    resumoTotal.textContent = String(resumo.totalJogos);
    resumoLancados.textContent = String(resumo.lancados);
    resumoEmDesenvolvimento.textContent = String(resumo.EmDesenvolvimento);
}

function renderizar(): void {
    const visiveis = filtrarJogos(jogos, termoBusca, categoriaFiltro);

    listaJogos.innerHTML = "";
    visiveis.forEach((jogo: Jogo) => {
        listaJogos.appendChild(criarCard(jogo))
    });

    if(jogos.length === 0){
        mensagemVazia.textContent = "Nenhum jogo cadastrado ainda. Use o formulário acima!";
        mensagemVazia.hidden = false;
    } else if (visiveis.length === 0){
        mensagemVazia.textContent = "Nenhum jogo encontrado para a busca ou filtro atual.";
        mensagemVazia.hidden = false;
    }else{
        mensagemVazia.hidden = true;
    }

    atualizarResumo();
}

function preencherCategorias(select: HTMLSelectElement, incluirTodas: boolean): void {
  if (incluirTodas) {
    select.add(new Option("Todas as categorias", "todas"));
  } else {
    select.add(new Option("Selecione...", ""));
  }
  CATEGORIAS.forEach((cat: Categoria) => {
    select.add(new Option(cat, cat));
  });
}

// 01: Enviar o formulário
formulario.addEventListener("submit", (evento: SubmitEvent) => {
  evento.preventDefault();   // impede o navegador de recarregar a página

  const titulo = inputTitulo.value.trim();
  const categoria = selectCategoria.value;
  const precoTexto = inputPreco.value;

  const erro = validarDados(titulo, categoria, precoTexto);
  if (erro !== null) {
    mensagemErro.textContent = erro;
    return;
  }

  // Depois da validação, o TypeScript ainda precisa ter certeza do tipo:
  if (!ehCategoria(categoria)) return;

  adicionarJogo(titulo, categoria, Number(precoTexto), inputLancado.checked);
  mensagemErro.textContent = "";
  formulario.reset();
  renderizar();
});

// 03: Busca e filtro
inputBusca.addEventListener("input", () => {
  termoBusca = inputBusca.value;
  renderizar();
});

selectFiltro.addEventListener("change", () => {
  const valor = selectFiltro.value;
  categoriaFiltro = ehCategoria(valor) ? valor : "todas";
  renderizar();
});

// Início
preencherCategorias(selectCategoria, false);
preencherCategorias(selectFiltro, true);
renderizar();
