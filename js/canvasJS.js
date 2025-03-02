const canvas = document.getElementById("canvasMindMap");
const parent = canvas.parentElement;
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

// Define tamanho do canvas considerando a densidade de pixels
canvas.width = parent.clientWidth * dpr;
canvas.height = parent.clientHeight * dpr;
ctx.scale(dpr, dpr);

// Variáveis para controle do panning
let offsetX = 0, offsetY = 0;  // Deslocamento da grade
let isPanning = false;
let startX = 0, startY = 0;

// Ajusta o tamanho do canvas dinamicamente
function resizeCanvas() {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    draw();
}
resizeCanvas();

// Desenha a grade considerando deslocamento
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grade(50);
}

// Função para desenhar a grade com deslocamento (panning)
function grade(spacing) {
    ctx.strokeStyle = "#ffffffaa";
    ctx.lineWidth = 1;

    // Linhas verticais
    for (let i = -canvas.width * 2; i < canvas.width * 2; i += spacing) {
        let x = i + offsetX % spacing;
        line(x, 0, x, canvas.height);
    }

    // Linhas horizontais
    for (let i = -canvas.height * 2; i < canvas.height * 2; i += spacing) {
        let y = i + offsetY % spacing;
        line(0, y, canvas.width, y);
    }
}

// Função para desenhar uma linha
function line(startX, startY, finalX, finalY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(finalX, finalY);
    ctx.stroke();
}

// Eventos de panning
canvas.addEventListener("mousedown", (event) => {
    isPanning = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
});

canvas.addEventListener("mousemove", (event) => {
    if (isPanning) {
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        draw(); // Redesenha a grade ao mover
    }
});

canvas.addEventListener("mouseup", () => {
    isPanning = false;
});

canvas.addEventListener("mouseleave", () => {
    isPanning = false;
});

draw(); // Chama a função para exibir a grade
