// script.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const eraserButton = document.getElementById('eraser-button');
const clearButton = document.getElementById('clear-button');
const saveButton = document.getElementById('save-button');

let painting = false;
let erasing = false;

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
colorPicker.addEventListener('change', updateColor);
brushSize.addEventListener('input', updateBrushSize);
eraserButton.addEventListener('click', toggleEraser);
clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveCanvas);

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';
  if (erasing) {
    ctx.strokeStyle = '#fff'; // white color for eraser
  } else {
    ctx.strokeStyle = colorPicker.value; // selected color
  }
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function updateColor() {
  if (!erasing) {
    ctx.strokeStyle = colorPicker.value;
  }
}

function updateBrushSize() {
  ctx.lineWidth = brushSize.value;
}

function toggleEraser() {
  erasing = !erasing;
  if (erasing) {
    eraserButton.textContent = 'Brush';
    colorPicker.disabled = true;
  } else {
    eraserButton.textContent = 'Eraser';
    colorPicker.disabled = false;
    ctx.strokeStyle = colorPicker.value;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'drawing.png';
  link.click();
}
