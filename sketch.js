var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survialTime;

function preload() {
//loading all the needed animations and images
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}
function setup() {
//creating the canvas
  createCanvas(600, 350);
//creating the monket sprite
  monkey = createSprite(80, 285, 20, 20);
//addition of the animation to the monkey sprite
  monkey.addAnimation("monkey", monkey_running);
//giving the size to the monkey
  monkey.scale = 0.1;

 //creating the ground sprite
  ground = createSprite(400, 340, 900, 10);
//giving velocity to the ground to make the game look like the monkey is moving
  ground.velocityX = -4;

//two needed groups for the program  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
//defining the value to the 'score' variable  
  score = 0;
//defining the value to the 'survial time'variable
  survialTime = 0;
}


function draw() {
//giving colour to the background 
  background("lightblue");

 //INTRODUCING THE "GAMESTATES"//
  //giving the 'if' condition for thee PLAY State of the game
  if (gameState === PLAY) {
  //calling the two made for the spawning of the "Bananas and Obstacles"
    Banana();
    obstacles();

    //giving the if condition for the ground
    if (frameCount % 30 === 0) {
      ground.x = ground.width / 2;
    }

    //condition for the 'space' key to make the monkey jump and catch the bananas
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -13;
    }

    //giving the gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;

    //making an invisible ground to make the monkey collide with
    invisibleGround = createSprite(200, 350, 800, 10);
    //giving the visibility as 'false'
    invisibleGround.visible = false;
    //making the collide with the invisible ground
    monkey.collide(invisibleGround);
    
    //condition to change the game state to END when the monkey is touching the obstacles
    if (obstacleGroup.isTouching(monkey)) 
    {
      gameState = END;
    }

      drawSprites();
    
    //increasing the survival time in accordance to the framecount
    if(frameCount % 10 === 0){
      survialTime = survialTime+1;
    }
    
    //printing the text on the output screen 
    textfill("balck")
    text("SURVIVAL TIME : "+ survialTime,230,20);
    text("SCORE : "+ score,250,40);
    
    //increasing score when the monkey is touching the bananas
    if(monkey.isTouching(bananaGroup)){
      score = score+1;
    }
    
    //giving the 'else' part for the END State of the game
  } else if (gameState === END) {
    ground.velocityX = 0;

    //setting the velocity of the objects to 0 
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
  
//displaying the game over text
    textSize(20)
    text("GAME OVER", 200, 160);
  }
}
//function for spawning the bananas
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

//function for spawning the obstacles
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
