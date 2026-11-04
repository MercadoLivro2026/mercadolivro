// Catálogo original do projeto. As capas são consultadas por ISBN no Open Library.
const livros = [
    { titulo: "O Senhor dos Anéis", autor: "J. R. R. Tolkien", categoria: "Fantasia", preco: "R$ 59,90", isbn: "9780618640157" },
    { titulo: "1984 - George Orwell", autor: "George Orwell", categoria: "Distopia", preco: "R$ 34,90", isbn: "9788535914849" },
    { titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Literatura brasileira", preco: "R$ 24,90", isbn: "9788582850350" },
    { titulo: "O Hobbit", autor: "J. R. R. Tolkien", categoria: "Fantasia", preco: "R$ 45,00", isbn: "9788595084742" }
];

const containerCards = document.getElementById("container-cards");
const inputPesquisa = document.getElementById("input-pesquisa");
const resultado = document.getElementById("resultado");
const semResultados = document.getElementById("sem-resultados");
const botaoTema = document.getElementById("tema");
const avisoCarrinho = document.getElementById("aviso-carrinho");
let temporizadorAviso;

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function renderizarCards() {
    containerCards.replaceChildren();
    livros.forEach(livro => {
        const card = document.createElement("article");
        card.className = "card-livro";
        card.innerHTML = `
            <div class="capa">
                <img src="https://covers.openlibrary.org/b/isbn/${livro.isbn}-L.jpg?default=false"
                    alt="Capa de ${livro.titulo}" width="150" height="220" loading="lazy" decoding="async">
                <div class="capa-alternativa" hidden><strong>${livro.titulo}</strong><span>${livro.autor}</span></div>
            </div>
            <div class="card-conteudo">
                <p class="categoria">${livro.categoria}</p>
                <h3>${livro.titulo}</h3>
                <p class="autor">${livro.autor}</p>
                <p class="preco">${livro.preco}</p>
                <button class="btn-comprar" type="button" aria-label="Comprar ${livro.titulo}">Comprar</button>
            </div>`;
        // A capa alternativa mantém título e autor legíveis se o serviço estiver indisponível.
        card.querySelector("img").addEventListener("error", evento => {
            evento.currentTarget.hidden = true;
            card.querySelector(".capa-alternativa").hidden = false;
        }, { once: true });
        containerCards.appendChild(card);
    });
}

function filtrarLivros() {
    const termo = normalizar(inputPesquisa.value);
    let quantidade = 0;
    containerCards.querySelectorAll(".card-livro").forEach((card, indice) => {
        const livro = livros[indice];
        const corresponde = normalizar(`${livro.titulo} ${livro.autor}`).includes(termo);
        card.hidden = !corresponde;
        if (corresponde) quantidade++;
    });
    resultado.textContent = quantidade === 0 ? "Nenhum livro encontrado" : `Mostrando ${quantidade} ${quantidade === 1 ? "livro" : "livros"}`;
    semResultados.hidden = quantidade > 0;
}

document.querySelector(".pesquisa").addEventListener("submit", evento => {
    evento.preventDefault();
    filtrarLivros();
});
inputPesquisa.addEventListener("input", filtrarLivros);
document.getElementById("limpar-pesquisa").addEventListener("click", () => {
    inputPesquisa.value = "";
    filtrarLivros();
    inputPesquisa.focus();
});

function aplicarTema(escuro) {
    document.body.classList.toggle("escuro", escuro);
    botaoTema.textContent = escuro ? "Modo claro" : "Modo escuro";
    botaoTema.setAttribute("aria-pressed", String(escuro));
}

// O site também funciona quando o navegador bloqueia o armazenamento local.
try { aplicarTema(localStorage.getItem("mercadolivro-tema") === "escuro"); } catch { aplicarTema(false); }
botaoTema.addEventListener("click", () => {
    const escuro = !document.body.classList.contains("escuro");
    aplicarTema(escuro);
    try { localStorage.setItem("mercadolivro-tema", escuro ? "escuro" : "claro"); } catch { /* Preferência válida apenas nesta visita. */ }
});

containerCards.addEventListener("click", evento => {
    const botao = evento.target.closest(".btn-comprar");
    if (!botao) return;
    const titulo = botao.closest(".card-livro").querySelector("h3").textContent;
    clearTimeout(temporizadorAviso);
    avisoCarrinho.textContent = `Compra simulada: “${titulo}” foi adicionado ao carrinho.`;
    temporizadorAviso = setTimeout(() => { avisoCarrinho.textContent = ""; }, 5000);
});

renderizarCards();
filtrarLivros();
