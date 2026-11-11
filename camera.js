const video = document.querySelector('#video');
const btn = document.querySelector('#startBtn');
let stream = null;


async function startCamera() {
    try {
        if (!stream) {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        }
        stream.getVideoTracks().forEach(track => track.enabled = true);
        await video.play();

        btn.textContent = 'STOP THE CAMERA';
        btn.onclick = stopCamera;
        } catch (err) {
        console.error('Camera error:', err.name, err.message);

        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');

        // 1. Fill the canvas background
        ctx.fillStyle = '#050806';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Style and center the error message
        ctx.fillStyle = '#008F46'; // Matches your green theme (or use '#ff4444' for red)
        ctx.font = '24px "VT323", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 3. Draw the text in the exact middle of the canvas
        const message = err.name === 'NotAllowedError' 
            ? 'CAMERA PERMISSION NOT ALLOWED' 
            : 'CAMERA ERROR: ' + err.name.toUpperCase();

        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    video.pause();
    video.srcObject = null;
    btn.textContent = 'START THE CAMERA';
    btn.onclick = startCamera;
}
btn.onclick = startCamera;
