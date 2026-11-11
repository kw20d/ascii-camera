/*function endIntro() {
    introContainer.classList.add('ended');
    setTimeout(() => introContainer.remove(), 700);
}
logoVideo.addEventListener('ended', endIntro);
logoVideo.addEventListener('error', endIntro);
setTimeout(endIntro, 700);*/

const introContainer = document.querySelector('#intro');
const logoVideo = document.querySelector('#logo-intro');

logoVideo.addEventListener('ended', () => {
    introContainer.classList.add('ended');
    setTimeout(() => {
        introContainer.remove();
    }, 700);
});



//Declaring the display canvas
let canvas = document.querySelector('#canvas');
//Getting its context
const c = canvas.getContext('2d');
//Setting it to be the size of the window
//Locking the canvas size
canvas.width = 640;
canvas.height = 440;
let offsetX = 0;
let offsetY = 0;

document.fonts.ready.then(() => {
  c.fillStyle = '#050806';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#008F46';
  c.font = '24px "VT323", monospace';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('CLICK TO START', canvas.width / 2, canvas.height / 2);
});


//The Chars we use for the effect
const charSets = {
  binary: " 0101",
  ascii:  " .:-=+*#%@",
  blocks: " ░▒▓█"
};
const index = document.getElementById('chars-select');
let chars = charSets[index.value];
index.addEventListener('change', (event) => {
    chars = charSets[index.value];
});

const colorSets = {
  green: "#008F46",
  realColor: 'colorMode',
};
const colorSelect = document.getElementById('colors-select');
let color = colorSets[colorSelect.value];
colorSelect.addEventListener('change', (event) => {
    color = colorSets[colorSelect.value];
});

//The helper function to adjust the size
let setGrid = (newCols) => {
    //Sets the Width to the slider's value and calculate the rest of the values in relation to it
    c.textAlign = 'left';
    c.textBaseline = 'top';
    cols = newCols;
    rows = Math.round(cols * (video.videoHeight / video.videoWidth) * 0.55);
    newCanvas.width = cols;
    newCanvas.height = rows;
    fontSize = Math.min(canvas.width / (cols * 0.6), canvas.height / rows);
    offsetX = (canvas.width - cols * fontSize * 0.6) / 2;
    offsetY = (canvas.height - rows * fontSize) / 2;
    c.font = fontSize + 'px monospace';
    c.textBaseline = 'top';
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
//Whenever there is a change it calls setGrid again
slider.addEventListener('input', () => {
    setGrid(Number(slider.value));
});

//Whene the video loads the grid is set and the animation is started
video.addEventListener('loadedmetadata', () => {
    setGrid(Number(slider.value));
    requestAnimationFrame(animate);
});

//Helper function to get the brightness at a certain pixel
let getBrightness = (x, y, frame) => {
    const i = (y * cols + x) * 4;
    return (0.299 * frame[i] + 0.587 * frame[i+1] + 0.114 * frame[i+2]) / 255;
};

//Helper function to get the colors at a certain pixel
let getColor = (x, y, frame) => {
    const i = (y * cols + x) * 4;
    //Helper function to turn the colors to hex codes
    const toHex = (val) => val.toString(16).padStart(2, '0');
    return '#' + toHex(frame[i]) + toHex(frame[i+1]) + toHex(frame[i+2]);
};

    //The main animation function
    let animate = () => {
        if (video.paused) return;
        //Draws the current frame in the Drawing canvas
        nc.drawImage(video, 0, 0, cols, rows);
        //Drawing a black rectangle as a background
        c.fillStyle = '#050806';
        c.fillRect(0,0,canvas.width,canvas.height);
        //Grabs the data from the frame countains colors and alpha values
        const frame = nc.getImageData(0, 0, cols, rows).data;
        //Helper function to get the brightness at a certain pixel
        let values = '';
        c.textAlign = 'left';
        c.textBaseline = 'top';
        c.font = fontSize + 'px monospace';

        if(color === '#008F46')
        {
            c.fillStyle = color;
            for(let i = 0; i < rows; i++) {
            values = '';
            for(let j = 0; j < cols; j++) {
                values += chars[Math.floor(getBrightness(cols - 1 - j, i, frame) * (chars.length - 1))];
            }
            c.fillText(values, offsetX, offsetY + i * fontSize);
        }   
        }
        else if(color === 'colorMode')
        {
            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < cols; j++) {
                    values = chars[Math.floor(getBrightness(cols - 1 - j, i, frame) * (chars.length - 1))];
                    c.fillStyle = getColor(cols - 1 - j, i, frame);
                    c.fillText(values,offsetX + j * fontSize * 0.6, offsetY + i * fontSize);
                }
            }
        }
        requestAnimationFrame(animate);
    }

