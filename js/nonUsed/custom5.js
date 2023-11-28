const container = document.getElementById("container");
const elements = document.querySelectorAll(".btn");
const numElements = elements.length;

const elementProperties = [];

function getInitialElementProperties() {
  return {
    x: Math.random() * (container.clientWidth - elements[0].clientWidth),
    y: Math.random() * (container.clientHeight - elements[0].clientHeight),
    xSpeed: (Math.random() - 0.5) * 2,
    ySpeed: (Math.random() - 0.5) * 2,
    width: elements[0].clientWidth,
    height: elements[0].clientHeight,
  };
}

for (let i = 0; i < numElements; i++) {
  elementProperties.push(getInitialElementProperties());
  elements[i].style.left = elementProperties[i].x + "px";
  elements[i].style.top = elementProperties[i].y + "px";
}

function checkCollisions() {
  for (let i = 0; i < numElements; i++) {
    for (let j = i + 1; j < numElements; j++) {
      const elem1 = elementProperties[i];
      const elem2 = elementProperties[j];

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
  for (let i = 0; i < numElements; i++) {
    elementProperties[i].x += elementProperties[i].xSpeed;
    elementProperties[i].y += elementProperties[i].ySpeed;

    if (elementProperties[i].x < 0) {
      elementProperties[i].x = 0;
      elementProperties[i].xSpeed *= -1;
    } else if (elementProperties[i].x + elementProperties[i].width > container.clientWidth) {
      elementProperties[i].x = container.clientWidth - elementProperties[i].width;
      elementProperties[i].xSpeed *= -1;
    }

    if (elementProperties[i].y < 0) {
      elementProperties[i].y = 0;
      elementProperties[i].ySpeed *= -1;
    } else if (elementProperties[i].y + elementProperties[i].height > container.clientHeight) {
      elementProperties[i].y = container.clientHeight - elementProperties[i].height;
      elementProperties[i].ySpeed *= -1;
    }

    elements[i].style.left = elementProperties[i].x + "px";
    elements[i].style.top = elementProperties[i].y + "px";
  }
}

function animate() {
  updateElementPositions();
  checkCollisions();

  requestAnimationFrame(animate);
}

animate();
