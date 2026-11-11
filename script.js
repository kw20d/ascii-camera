let canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;

let chars =  "@%#*+=-:. ";

const cols = 80;
let rows = 20;
const fontSize = 20;
c.font = (fontSize + 'px monospace');

let newCanvas = document.createElement('canvas');
let nc = newCanvas.getContext('2d', { willReadFrequently: true });
newCanvas.width = cols;
newCanvas.height = rows;

newCanvas.style.cssText = 'position:fixed; top:10px; right:10px; width:200px; image-rendering:pixelated; border:1px solid red';
//document.body.appendChild(newCanvas);

video.addEventListener('loadedmetadata', () => {
    rows = Math.round(cols * (video.videoHeight / video.videoWidth) * 0.55);
    newCanvas.height = rows;
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
            values += chars[Math.floor((1 - getBrightness(cols - 1 - j, i, frame)) * (chars.length - 1))];
        }
        c.fillText(values, fontSize, i * fontSize + 10);
    }
    requestAnimationFrame(animate);
}