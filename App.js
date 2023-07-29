const IMAGE_W = 150;
const IMAGE_H = 150;
let IMAGE = null;
let Z_INDEX = 1;


// get the animation window
const animationWindow = document.getElementById("animation-window");


//A function that will go through all the marked images and display them on the animation window
function handleImageUpload(event) {
  const files = event.target.files;

  for (const file of files) {

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);


    //place an image in a random position on an animation window
    img.style.width = `${IMAGE_W}px`;
    img.style.height = `${IMAGE_H}px`;

    img.style.position = "absolute";
    img.style.left = `${getRandomNumber(0, animationWindow.clientWidth - IMAGE_W)}px`;
    img.style.top = `${getRandomNumber(0, animationWindow.clientHeight - IMAGE_H)}px`;

    img.style.zIndex = Z_INDEX; 
    Z_INDEX++; 
    
    IMAGE = img;
    img.addEventListener("click", handleImageClick);

    // append the image to the animation window
    animationWindow.appendChild(img);
  }
}

//A function that moves the image according to the arrows
function handleKeyPress(event) {
  
    if (!IMAGE || !isImageElement(IMAGE)) {
      return;
    }
  
    const stepSize = 10; 
  
    // get the current position of the image
    const currentPosition = {
      left: parseInt(IMAGE.style.left) || 0,
      top: parseInt(IMAGE.style.top) || 0,
    };
  
    // move the image based on the arrow key pressed 
    switch (event.key) {
      case "ArrowUp":
        currentPosition.top = Math.max(0, currentPosition.top - stepSize); 
        break;
      case "ArrowDown":
        currentPosition.top = Math.min(
          animationWindow.clientHeight - IMAGE.clientHeight, 
          currentPosition.top + stepSize
        );
        break;
      case "ArrowLeft":
        currentPosition.left = Math.max(0, currentPosition.left - stepSize);
        break;
      case "ArrowRight":
        currentPosition.left = Math.min(
          animationWindow.clientWidth - IMAGE.clientWidth,
          currentPosition.left + stepSize
        );
        break;
      default:
        return; 
    }
  
    // update the image position
    IMAGE.style.left = currentPosition.left + "px";
    IMAGE.style.top = currentPosition.top + "px";
  }
  
  // helper function to check if an element is an image element
  function isImageElement(element) {
    return element.tagName.toLowerCase() === "img";
  }
  

// helper function to get a random number within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

  
  // function to handle click event on the image
function handleImageClick(event) {
    IMAGE = event.target;
    IMAGE.style.zIndex = Z_INDEX;
    Z_INDEX++;
}


const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", handleImageUpload);
document.addEventListener("keydown", handleKeyPress);


