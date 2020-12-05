var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survialTime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 350);

  monkey = createSprite(80, 285, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 340, 900, 10);
  ground.velocityX = -4;

  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  survialTime = 0;
}


function draw() {

  background("lightblue");

  if (gameState === PLAY) {
    Banana();
    obstacles();

    if (frameCount % 30 === 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -13;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    invisibleGround = createSprite(200, 350, 800, 10);
    invisibleGround.visible = false;
    monkey.collide(invisibleGround);
    
    if (obstacleGroup.isTouching(monkey)) 
    {
      gameState = END;
    }

      drawSprites();
    
    if(frameCount % 10 === 0){
      survialTime = survialTime+1;
    }

    text("SURVIVAL TIME : "+ survialTime,230,20);
    text("SCORE : "+ score,250,40);
    
    if(monkey.isTouching(bananaGroup)){
      score = score+1;
    }
    
  } else if (gameState === END) {
    ground.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
  

    text("GAME OVER", 250, 160);
  }
}

function Banana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(300, 350);
    banana.addImage("banana", bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;

    banana.velocityX = -3;
    banana.lifetime = 200;

    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 316);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}