//Declaring the display canvas
let canvas = document.querySelector('#canvas');
//Getting its context
const c = canvas.getContext('2d');
//Setting it to be the size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Forcing gthe body margin to 0 so that the canvas takes the full window
document.body.style.margin = 0;


//The Chars we use for the effect
let chars =  "@%#*+=-:. ";
//The helper function to adjust the size
let setGrid = (newCols) => {
    //Sets the Width to the slider's value and calculate the rest of the values in relation to it
    cols = newCols;
    rows = Math.round(cols * (video.videoHeight / video.videoWidth) * 0.55);
    newCanvas.width = cols;
    newCanvas.height = rows;
    fontSize = Math.floor(canvas.width / (cols * 0.6));
    c.font = fontSize + 'px monospace';
}

//Declaring the drawing canvas
let newCanvas = document.createElement('canvas');
//Getting its context
let nc = newCanvas.getContext('2d', { willReadFrequently: true });
//Initiating the variables needed
let cols;
let rows;
let fontSize;

//Gettign the slider
let slider = document.querySelector('#slider');
slider.addEventListener('click', () => {
    setGrid(Number(slider.value));
});

newCanvas.style.cssText = 'position:fixed; top:10px; right:10px; width:200px; image-rendering:pixelated; border:1px solid red';
//document.body.appendChild(newCanvas);


video.addEventListener('loadedmetadata', () => {
    setGrid(Number(slider.value));
    requestAnimationFrame(animate);
});

let getBrightness = (x, y, frame) => {
    const i = (y * cols + x) * 4;
    return (0.299 * frame[i] + 0.587 * frame[i+1] + 0.114 * frame[i+2]) / 255;
};


let animate = () => {
    nc.drawImage(video, 0, 0, cols, rows);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.fillStyle = '#00ff66';
    const frame = nc.getImageData(0, 0, cols, rows).data;
    let values = '';
    for(let i = 0; i < rows; i++) {
        values = '';
        for(let j = 0; j < cols; j++) {
            values += chars[Math.floor(getBrightness(cols - 1 - j, i, frame) * (chars.length - 1))];
        }
        c.fillText(values, fontSize, i * fontSize + 10);
    }
    requestAnimationFrame(animate);
}