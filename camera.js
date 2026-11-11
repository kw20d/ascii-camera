const video = document.querySelector('#video');
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
    } catch(error) {
        console.log('Camera error:', err);
    }
}
startCamera()