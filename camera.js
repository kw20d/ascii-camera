const video = document.querySelector('#video');
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
    } catch (err) {
    console.error('Camera error:', err.name, err.message);
}
}
startCamera()