const container = document.getElementById("container");
const boxes = document.querySelectorAll(".btn");
const numBoxes = boxes.length;

const boxProperties = [];
console.log(container.clientWidth);
// Set initial positions for the boxes side by side in the center
let x = container.clientWidth / 2 - (numBoxes * 100) / 2; // Assuming each box has a width of 50px

boxes.forEach((box, index) => {
  box.style.left = x + "px";
  x += 200; // Adjust for the box width

  boxProperties.push({
    element: box,
    x: parseInt(box.style.left),
    y: (container.clientHeight / 2) - 100, // Assuming each box has a height of 50px (was 25)
    xSpeed: (Math.random() - 0.5) * 2,
    ySpeed: (Math.random() - 0.5) * 2,
    width: 200, // Adjust for the box width
    height: 200, // Adjust for the box height
  });
});

function updateBoxPositions() {
  boxProperties.forEach((box) => {
    box.x += box.xSpeed;
    box.y += box.ySpeed;

    // Check for collisions with container boundaries
    if (box.x < 0 || box.x + box.width > container.clientWidth) {
      box.xSpeed *= -1;
    }

    if (box.y < 0 || box.y + box.height > container.clientHeight) {
      box.ySpeed *= -1;
    }

    box.element.style.left = box.x + "px";
    box.element.style.top = box.y + "px";
  });
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
        // Reverse directions to simulate bouncing
        [box1.xSpeed, box2.xSpeed] = [box2.xSpeed, box1.xSpeed];
        [box1.ySpeed, box2.ySpeed] = [box2.ySpeed, box1.ySpeed];
      }
    }
  }
}

function animate() {
  updateBoxPositions();
  checkCollisions();
  requestAnimationFrame(animate);
}

animate();
