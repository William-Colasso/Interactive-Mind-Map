const canvas = document.getElementById("canvasMindMap");
const parent = canvas.parentElement;
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

// Define tamanho do canvas considerando a densidade de pixels
canvas.width = parent.clientWidth * dpr;
canvas.height = parent.clientHeight * dpr;
ctx.scale(dpr, dpr);

// Variáveis para controle do panning
let offsetX = 0, offsetY = 0;
let isPanning = false;
let startX = 0, startY = 0;

// Array para armazenar os paths (coordenadas no mundo da grade)
let paths = [
    { type: "line", x1: 200, y1: 200, x2: 400, y2: 200, color: "red" },
    { type: "circle", x: 300, y: 300, radius: 30, color: "blue" }
];

// Ajusta o tamanho do canvas dinamicamente
function resizeCanvas() {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    draw();
}
resizeCanvas();

// Função para desenhar o conteúdo da tela
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha um quadrado fixo na grade (não na tela)
    ctx.fillStyle = "green";
    ctx.fillRect(50 + offsetX, 50 + offsetY, 50, 50);

    grade(50); // Desenha a grade
    drawPaths(); // Desenha os paths dinâmicos
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

// Desenha os paths que pertencem ao mundo da grade
function drawPaths() {
    paths.forEach(path => {
        ctx.strokeStyle = path.color;
        ctx.fillStyle = path.color;
        ctx.lineWidth = 2;

        if (path.type === "line") {
            line(
                path.x1 + offsetX, path.y1 + offsetY, 
                path.x2 + offsetX, path.y2 + offsetY
            );
        } else if (path.type === "circle") {
            ctx.beginPath();
            ctx.arc(
                path.x + offsetX, path.y + offsetY, 
                path.radius, 0, Math.PI * 2
            );
            ctx.fill();
        }
    });
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
        draw(); // Redesenha ao mover
    }
});

canvas.addEventListener("mouseup", () => {
    isPanning = false;
});

canvas.addEventListener("mouseleave", () => {
    isPanning = false;
});

// Adiciona um novo path ao clicar no canvas
canvas.addEventListener("dblclick", (event) => {
    const worldX = event.clientX - offsetX;
    const worldY = event.clientY - offsetY;

    paths.pop()

    paths.push({
        type: "circle",
        x: worldX,
        y: worldY,
        radius: 20,
        color: "yellow"
    });

    draw();
});

draw(); // Chama a função para exibir a grade e os paths
