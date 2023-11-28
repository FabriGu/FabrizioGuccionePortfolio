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

    // Bounce off the walls of the container
    if (box.x < 0 || box.x + box.width > container.clientWidth) {
      box.xSpeed *= -1;
    }

    if (box.y < 0 || box.y + box.height > container.clientHeight) {
      box.ySpeed *= -1;
    }

    box.element.style.left = box.x + "px";
    box.element.style.top = box.y + "px";
  });

  checkCollisions(); // Check for collisions after updating positions
}

function checkCollisions() {
  for (let i = 0; i < numBoxes; i++) {
    for (let j = i + 1; j < numBoxes; j++) {
      const box1 = boxProperties[i];
      const box2 = boxProperties[j];

      if (
        box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y
      ) {
        // Reverse directions to simulate bouncing off each other
        [box1.xSpeed, box2.xSpeed] = [box2.xSpeed, box1.xSpeed];
        [box1.ySpeed, box2.ySpeed] = [box2.ySpeed, box1.ySpeed];
      }
    }
  }
}

function animate() {
  updateBoxPositions();
  requestAnimationFrame(animate);
}

animate();
