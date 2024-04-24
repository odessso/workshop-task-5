let eye;
let screentimeData;
let currentWeek = 0;
let currentDay = 0;
let currentMinute = 0;
let lastSpawnTime = 0;
let spawnInterval = 100; 
let eyes = []; 

function preload() {
  eye = loadImage('eye.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  screentimeData = [
    [383, 361, 289, 257, 306, 186, 358],
    [254, 220, 185, 318, 200, 179, 253],
    [319, 258, 435, 215, 204, 133, 157]
  ];
}

function draw() {
  background(255);
  
  if (currentWeek >= screentimeData.length) {
    clear();
    currentWeek = 0;
    currentDay = 0;
    currentMinute = 0;
    lastSpawnTime = 0;
    eyes = [];
    return;
  }

  let currentTime = millis();

  if (currentTime - lastSpawnTime > spawnInterval) {
    let totalEyes = screentimeData[currentWeek][currentDay];
    for (let i = 0; i < totalEyes; i++) {
      let x = random(width);
      let y = random(height);
      while (dist(x, y, width / 2, height / 2) < 100) {
        x = random(width);
        y = random(height);
      }
      eyes.push(createVector(x, y));
    }
    currentMinute = screentimeData[currentWeek][currentDay];
    lastSpawnTime = currentTime;
  }
  
  for (let i = 0; i < eyes.length; i++) {
    image(eye, eyes[i].x, eyes[i].y, 20, 20); 
  }
  
  let totalMinutes = 0;
  for (let week = 0; week <= currentWeek; week++) {
    for (let day = 0; day < screentimeData[week].length; day++) {
      if (week < currentWeek || (week === currentWeek && day <= currentDay)) {
        totalMinutes += screentimeData[week][day];
      }
    }
  }
  
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("5470 minutes", width / 2, height / 2);
}
