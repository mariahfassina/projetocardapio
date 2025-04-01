// Função para criar o template de cada prato
function criarPratoTemplate(prato) {
    return `
        <article>
            <img src="${prato.imagem}" alt="Prato de ${prato.nome}" loading="lazy">
            <h3>${prato.nome}</h3>
            <p>${prato.descricao}</p>
            <p>Preço: ${prato.preco}</p>
            <button class="add-to-cart">Adicionar ao Carrinho</button>
        </article>
    `;
}

// Função para gerar os pratos
function gerarMenu(pratos, containerId) {
    const container = document.getElementById(containerId);
    pratos.forEach(prato => {
        const pratoHTML = criarPratoTemplate(prato);
        container.innerHTML += pratoHTML; // Adiciona o prato ao container
    });
}

// Função para carregar os dados de um arquivo JSON
function carregarDadosJSON() {
    fetch('dados.json') // Caminho do arquivo JSON
        .then(response => response.json())  
        .then(data => {
            // Gerar menus com os dados carregados
            gerarMenu(data.massas, 'menu-massas');
            gerarMenu(data.sobremesas, 'menu-sobremesas');
            gerarMenu(data.tipicos, 'menu-tipicos');
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
        });
}

// Função para atualizar o contador do carrinho
function atualizarCarrinho() {
    const contadorCarrinho = document.getElementById('contador-carrinho');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    contadorCarrinho.textContent = carrinho.length;
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const prato = event.target.closest('article');
        const nomePrato = prato.querySelector('h3').textContent;

        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(nomePrato);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        atualizarCarrinho();
    }
}

// Adiciona o evento de clique nos botões de adicionar ao carrinho
document.addEventListener('click', adicionarAoCarrinho);

// Atualiza o contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosJSON();
    atualizarCarrinho();
});

// Filtro de categorias (exibição do dropdown)
document.getElementById('filtro').addEventListener('click', function () {
    const opcoes = document.getElementById('filtro-opcoes');
    opcoes.style.display = (opcoes.style.display === 'block') ? 'none' : 'block';
});

// Seleção dos filtros
document.getElementById('filtrar-massas').addEventListener('click', function () {
    document.getElementById('menu-massas').style.display = 'block';
    document.getElementById('menu-sobremesas').style.display = 'none';
    document.getElementById('menu-tipicos').style.display = 'none';
});

document.getElementById('filtrar-sobremesas').addEventListener('click', function () {
    document.getElementById('menu-sobremesas').style.display = 'block';
    document.getElementById('menu-massas').style.display = 'none';
    document.getElementById('menu-tipicos').style.display = 'none';
});

document.getElementById('filtrar-tipicos').addEventListener('click', function () {
    document.getElementById('menu-tipicos').style.display = 'block';
    document.getElementById('menu-massas').style.display = 'none';
    document.getElementById('menu-sobremesas').style.display = 'none';
});
