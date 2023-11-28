const container = document.getElementById("container");
const boxes = document.querySelectorAll(".btn");

// Ensure there are boxes to move
if (boxes.length > 0) {
  // Set initial positions for the boxes side by side in the center
  const containerWidth = container.clientWidth;
  const totalBoxWidth = Array.from(boxes).reduce((acc, box) => acc + box.clientWidth, 0);
  let x = (containerWidth - totalBoxWidth) / 2;

  boxes.forEach(box => {
    box.style.left = x + "px";
    x += box.clientWidth;
  });

  // Define an array to store box properties
  const boxProperties = [];

  boxes.forEach(box => {
    boxProperties.push({
      element: box,
      x: parseInt(box.style.left),
      y: container.clientHeight / 2 - box.clientHeight / 2, // Center vertically
      xSpeed: (Math.random() - 0.5) * 2,
      ySpeed: (Math.random() - 0.5) * 2,
      width: box.clientWidth,
      height: box.clientHeight,
    });
  });

  // Function to update box positions
  function updateBoxPositions() {
    boxProperties.forEach(box => {
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

  // Function to check for collisions between boxes
  function checkCollisions() {
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const box1 = boxProperties[i];
        const box2 = boxProperties[j];

        if (
          box1.x < box2.x + box2.width &&
          box1.x + box1.width > box2.x &&
          box1.y < box2.y + box2.height &&
          box1.y + box1.height > box2.y
        ) {
          // Reverse directions to simulate bouncing
          const tempXSpeed = box1.xSpeed;
          const tempYSpeed = box1.ySpeed;

          box1.xSpeed = box2.xSpeed;
          box1.ySpeed = box2.ySpeed;
          box2.xSpeed = tempXSpeed;
          box2.ySpeed = tempYSpeed;
        }
      }
    }
  }

  // Animation loop
  function animate() {
    updateBoxPositions();
    checkCollisions();
    requestAnimationFrame(animate);
  }

  animate(); // Start the animation loop
}
