const container = document.getElementById('container');
const buttons = document.querySelectorAll('.buttons');
console.log(buttons);

const maxX = container.clientWidth;
console.log(maxX);
const maxY = container.clientHeight;

const xSpeeds = [];
const ySpeeds = [];

for (let i = 0; i < buttons.length; i++) {
    xSpeeds[i] = (Math.random() - 0.5) * 2;
    ySpeeds[i] = (Math.random() - 0.5) * 2;
}

function animate() {
    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        var currentX = parseInt(btn.style.left);
        var currentY = parseInt(btn.style.top);


        btn.style.left = currentX + xSpeeds[i] + 'px';
        btn.style.top = currentY + ySpeeds[i] + 'px';


        if (currentX + btn.getAttribute("width") >= maxX || currentX < 0) {
            xSpeeds[i] *= -1;
        }

        if (currentY + btn.getAttribute("height") >= maxY || currentY < 0) {
            ySpeeds[i] *= -1;
        }

        // Check for collisions with other buttons
        for (let j = 0; j < buttons.length; j++) {
            if (i !== j) {
            const otherBtn = buttons[j];
            const rect1 = btn.getBoundingClientRect();
            const rect2 = otherBtn.getBoundingClientRect();
            console.log(rect1);
            if (
                rect1.right > rect2.left &&
                rect1.left < rect2.right &&
                rect1.bottom > rect2.top &&
                rect1.top < rect2.bottom
            ) {
                xSpeeds[i] *= -1;
                ySpeeds[i] *= -1;
                xSpeeds[j] *= -1;
                ySpeeds[j] *= -1;
            }
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();