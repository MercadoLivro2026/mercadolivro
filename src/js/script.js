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

containerCards.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("btn-comprar")) {
        const card = evento.target.closest(".card-livro");
        const titulo = card.querySelector("h3").innerText;
        
        alert(`O livro "${titulo}" foi adicionado ao seu carrinho!`);
    }
});

const inputPesquisa = document.getElementById("input-pesquisa");
const btnPesquisa = document.getElementById("btn-pesquisa");

function filtrarLivros() {
    const termoDigitado = inputPesquisa.value.toLowerCase();
    const todosOsCards = containerCards.querySelectorAll(".card-livro");

    todosOsCards.forEach(card => {
        const tituloCard = card.querySelector("h3").innerText.toLowerCase();
        
        if (tituloCard.includes(termoDigitado)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

btnPesquisa.addEventListener("click", filtrarLivros);

inputPesquisa.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        filtrarLivros();
    }
});

function criarContadorDeResultados() {
    const divResultado = document.createElement("div");
    divResultado.id = "resultado"; 
    divResultado.innerText = `Mostrando ${livros.length} livro(s)`;

    const main = document.querySelector("main");
    main.insertBefore(divResultado, containerCards);

    inputPesquisa.addEventListener("keyup", function() {
        const termoDigitado = inputPesquisa.value.toLowerCase();
        let quantidadeVisivel = 0;
        const todosOsCards = containerCards.querySelectorAll(".card-livro");

        todosOsCards.forEach(card => {
            const tituloCard = card.querySelector("h3").innerText.toLowerCase();
            if (tituloCard.includes(termoDigitado)) {
                quantidadeVisivel++;
            }
        });

        if (quantidadeVisivel === 0) {
            divResultado.innerText = "Nenhum livro encontrado.";
            divResultado.style.color = "red";
        } else {
            divResultado.innerText = `Mostrando ${quantidadeVisivel} livro(s)`;
            divResultado.style.color = "";
        }
    });
}

criarContadorDeResultados();