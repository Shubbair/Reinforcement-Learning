const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let birdSrc;
let fr1,fr2,fr3;
let pipeTop,pipeBottom;
let bgImg;
let point_sound,wing_sound,hit_sound;

function keyPressed() {
  if (key === 'S') {
    let bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
  }
}

function preload(){
  fr1 = loadImage('images/yellowbird-midflap.png');
  fr2 = loadImage('images/yellowbird-downflap.png');
  fr3 = loadImage('images/yellowbird-upflap.png');
  pipeBottom = loadImage('images/pipe-green.png');
  pipeTop = loadImage('images/pipe-green-top.png');
  bgImg = loadImage('images/background-day.png');
}

function setup() {
  createCanvas(400, 600);
  createP('Speed');
  slider = createSlider(1, 10, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 65 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          //hit_sound.play();
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  // All the drawing stuff
  background(0);

  image(bgImg, 0, 0, width, height);


  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }
}
