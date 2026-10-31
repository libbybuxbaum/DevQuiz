
const perguntasPorCategoria = {
    HTML: [
        {
            pergunta: "O que significa HTML?",
            alternativas: [
                "Hyper Text Markup Language",
                "HighText Machine Language",
                "HyperTool Multi Language",
                "HomeText Markup Language"
            ],
            respostaCorreta: 0
        },
        {
            pergunta: "Qual elemento cria um link?",
            alternativas: ["<img>", "<a>", "<p>", "<div>"],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual tag representa o maior título?",
            alternativas: ["<h6>", "<head>", "<h1>", "<title>"],
            respostaCorreta: 2
        }
    ],

    CSS: [
        {
            pergunta: "Para que serve o CSS?",
            alternativas: [
                "Criar bancos de dados",
                "Estilizar páginas web",
                "Programar servidores",
                "Criar arquivos HTML"
            ],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual propriedade altera a cor do texto?",
            alternativas: ["background", "font", "color", "text"],
            respostaCorreta: 2
        },
        {
            pergunta: "Qual propriedade altera o tamanho da fonte?",
            alternativas: ["font-size", "text-color", "size", "font-style"],
            respostaCorreta: 0
        }
    ],

    JavaScript: [
        {
            pergunta: "Qual linguagem permite adicionar interatividade a uma página web?",
            alternativas: ["HTML", "CSS", "JavaScript", "XML"],
            respostaCorreta: 2
        },
        {
            pergunta: "Qual palavra declara uma variável que pode ser alterada?",
            alternativas: ["const", "let", "fixed", "static"],
            respostaCorreta: 1
        },
        {
            pergunta: "Qual comando mostra uma mensagem no console?",
            alternativas: ["print()", "message()", "console.log()", "show()"],
            respostaCorreta: 2
        }
    ],

    Lógica: [
        {
            pergunta: "Quanto é 5 + 3?",
            alternativas: ["6", "7", "8", "9"],
            respostaCorreta: 2
        },
        {
            pergunta: "Qual estrutura permite repetir comandos?",
            alternativas: ["if", "for", "const", "return"],
            respostaCorreta: 1
        },
        {
            pergunta: "Se x = 10, quanto vale x * 2?",
            alternativas: ["10", "15", "20", "25"],
            respostaCorreta: 2
        }
    ]
};

const inicio = document.getElementById("inicio");
const quizContainer = document.getElementById("quiz-container");
const resultado = document.getElementById("resultado");

const startButton = document.getElementById("start-button");
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const progressoElemento = document.getElementById("progresso");
const barraProgresso = document.getElementById("barra-progresso");
const categoriaAtual = document.getElementById("categoria-atual");
const proximaButton = document.getElementById("proxima");

const pontuacaoElemento = document.getElementById("pontuacao");
const mensagemFinal = document.getElementById("mensagem-final");
const reiniciarButton = document.getElementById("reiniciar");

let categoriaSelecionada = "HTML";
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

// Seleção de categoria

document.querySelectorAll(".categoria").forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaSelecionada = botao.dataset.categoria;

        document.querySelectorAll(".categoria").forEach(item => {
            item.classList.remove("selecionada");
        });

        botao.classList.add("selecionada");
    });
});

// Iniciar quiz

startButton.addEventListener("click", iniciarQuiz);

function iniciarQuiz() {
    perguntas = perguntasPorCategoria[categoriaSelecionada];

    perguntaAtual = 0;
    pontuacao = 0;

    inicio.classList.add("escondida");
    resultado.classList.add("escondida");
    quizContainer.classList.remove("escondida");

    categoriaAtual.textContent = categoriaSelecionada;

    mostrarPergunta();
}

// Mostrar pergunta

function mostrarPergunta() {
    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;
    alternativasElemento.innerHTML = "";

    progressoElemento.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    barraProgresso.style.width =
        `${(perguntaAtual / perguntas.length) * 100}%`;

    proximaButton.classList.add("escondida");

    pergunta.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);
    });
}

// Verificar resposta

function verificarResposta(indice, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];
    const botoes = alternativasElemento.querySelectorAll("button");

    botoes.forEach((botao, indiceBotao) => {
        botao.disabled = true;

        if (indiceBotao === pergunta.respostaCorreta) {
            botao.classList.add("correta");
        }
    });

    if (indice === pergunta.respostaCorreta) {
        pontuacao++;
    } else {
        botaoEscolhido.classList.add("errada");
    }

    proximaButton.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    proximaButton.classList.remove("escondida");
}

// Próxima pergunta

proximaButton.addEventListener("click", () => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Resultado final

function mostrarResultado() {
    quizContainer.classList.add("escondida");
    resultado.classList.remove("escondida");

    barraProgresso.style.width = "100%";

    pontuacaoElemento.textContent =
        `${pontuacao} / ${perguntas.length}`;

    const porcentagem = (pontuacao / perguntas.length) * 100;

    if (porcentagem === 100) {
        mensagemFinal.textContent =
            "Excelente! Você acertou todas as perguntas!";
    } else if (porcentagem >= 60) {
        mensagemFinal.textContent =
            "Muito bem! Você está no caminho certo!";
    } else {
        mensagemFinal.textContent =
            "Continue praticando! Você vai evoluir cada vez mais.";
    }
}

// Reiniciar

reiniciarButton.addEventListener("click", () => {
    resultado.classList.add("escondida");
    inicio.classList.remove("escondida");
});
