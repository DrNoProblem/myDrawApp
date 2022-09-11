const canvas = document.getElementById('drawing-board');
console.log(canvas);
const toolbar = document.getElementById('toolbar');
console.log(toolbar);
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX - 20;
canvas.height = window.innerHeight - canvasOffsetY -20;

let isPainting = false;
let isTyping = false;

var hasInput = false;
var font = '14px sans-serif';
let lineWidth = document.getElementById("lineWidth").value;
let startX;
let startY;

var isUseTool = 'brush';


toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }


});

toolbar.addEventListener('click', e => {
    if (e.target.id === 'brush') {
        ctx.strokeStyle = document.getElementById("stroke").value;
        document.getElementById("lineWidth").value = 10;
        lineWidth = document.getElementById("lineWidth").value;
        isUseTool = 'brush'
    }
    else if (e.target.id === 'eraser') {
        ctx.strokeStyle = "white";
        document.getElementById("lineWidth").value = 40;
        lineWidth = document.getElementById("lineWidth").value;
        
    }
    else if (e.target.id === 'textarea') {
        isUseTool = 'textarea'
        console.log("not working");
    }
    else if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else if (e.target.id === 'load') {
        let img = new Image();
        // Once the image is loaded clear the canvas and draw it
        img.onload = function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img,0,0);
        }
        img.src = 'image.png';

    }
    else if (e.target.id === 'save') {
        // Get a reference to the link element
        var imageFile = document.getElementById("drawing-board");
        // Set that you want to download the image when link is clicked
        imageFile.setAttribute('download', 'image.png');
        // Reference the image in canvas for download
        imageFile.setAttribute('href', canvas.toDataURL());
    }

});


const draw = (e) => {
    if(isPainting) {
        canvas.style.cursor = "crosshair";

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        ctx.stroke();
    }
}

canvas.addEventListener('mousedown', (e) => {
    if (isUseTool == 'brush' || isUseTool == 'eraser'){
        isPainting = true;
    }
    else if (isUseTool == 'textarea'){
        isTyping = true;
        draw;
    }
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    
    if(isPainting) {
        isPainting = false;
    }
    ctx.stroke();
    ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

function toogleActive(id_button) {
    isUseTool = id_button;
    var element_toggle = document.querySelector('.active')
    element_toggle.classList.toggle("active");
    document.getElementById(id_button).classList.toggle("active");
}

function SaveImage(){
    // Get a reference to the link element 
    var imageFile = document.getElementById("img-file");
    // Set that you want to download the image when link is clicked
    imageFile.setAttribute('download', 'image.png');
    // Reference the image in canvas for download
    imageFile.setAttribute('href', canvas.toDataURL());
}

/* ----------------------------------------------------------------------------------------------- */

canvas.onclick = function(e) {
    if (!hasInput && isUseTool === 'textarea') {
        addInput(e.clientX, e.clientY);
    }
}

//Function to dynamically add an input box: 
function addInput(x, y) {

    var input = document.createElement('input');

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x - 4) + 'px';
    input.style.top = (y - 4) + 'px';

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    hasInput = true;
}

//Key handler for input box:
function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
        drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
        hasInput = false;
    }
}

//Draw the text onto canvas:
function drawText(txt, x, y) {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = font;
    ctx.fillText(txt, x - 4, y - 4);
}