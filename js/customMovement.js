$( document ).ready(function() {

// Get references to the elements
const container = document.getElementById("container");
const elements = document.querySelectorAll(".buttons");


// ____________________________________________________________________
var initialPositionsX = []
var initialPositionsY = []

let c = 0;
if (!c > 0) {
  centerElements();
  c++;
}

function centerElements() {
  // const container = document.getElementById("container");
  // const buttons = document.querySelectorAll(".buttons");
  // console.log("hello")
  const containerWidth = container.clientWidth;
  const buttonWidth = elements[0].getBoundingClientRect().width + 20;
  localStorage.setItem("realBtnWidth", buttonWidth);
  const totalWidth = buttonWidth * elements.length;

  // Calculate the left offset to center the buttons
  const leftOffset = (containerWidth - totalWidth) / 2;

  elements.forEach((button, index) => {
    const leftPosition = leftOffset + index * buttonWidth;
    button.style.left = leftPosition + "px";
    initialPositionsX[index] = leftPosition;
    button.style.top = "70px";
    initialPositionsY[index] = 20;
  });
}

function reCenterElements() {
  // const container = document.getElementById("container");
  // const buttons = document.querySelectorAll(".buttons");
  console.log("hello")
  const containerWidth = container.clientWidth;
  const buttonWidth = elements[0].getBoundingClientRect().width + 20;
  const totalWidth = buttonWidth * elements.length;

  // Calculate the left offset to center the buttons
  const leftOffset = (containerWidth - totalWidth) / 2;

  elementProperties.forEach((element, index) => {
    const leftPosition = leftOffset + index * buttonWidth;
    elementProperties[index].x = leftPosition;
  });
}

window.addEventListener("resize", () => {
   // const container = document.getElementById("container");
  // const buttons = document.querySelectorAll(".buttons");
  console.log("hello")
  const containerWidth = container.clientWidth;
  const buttonWidth = elements[0].getBoundingClientRect().width + 20;
  const totalWidth = buttonWidth * elements.length;

  // Calculate the left offset to center the buttons
  const leftOffset = (containerWidth - totalWidth) / 2;

  elementProperties.forEach((element, index) => {
    const leftPosition = leftOffset + index * buttonWidth;
    elementProperties[index].x = parseInt(leftPosition);
    elementProperties[index].y = 20;
  });
});

// // Call the centerElements function initially and on window resize
// window.addEventListener("load", centerElements);
// window.addEventListener("resize", centerElements);
// window.onresize = centerElements;

// ____________________________________________________________________

// Define variables for element properties
const elementProperties = [];
const elementColors = ['#6B74DB', '#7F09DB', '#2C73DB', '#C832DB', '#6540DC', '#3745d5', '#a84fec', '#639ef6', '#ec71fc', '#8e6ff4'];
var colorCounter = 0;
elements.forEach((element, index) => {
  elementProperties[index] = {
    element,
    x: parseInt(element.getBoundingClientRect().left),
    y: parseInt(element.getBoundingClientRect().top),
    xSpeed: (Math.random() - 0.5) * 10, // Random horizontal speed
    ySpeed: (Math.random() - 0.5) * 10, // Random vertical speed
    width: element.style.width,
    height: parseInt(element.style.height),
    all: element.getBoundingClientRect(),
    isHovered: false,
    colorIndex: colorCounter,
  };
  colorCounter++;
});

function updateElementColors(props) {
  // update element colors
  props.colorIndex = (props.colorIndex + 1) % elementColors.length;
  props.element.style.backgroundColor = elementColors[props.colorIndex];
}

// Function to update element positions
function updateElementPositions() {
    elementProperties.forEach((props) => {
      
      // console.log(props.x);
      // console.log(props.element.style.backgroundColor);
      // console.log(props.element.className == 'enlarged');

      if (!props.isHovered && props.element.className != 'enlarged') {
        props.x += props.xSpeed;
        props.y += props.ySpeed;
        
        // Check for collisions with container boundaries
        if (props.x <= 0 || (props.x + props.all.width) >= container.clientWidth) {
          props.xSpeed *= -1; // Reverse horizontal direction
          updateElementColors(props);
          
        }
        if (props.y <= 0 || (props.y + props.all.height) >= container.clientHeight) {
          props.ySpeed *= -1; // Reverse vertical direction
          updateElementColors(props);
        }
        // Update element positions
        props.element.style.left = props.x + "px";
        props.element.style.top = props.y + "px";
        
      }
    });
}


// Function to check for collisions between elements
function checkCollisions() {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const elem1 = elementProperties[i];
      const elem2 = elementProperties[j];

      if (elem1.element.className == 'enlarged') {
        const elem1 = elementProperties[++i];
      } else if (elem2.element.className == 'enlarged') {
        const elem2 = elementProperties[++j];
      }
      
      // Check for collision using bounding boxes
      if (
        elem1.x < elem2.x + elem2.all.width && // plus
        elem1.x + elem1.all.width > elem2.x && // minus
        elem1.y < elem2.y + elem2.all.height && // plus
        elem1.y + elem1.all.height > elem2.y // minus
      ) {
        // update both elements color on collision
        // elem1.colorIndex++;
        // elem2.colorIndex++;
        // elem1.element.style.backgroundColor = elementColors[elem1.colorIndex];
        // elem2.element.style.backgroundColor = elementColors[elem2.colorIndex];
        updateElementColors(elem1);
        updateElementColors(elem2);

        // Calculate the overlap in the x and y directions
        const overlapX = Math.min(elem1.x + elem1.all.width, elem2.x + elem2.all.width) - Math.max(elem1.x, elem2.x);
        const overlapY = Math.min(elem1.y + elem1.all.height, elem2.y + elem2.all.height) - Math.max(elem1.y, elem2.y);
        
        if (elem1.isHovered) {
          if (overlapX < overlapY) {
              // Reverse xSpeed of elem2 for vertical collisions
              elem2.xSpeed *= -1;
          } else if (overlapY < overlapX) {
              // Reverse ySpeed of elem2 for horizontal collisions 
              elem2.ySpeed *= -1;
          }
        } else if (elem2.isHovered) {
            if (overlapX < overlapY) {
              // Reverse xSpeed of elem1 for vertical collisions
              elem1.xSpeed *= -1;
            } else if (overlapY < overlapX) {
              // Reverse ySpeed of elem1 for horizontal collisions from the top
              elem1.ySpeed *= -1;
            }
        } else {
          // Handle realistic collision using vectors
          const dx = elem1.xSpeed - elem2.xSpeed;
          const dy = elem1.ySpeed - elem2.ySpeed;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / distance;
          const ny = dy / distance;

          const dotProduct = (elem1.xSpeed - elem2.xSpeed) * nx + (elem1.ySpeed - elem2.ySpeed) * ny;
          const impulse = (2 * dotProduct) / (1 + 1);
          elem1.xSpeed -= impulse * nx;
          elem1.ySpeed -= impulse * ny;
          elem2.xSpeed += impulse * nx;
          elem2.ySpeed += impulse * ny;
        }
      }
    }
  }
}  

