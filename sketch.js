var Play = 1;
var End = 0;
var gameState = Play;
var bg, bgImg;
var mario,marioImg,mario_collidedImg;
var ground, groundImg;
var obstacle,obstacleImg,obstacleGroup;
var brick,brickImg,brickGroup;
var score;
var restart,restartImg,gameover,gameoverImg;
var jumpsound, diesound, checkpointsound;

function preload(){
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3"); 
  checkpointsound = loadSound("checkPoint.mp3");
  marioImg = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  mario_collide = loadAnimation("collided.png");
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
  bgImg = loadImage("bg.png");
  
  mario_collidedImg = loadImage("collided.png");
  
  groundImg = loadImage("ground2.png");
  
  brickImg = loadImage("brick.png");
  
gameoverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png")
   
}
function setup(){
  createCanvas(700,500);
  
  bg = createSprite(200,380,30,20);
  bg.addImage(bgImg);
  bg.scale = 2;
  
  gameover = createSprite(350,220);
  restart = createSprite(350,250);
  gameover.scale = 0.5;
  restart.scale =0.5;
  
  mario = createSprite(50,400,40,40);
  mario.addAnimation("running",marioImg);
  mario.scale = 1.9;
  mario.addAnimation("collided",mario_collidedImg);
  
  
  ground  = createSprite(200,480,700,20);
  ground.addImage(groundImg);
  ground.scale = 1;
  
  ground.x = ground.width/2;
  
  brickGroup = new Group();
  obstacleGroup = new Group();
  
  gameover.addImage(gameoverImg);
    restart.addImage(restartImg)
  
  score = 0;
   
}
function draw(){
  
  if(gameState === Play){ 
    
   ground.velocityX = -(4 + 3*score/100);
    
    mario.changeAnimation("running",marioImg)
    console.log(width)
    
  if(keyDown("space") && mario.y>400){
    mario.velocityY = -12;
    jumpsound.play();
  }
    
  mario.velocityY = mario.velocityY + 0.5;
  
  spawnobstacles(); 
  spawnbrick();
    
  if(obstacleGroup.isTouching(mario)){
      gameState = End;
    diesound.play();
    }
    gameover.visible =false;
    restart.visible = false;
    
     
    if(score>0 && score %100 === 0){
       checkPointSound.play() 
    }
    
    
  }
 else if(gameState === End){
  score = 0;
  gameover.visible = true;
  restart.visible = true;
  brickGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  brickGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  ground.velocityX = 0; 
  mario.velocityY = 0;
   if(mousePressedOver(restart)){
  restart1();
}
   mario.changeAnimation("collided",mario_collide);
    
  }
  if(ground.x<0){
    ground.x = ground.width/2;
   }
  mario.collide(ground); 
  
  
  
  
  drawSprites();
  
  textSize(20)
  text(" SCORE: "+ score,450,50);
  
  if(brickGroup.isTouching(mario)){
  score = score + 1;
  brickGroup[0].destroy();
  }
  
}
function restart1(){
  gameState = Play;
  obstacleGroup.destroyEach();
  brickGroup.destroyEach();
  mario.changeAnimation("running", marioImg);
}
function spawnbrick(){
 if(frameCount % 60 === 0){
      brick = createSprite(500,260,10,10);
   brick.y = Math.round(random(260,300))
   brick.addImage(brickImg);
      brick.velocityX = -4;
      brick.lifetime = 130;
      brickGroup.add(brick); 
}
} 
function spawnobstacles(){
    if(frameCount % 50 === 0){
      obstacle = createSprite(400,420,10,10);
      obstacle.addAnimation("obstacle",obstacleImg);
      obstacle.velocityX = -(4+score/100);
      obstacle.lifetime = 170;
      obstacleGroup.add(obstacle);
     
    }
  }