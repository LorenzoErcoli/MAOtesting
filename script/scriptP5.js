function setup() {
	w = window.innerWidth;
	h = window.innerHeight
  createCanvas(window.innerWidth, window.innerHeight);
  capture = createCapture(VIDEO);
  capture.size(320*4, 240*4);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, window.innerWidth, window.innerHeight);
  filter(INVERT);
}
