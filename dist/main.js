"use strict";
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
];
//Array tipado para armazenar os jogos
let jogos = [];
let proximoId = 1;
//Estado dos filtros
let termoBusca = "";
let categoriaFiltro = "todas";
//Função para captar os elementos do DOM
function obterElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento === null) {
        throw new Error(`Elemento com id ${id} não encontrado no HTML.`);
    }
    return elemento;
}
const formulario = obterElemento("formulario");
const inputTitulo = obterElemento("titulo");
const selectCategoria = obterElemento("categoria");
const inputPreco = obterElemento("preco");
const inputLancado = obterElemento("lancado");
const mensagemErro = obterElemento("mensagem-erro");
const inputBusca = obterElemento("busca");
const selectFiltro = obterElemento("filtro-categoria");
const listaJogos = obterElemento("lista-jogos");
const mensagemVazia = obterElemento("mensagem-vazia");
const resumoTotal = obterElemento("resumo-total");
const resumoLancados = obterElemento("resumo-lancamentos");
const resumoEmDesenvolvimento = obterElemento("resumo-em-desenvolvimento");
//Funcção para confirmar a categoria como válida ao TypeScript
function ehCategoria(valor) {
    return CATEGORIAS.includes(valor);
}
//Validação de dados do formulário
function validarDados(titulo, categoria, precoTexto) {
    if (titulo === "") {
        return "Informe o título do jogo.";
    }
    if (!ehCategoria(categoria)) {
        return "Categoria inválida. Escolha uma válida.";
    }
    const preco = Number(precoTexto);
    if (precoTexto.trim() === "" || Number.isNaN(preco)) {
        return "Informe um preço válido. Númerico.";
    }
    if (preco < 0) {
        return "O preço não pode ser negativo.";
    }
    return null;
}
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
//Funções da aplicação: CASTRAR, ALTERAR, REMOVER, FILTRAR E RESUMIR
function adicionarJogo(titulo, categoria, preco, lancado) {
    const novo = {
        id: proximoId,
        titulo,
        categoria,
        preco,
        lancado,
    };
    proximoId++;
    jogos.push(novo);
}
function alternarEstado(id) {
    const jogo = jogos.find((j) => j.id === id);
    if (jogo !== undefined) {
        jogo.lancado = !jogo.lancado;
    }
}
function removerJogo(id) {
    jogos = jogos.filter((j) => j.id !== id);
}
function filtrarJogos(lista, termo, categoria) {
    const busca = termo.trim().toLowerCase();
    return lista.filter((j) => {
        const bateTitulo = j.titulo.toLowerCase().includes(busca);
        const bateCategoria = categoria === "todas" || j.categoria === categoria;
        return bateTitulo && bateCategoria;
    });
}
function calcularResumo(lista) {
    const lancados = lista.filter((j) => j.lancado).length;
    return {
        totalJogos: lista.length,
        lancados,
        EmDesenvolvimento: lista.length - lancados,
    };
}
function criarCard(jogo) {
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
function atualizarResumo() {
    const resumo = calcularResumo(jogos);
    resumoTotal.textContent = String(resumo.totalJogos);
    resumoLancados.textContent = String(resumo.lancados);
    resumoEmDesenvolvimento.textContent = String(resumo.EmDesenvolvimento);
}
function renderizar() {
    const visiveis = filtrarJogos(jogos, termoBusca, categoriaFiltro);
    listaJogos.innerHTML = "";
    visiveis.forEach((jogo) => {
        listaJogos.appendChild(criarCard(jogo));
    });
    if (jogos.length === 0) {
        mensagemVazia.textContent = "Nenhum jogo cadastrado ainda. Use o formulário acima!";
        mensagemVazia.hidden = false;
    }
    else if (visiveis.length === 0) {
        mensagemVazia.textContent = "Nenhum jogo encontrado para a busca ou filtro atual.";
        mensagemVazia.hidden = false;
    }
    else {
        mensagemVazia.hidden = true;
    }
    atualizarResumo();
}
function preencherCategorias(select, incluirTodas) {
    if (incluirTodas) {
        select.add(new Option("Todas as categorias", "todas"));
    }
    else {
        select.add(new Option("Selecione...", ""));
    }
    CATEGORIAS.forEach((cat) => {
        select.add(new Option(cat, cat));
    });
}
// 01: Enviar o formulário
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // impede o navegador de recarregar a página
    const titulo = inputTitulo.value.trim();
    const categoria = selectCategoria.value;
    const precoTexto = inputPreco.value;
    const erro = validarDados(titulo, categoria, precoTexto);
    if (erro !== null) {
        mensagemErro.textContent = erro;
        return;
    }
    // Depois da validação, o TypeScript ainda precisa ter certeza do tipo:
    if (!ehCategoria(categoria))
        return;
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
