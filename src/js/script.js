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

