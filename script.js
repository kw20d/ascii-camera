let canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;


let chars =  "@%#*+=-:. ";
c.font = ('12px monospace');

const cols = 40, rows = 20;

let getBrightness = (x, y) => {
    //return x / (cols - 1);
    //return (x + y) / (cols + rows - 2);
    return (Math.sin(x / 5 + Date.now() / 500) + 1) / 2;
};

let animate = () => {
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