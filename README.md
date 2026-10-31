# 🎮 Catálogo de Jogos

Aplicação web para cadastrar, buscar, filtrar e organizar um catálogo de jogos, desenvolvida com **HTML, CSS e TypeScript**.

## 👤 Autor(es)

- **Nome:** SEU NOME COMPLETO
- **GitHub:** [EmannuelBezerra](https://github.com/EmannuelBezerra)
- **Curso/Disciplina:** NOME DO CURSO / DISCIPLINA
- **Instituição:** NOME DA INSTITUIÇÃO

> Se o trabalho for em dupla ou grupo, acrescente os demais integrantes na lista acima.

## 🎯 Objetivo

Praticar os conceitos de TypeScript vistos em aula (tipos, interfaces, funções, arrays, manipulação do DOM e eventos) construindo uma aplicação web de catálogo, com o tema **jogos**.

## ✨ Funcionalidades

- **Cadastrar jogos** informando título, categoria, preço e se o jogo já foi lançado.
- **Validação do formulário**: título obrigatório, categoria válida e preço numérico não negativo, com mensagem de erro na tela.
- **Exibir o catálogo** em cards com título, categoria, preço (formatado em reais) e situação do jogo.
- **Buscar por título**, com filtragem enquanto se digita.
- **Filtrar por categoria** (Ação, Aventura, Terror, Esporte, Quebra-cabeça, RPG, FPS, TPS, Multi-player, Single-player, Cooperativo e PvP).
- **Atualizar o estado** do jogo entre "Lançado" e "Em desenvolvimento".
- **Remover jogos** do catálogo.
- **Resumo automático** com o total de jogos, quantos foram lançados e quantos estão em desenvolvimento.

> ℹ️ Os dados ficam apenas na memória do navegador. Ao recarregar a página, o catálogo volta a ficar vazio.

## 🛠️ Tecnologias

- HTML5
- CSS3
- TypeScript
- Node.js e npm (para instalar e executar o compilador do TypeScript)

## 📁 Estrutura do projeto

```
catalogo-jogos/
├── src/
│   └── main.ts          # código-fonte em TypeScript
├── dist/
│   └── main.js          # JavaScript gerado pela compilação
├── index.html           # página principal
├── style.css            # estilos
├── logo.jpeg            # logo da página
├── tsconfig.json        # configuração do compilador TypeScript
├── package.json         # dependências do projeto
└── package-lock.json
```

A pasta `node_modules` **não** acompanha o projeto. Ela é criada ao instalar as dependências (veja abaixo).

## 🚀 Instalação, compilação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada), que já inclui o npm
- [Git](https://git-scm.com/)
- Um navegador atualizado (Chrome, Edge, Firefox etc.)

### Passo a passo

1. **Clone o repositório** e entre na pasta do projeto:

   ```bash
   git clone git@github.com:EmannuelBezerra/Cat-logo-interativo-com-TypeScript.git
   cd Cat-logo-interativo-com-TypeScript
   ```

2. **Instale as dependências** (isso cria a pasta `node_modules`):

   ```bash
   npm install
   ```

3. **Compile o TypeScript** (gera/atualiza o arquivo `dist/main.js`):

   ```bash
   npx tsc
   ```

   Para recompilar automaticamente a cada alteração em `src/main.ts`, use:

   ```bash
   npx tsc --watch
   ```

4. **Execute a aplicação** abrindo o arquivo `index.html` no navegador:
   - dê um duplo clique em `index.html`, **ou**
   - no VS Code, clique com o botão direito em `index.html` e escolha **Open with Live Server** (extensão Live Server).

### Como usar

1. Preencha o formulário **Cadastrar jogo** (título, categoria, preço) e marque a caixa se o jogo já foi lançado.
2. Clique em **Adicionar**. O jogo aparece na lista e o resumo é atualizado.
3. Use o campo **Buscar por título** e o seletor de categoria para filtrar a lista.
4. Em cada card, use **Marcar como lançado / em desenvolvimento** para alterar a situação ou **Excluir** para remover o jogo.

## 🎥 Vídeo de demonstração

[Assista ao vídeo aqui](COLE_O_LINK_DO_VIDEO)

## 📄 Licença

Projeto desenvolvido para fins acadêmicos.
