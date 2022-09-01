function setup() {
	w = window.innerWidth;
	h = window.innerHeight
  createCanvas(displayWidth, displayHeight);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }    
    //video: {
      //facingMode: "user"
    //} 
  };
  capture = createCapture(constraints);
  
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0);
  filter(INVERT);
}
