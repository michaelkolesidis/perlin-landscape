/*
 * Copyright (c) 2023 Michael Kolesidis
 * GNU Affero General Public License v3.0
 * https://www.gnu.org/licenses/gpl-3.0.html
 *
 */

// Size
let rows = 90;
let columns = 180;

// Morphology
let noiseScale = 0.06;
let maxNoise = 200;
let heights = [];

// View
let viewScale = 20;

// Setup
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(24);
}

// Draw
function draw() {
  let yOffset = -frameCount / 10;
  for (var y = 0; y < rows; y++) {
    heights[y] = [];
    for (var x = 0; x < columns; x++) {
      heights[y][x] = map(
        noise(x * noiseScale, yOffset),
        0,
        1,
        -maxNoise,
        maxNoise
      );
    }
    yOffset += noiseScale;
  }

  smooth();
  rotateX(PI / 2.5); // angle
  translate((-3 * width) / 4, -height / 2); // position

  background(20);
  strokeWeight(2.0);
  stroke(199, 154, 115);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(QUADS);
    for (var x = 0; x < columns; x++) {
      vertex(x * viewScale, y * viewScale, heights[y][x]);
      vertex(x * viewScale, (y + 1) * viewScale, heights[y + 1][x]);
    }
    endShape();
  }
}

// Resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Fullscreen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
