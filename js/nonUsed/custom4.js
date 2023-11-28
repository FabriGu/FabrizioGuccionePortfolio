const container = document.getElementById("container");
const numElements = 4; // Number of elements (DVD logos)
// const elements = [];
const elements = document.querySelectorAll(".btn")

// function createRandomElement() {
//   const element = document.createElement("div");
//   element.className = "element";
//   container.appendChild(element);

//   const elementWidth = element.clientWidth;
//   const elementHeight = element.clientHeight;

//   return {
//     element,
//     x: Math.random() * (container.clientWidth - elementWidth),
//     y: Math.random() * (container.clientHeight - elementHeight),
//     xSpeed: (Math.random() - 0.5) * 2,
//     ySpeed: (Math.random() - 0.5) * 2,
//     width: elementWidth,
//     height: elementHeight,
//   };
// }

function checkCollisions() {
  for (let i = 0; i < numElements; i++) {
    for (let j = i + 1; j < numElements; j++) {
      const elem1 = elements[i];
      const elem2 = elements[j];

      if (
        elem1.x < elem2.x + elem2.width &&
        elem1.x + elem1.width > elem2.x &&
        elem1.y < elem2.y + elem2.height &&
        elem1.y + elem1.height > elem2.y
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
  elements.forEach((elem) => {
    elem.x += elem.xSpeed;
    elem.y += elem.ySpeed;

    if (elem.x < 0) {
      elem.x = 0;
      elem.xSpeed *= -1;
    } else if (elem.x + elem.width > container.clientWidth) {
      elem.x = container.clientWidth - elem.width;
      elem.xSpeed *= -1;
    }

    if (elem.y < 0) {
      elem.y = 0;
      elem.ySpeed *= -1;
    } else if (elem.y + elem.height > container.clientHeight) {
      elem.y = container.clientHeight - elem.height;
      elem.ySpeed *= -1;
    }

    elem.element.style.left = elem.x + "px";
    elem.element.style.top = elem.y + "px";
  });
}

function generateNonOverlappingPositions() {
  for (let i = 0; i < numElements; i++) {
    elements.push(createRandomElement());

    while (
      elements.slice(0, i).some(
        (other) =>
          elements[i].x < other.x + other.width &&
          elements[i].x + elements[i].width > other.x &&
          elements[i].y < other.y + other.height &&
          elements[i].y + elements[i].height > other.y
      )
    ) {
      // Regenerate positions to avoid overlapping
      elements[i] = createRandomElement();
    }
  }
}

generateNonOverlappingPositions();

function animate() {
  updateElementPositions();
  checkCollisions();

  requestAnimationFrame(animate);
}

animate();
