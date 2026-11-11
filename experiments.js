let canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;

/*
c.fillStyle = 'red';
c.fillRect(25,25,50,50);

c.arc(50,150,25,0,2*Math.PI);
c.fill()
*/

/*
c.strokeStyle = 'black';
c.lineWidth = 30;
c.beginPath();
c.arc(65,65,60,0,2*Math.PI);
c.moveTo(55,50);
c.arc(50,50,5,0,2*Math.PI);
c.moveTo(85,50);
c.arc(80,50,5,0,2*Math.PI);
c.moveTo(30,80);
c.quadraticCurveTo(65,100,100,80);
c.stroke();
*/

/*
c.strokeStyle = 'green';
c.lineWidth = .3;
c.beginPath();
c.font = ('20px monospace');
c.strokeText('Hello ASCII', 50,50);

c.fillStyle = 'green';
c.beginPath();
c.font = ('20px monospace');
c.fillText('Hello ASCII', 100,50);
*/

/*
for(let i = 0; i < 10; i++){
    c.beginPath();
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    c.arc(x, y, 30, 0, 2*Math.PI, false);
    c.stroke();
}
*/