const container = document.getElementById("container");
const elements = document.querySelectorAll(".btn");

const elementProperties = [];

// Function to check for collisions between elements
function checkCollisions() {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const elem1 = elementProperties[i];
      const elem2 = elementProperties[j];

      // Check for collision using bounding boxes
      if (
        elem1.x < elem2.x + elem2.element.clientWidth &&
        elem1.x + elem1.element.clientWidth > elem2.x &&
        elem1.y < elem2.y + elem2.element.clientHeight &&
        elem1.y + elem1.element.clientHeight > elem2.y
      ) {
        // Calculate relative speeds
        const relSpeedX = elem1.xSpeed - elem2.xSpeed;
        const relSpeedY = elem1.ySpeed - elem2.ySpeed;

        // Only change direction if elements are moving toward each other
        if (relSpeedX * (elem2.x - elem1.x) + relSpeedY * (elem2.y - elem1.y) < 0) {
          const tempXSpeed = elem1.xSpeed;
          const tempYSpeed = elem1.ySpeed;

          elem1.xSpeed = elem2.xSpeed;
          elem1.ySpeed = elem2.ySpeed;
          elem2.xSpeed = tempXSpeed;
          elem2.ySpeed = tempYSpeed;
        }
      }
    }
  }
}

function updateElementPositions() {
  elementProperties.forEach((props, index) => {
    props.x += props.xSpeed;
    props.y += props.ySpeed;

    // Check for collisions with container boundaries and reverse direction
    if (props.x < 0 || props.x + props.element.clientWidth > container.clientWidth) {
      props.xSpeed *= -1;
    }
    if (props.y < 0 || props.y + props.element.clientHeight > container.clientHeight) {
      props.ySpeed *= -1;
    }

    // Update element positions
    props.element.style.left = props.x + "px";
    props.element.style.top = props.y + "px";
  });
}

// Function to ensure elements don't spawn overlapping
function generateNonOverlappingPositions() {
  elementProperties.forEach((props) => {
    do {
      props.x = Math.random() * (container.clientWidth - props.element.clientWidth);
      props.y = Math.random() * (container.clientHeight - props.element.clientHeight);
    } while (
      elementProperties.some(
        (other) =>
          other !== props &&
          props.x < other.x + other.element.clientWidth &&
          props.x + props.element.clientWidth > other.x &&
          props.y < other.y + other.element.clientHeight &&
          props.y + props.element.clientHeight > other.y
      )
    );
  });
}

elements.forEach((element, index) => {
  elementProperties[index] = {
    element,
    x: 0,
    y: 0,
    xSpeed: (Math.random() - 0.5) * 2,
    ySpeed: (Math.random() - 0.5) * 2,
  };
});

generateNonOverlappingPositions();

function animate() {
  updateElementPositions();
  checkCollisions();

  requestAnimationFrame(animate);
}

animate();
