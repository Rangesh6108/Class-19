var space,alien,star,rocket,gameOver,play,reset;

var spaceImg,alien1Img,star1Img,star2Img,rocketImg,gameOverImg,playImg,resetImg;

var alienG,starG;

var rocketS,touchingS,checkpointS,gameOverS;

var PLAY = 1;
var END = 2;
var gameState = PLAY;

var score=0;

function preload(){
  
  spaceImg=loadImage("Images/Space.png");
  alien1Img=loadImage("Images/Alien_1.png");
  alien2Img=loadImage("Images/Alien_2.png");
  rocketImg=loadImage("Images/Rocket.png");
  star1Img=loadImage("Images/Star_1.PNG");
  star2Img=loadImage("Images/Star_2.PNG")
  gameOverImg=loadImage("Images/GameOver.png");
  resetImg=loadImage("Images/Reset.PNG");
  playImg=loadImage("Images/Play.PNG");
  
  rocketS=loadSound("Sounds/Rocket effect.mp3");
  gameOverS=loadSound("Sounds/GameOver.mp3");
  checkpointS=loadSound("Sounds/Score increasing.mp3");
  touchingS=loadSound("Sounds/Touching star sound.mp3");

}

function setup() {
  
//Creating canvas
  createCanvas(600,600);
  
// Creating background
  space=createSprite(200,200,10,10);
  space.addImage(spaceImg);
  space.velocityY=10;
  
// Creating rocket
  rocket=createSprite(300,300,10,10);
  rocket.addImage(rocketImg);
  rocket.scale=0.2;
  rocket.debug=false;
  
// Creating gameover image
  gameOver=createSprite(300,300,10,10);
  gameOver.addImage(gameOverImg);
 
// Creating reset botton
  reset=createSprite(300,400,10,10);
  reset.addImage(resetImg);
  reset.scale=0.5;
  
// Creating groups  
  starG = new Group();
  alienG= new Group();
  
}

function draw() {
  
  if(mousePressedOver(reset)){
    
    resetGame();
  }
  
 if(gameState===PLAY){
   
  gameOver.visible=false;
  reset.visible=false;
   
   
   if(space.y>400){
    space.y=300;
    
    if(World.frameCount % 5 == 0){
      createAliens();
      
    }
    
    if(World.frameCount % 1 == 0){
      createStars();
    }
    
    if(starG.isTouching(rocket)){
      starG.destroyEach();
      score=score+1;
      touchingS.play();
    }
    
    if(alienG.isTouching(rocket)){
      alienG.destroyEach();
      gameState=END;
      rocket.x=300;
      starG.destroyEach();
      gameOverS.play();
    
  }
  }
   space.velocityY=10;
   rocket.x=mouseX;
 }  
  
  if(gameState===END){
    
    space.velocityY=0;
    
    gameOver.visible=true;
    rocket.visible=false;
    
    reset.visible=true;
    
  }
   
  
  drawSprites();
  
  fill("lime");
  textSize(20);
  text("score: " + score,290,100);
}

function createAliens(){
  
  var r=Math.round(random(1,2));
  
  alien=createSprite(100,0,10,10);
  
  alien.x=Math.round(random(50,550));
  
  if(r == 1){
    alien.addImage(alien1Img);
  }
  
  if(r ==  2){
    alien.addImage(alien2Img);
  }
  
  alien.debug=false;
  alien.scale=0.1;
  alien.velocityY=10;
  alien.lifetime=200;
  alienG.add(alien);
    
}

function createStars(){
  
  var r=Math.round(random(1,2));
    
  star=createSprite(100,0,10,10);
  
  star.x=Math.round(random(50,550));
  
  if(r == 1){
    star.addImage(star1Img);
    star.scale=0.02;
  }
  
  if(r == 2){
    star.addImage(star2Img);
    star.scale=0.1;
  }
  
  star.debug=false;
  star.scale=0.1;
  star.velocityY= 10;
  star.lifetime=200;
  starG.add(star);
  
}

function resetGame(){
  gameState=PLAY;
    
  rocket.visible=true;
  score=0;
}