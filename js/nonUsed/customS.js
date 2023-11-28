const container = document.getElementById('container');
const btn = document.querySelector('.btn');

const maxX = container.clientWidth - btn.clientWidth;
const maxY = container.clientHeight - btn.clientHeight;

let xSpeed = 2;
let ySpeed = 2;

function animate() {
    const currentX = parseInt(btn.style.left) || 0;
    const currentY = parseInt(btn.style.top) || 0;

    if (currentX >= maxX || currentX <= 0) {
    xSpeed *= -1;
    }

    if (currentY >= maxY || currentY <= 0) {
    ySpeed *= -1;
    }

    btn.style.left = currentX + xSpeed + 'px';
    btn.style.top = currentY + ySpeed + 'px';

    requestAnimationFrame(animate);
}

animate();
