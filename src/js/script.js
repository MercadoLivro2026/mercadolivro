const botao = document.getElementById("tema");

botao.addEventListener("click", function () {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botao.textContent = "Modo claro";
    } else {
        botao.textContent = "Modo escuro";
    }
});

const livros = [
    {
        titulo: "O Senhor dos Anéis",
        preco: "R\$ 59,90",
        imagem: "https://unsplash.com"
    },
    {
        titulo: "1984 - George Orwell",
        preco: "R\$ 34,90",
        imagem: "https://unsplash.com"
    },
    {
        titulo: "Dom Casmurro",
        preco: "R\$ 24,90",
        imagem: "https://unsplash.com"
    },
    {
        titulo: "O Hobbit",
        preco: "R\$ 45,00",
        imagem: "https://unsplash.com"
    }
];

const containerCards = document.getElementById("container-cards");

function renderizarCards() {
    containerCards.innerHTML = "";

    livros.forEach(livro => {
        const card = document.createElement("div");
        card.classList.add("card-livro");

        card.innerHTML = `
            <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p class="preco">${livro.preco}</p>
            <button class="btn-comprar">Comprar</button>
        `;

        containerCards.appendChild(card);
    });
}

renderizarCards();
