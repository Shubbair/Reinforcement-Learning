let pipes = [];
let slider;
let bird;
let counter = 0;
let brainJSON;
let point_sound,wing_sound,hit_sound;
let score = 0,maxScore = 0;

function preload() {
  brainJSON = loadJSON("bird.json");
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
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}

function draw() {

  for (let n = 0; n < slider.value(); n++) {
    if (counter % 65 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        gameover();
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    if (bird.offScreen()) {
      console.log("bottom");
    }


    bird.think(pipes);
    bird.update();


    // All the drawing stuff
    background(0);

    image(bgImg, 0, 0, width, height);

    bird.show();

    for (let pipe of pipes) {
      pipe.show();
    }
  }
}

function gameover() {
  stroke(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  noLoop();
}

function keyPressed(){
  if(key == ' '){
    loop();
  }
}
