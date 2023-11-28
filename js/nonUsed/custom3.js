const container = document.getElementById("container");
const elements = document.querySelectorAll(".btn");

const elementProperties = [];

function checkCollisions() {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const elem1 = elementProperties[i];
      const elem2 = elementProperties[j];

      if (
        elem1.x < elem2.x + elem2.element.clientWidth &&
        elem1.x + elem1.element.clientWidth > elem2.x &&
        elem1.y < elem2.y + elem2.element.clientHeight &&
        elem1.y + elem1.element.clientHeight > elem2.y
      ) {
        elem1.xSpeed *= -1;
        elem1.ySpeed *= -1;
        elem2.xSpeed *= -1;
        elem2.ySpeed *= -1;
      }
    }
  }
}

function updateElementPositions() {
  elementProperties.forEach((props) => {
    props.x += props.xSpeed;
    props.y += props.ySpeed;

    if (props.x < 0 || props.x + props.element.clientWidth > container.clientWidth) {
      props.xSpeed *= -1;
    }
    if (props.y < 0 || props.y + props.element.clientHeight > container.clientHeight) {
      props.ySpeed *= -1;
    }

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
          props.x < other.x + props.element.clientWidth &&
          props.x + props.element.clientWidth > other.x &&
          props.y < other.y + props.element.clientHeight &&
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
