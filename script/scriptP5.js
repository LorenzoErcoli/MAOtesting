function setup() {
	w = window.innerWidth;
	h = window.innerHeight
  createCanvas(window.innerWidth, window.innerHeight);
  capture = createCapture(VIDEO);

  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, w, h);
  filter(INVERT);
}