function hoverChecker() {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementProp = elementProperties[i];
    if (element.matches(":hover")) {
      elementProp.isHovered = true;
      //   console.log("hello");
    } else {
      elementProp.isHovered = false;
    }
  }
}


// setTimeout(function() {r
  
  // Function to start the animation loop
  function animate() {
      hoverChecker();
      updateElementPositions();
      checkCollisions();

      requestAnimationFrame(animate);
  }

  // Start the animation loop
  animate();
// }, 1000);

  // $(document).on("click", "a", function (e) {// Listen for all link click events on the page (assuming other scripts don’t stop them from bubbling all the way up)
  //   // Stop the link from being followed.
  //   e.preventDefault();

  //   // Grab the link element that was clicked
  //   var linkClicked = e.target;
  //   for (let i = 0; i< elementProperties.length ; i++) {
  //     elements[i].className = "buttons returnToOriginalPos"
  //   }
  //   elementProperties.forEach((element, index) => {
  //     elementProperties[index].x = initialPositionsX[index];
  //     elementProperties[index].y = initialPositionsY[index];
  //   });
  //   console.log("hello");

  //   // I'm using setTimeout to just delay things here, but you would do your animation and then call a function like this when it’s done
  //   window.setTimeout(function () {

  //       // Simulate navigation
  //       window.location = linkClicked.href;
  //   }, 1000);

  //   return false;
  // });


});