const botao = document.getElementById("tema");

botao.addEventListener("click", function () {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botao.textContent = "Modo claro";
    } else {
        botao.textContent = "Modo escuro";
    }
});

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