const container = document.getElementById("container");
const boxes = document.querySelectorAll(".btn");
const numBoxes = boxes.length;
const boxWidth = 200;
const boxHeight = 200;

const boxProperties = [];

boxes.forEach((box, index) => {
  // Randomized initial positions within the container
  const initialX = Math.random() * (container.clientWidth - boxWidth);
  const initialY = Math.random() * (container.clientHeight - boxHeight);

  box.style.left = initialX + "px";
  box.style.top = initialY + "px";

  boxProperties.push({
    element: box,
    x: initialX,
    y: initialY,
    xSpeed: (Math.random() - 0.5) * 4, // Adjusted for faster movement
    ySpeed: (Math.random() - 0.5) * 4, // Adjusted for faster movement
    width: boxWidth,
    height: boxHeight,
  });
});

function updateBoxPositions() {
  boxProperties.forEach((box) => {
    box.x += box.xSpeed;
    box.y += box.ySpeed;

    // Wrap around to the other side of the container
    if (box.x + box.width < 0) {
      box.x = container.clientWidth;
    } else if (box.x > container.clientWidth) {
      box.x = -box.width;
    }

    if (box.y + box.height < 0) {
      box.y = container.clientHeight;
    } else if (box.y > container.clientHeight) {
      box.y = -box.height;
    }

    box.element.style.left = box.x + "px";
    box.element.style.top = box.y + "px";
  });
}

function animate() {
  updateBoxPositions();
  requestAnimationFrame(animate);
}

animate();
