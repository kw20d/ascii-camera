let canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;


let chars =  "@%#*+=-:. ";
c.font = ('12px monospace');

const cols = 40;
let rows = 20;

let newCanvas = document.createElement('canvas');
let nc = newCanvas.getContext('2d', { willReadFrequently: true });
newCanvas.width = cols;
newCanvas.height = rows;

newCanvas.style.cssText = 'position:fixed; top:10px; right:10px; width:200px; image-rendering:pixelated; border:1px solid red';
document.body.appendChild(newCanvas);

video.addEventListener('loadedmetadata', () => {
    rows = Math.round(cols * (video.videoHeight / video.videoWidth) * 0.55);
    newCanvas.height = rows;
    requestAnimationFrame(animate);
});
console.log(video.videoWidth, video.videoHeight, video.readyState)

let getBrightness = (x, y) => {
    //return x / (cols - 1);
    //return (x + y) / (cols + rows - 2);
    return (Math.sin(x / 5 + Date.now() / 500) + 1) / 2;
};

let animate = () => {
    nc.drawImage(video, 0, 0, cols, rows);
    c.clearRect(0, 0, canvas.width, canvas.height);
    let values = '';
    for(let i = 0; i < rows; i++) {
        values = '';
        for(let j = 0; j < cols; j++) {
            values += chars[Math.floor(getBrightness(j,i) * (chars.length - 1))];
        }
        c.fillText(values, 12, i * 12 + 10);
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);