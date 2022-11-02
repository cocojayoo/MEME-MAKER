const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;    
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
    
}

function onModeClick(){
if(isFilling){
    isFilling = false
    modeBtn.innerText ="Fill";
}else{
    isFilling = true
    modeBtn.innerText ="Draw";
}
}
function onCanvasClick() {
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText ="Fill";
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
color.addEventListener("change", onColorChange);
lineWidth.addEventListener("change", onLineWidthChange);

colorOption.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
//     "#18dcff",
//     "#7d5fff",
// ]


// function onClick(event) {
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
// canvas.addEventListener("mousemove", onClick);