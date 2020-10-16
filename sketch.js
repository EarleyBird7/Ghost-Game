var climber, climberI
var door, doorI
var ghost, ghostI, ghostJumping
var tower, towerI
var climberGroup, doorGroup
var invisibleBlock, invisibleBlockGroup
var gameState="Play"
var sound

function preload() {
  climberI=loadImage("climber.png");
  doorI=loadImage("door.png");
  ghostI=loadImage("ghost-standing.png");
  towerI=loadImage("tower.png");
  sound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,600,600);
  tower.addImage(towerI);
  tower.velocityY=1
  
  ghost=createSprite(200,200,10,10);
  ghost.addImage(ghostI);
  ghost.scale=0.3
  
  climberGroup=new Group();
  doorGroup=new Group();
  invisibleBlockGroup=new Group();
  
}

function draw(){
  background("black");
  
  if(gameState=="Play"){
  if(tower.y>600){
    tower.y=tower.width/2
  }  
  
if(keyDown("space")){
  ghost.velocityY=-2;
  ghost.changeImage(ghostJumping);
}
  
  ghost.velocityY=ghost.velocityY+0.1
  
  if(keyDown("left")){
    ghost.x=ghost.x-2
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+2
  }
          
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }

  if (ghost.isTouching(invisibleBlockGroup)|| ghost.y>600){
    gameState="End";
    ghost.destroy(); 
  }  
  
    
spawnDoors();  
  drawSprites();
  
}

 if(gameState=="End"){
   textSize(30);
   fill("yellow");
   text("Game Over",200,300)
 } 
}


function spawnDoors(){
  if(frameCount%275==0){
    door=createSprite(200,100,10,10);
    door.addImage(doorI)
    door.velocityY=1
    door.lifetime=600;
    door.x=Math.round(random(100,500));
    doorGroup.add(door);
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    
    climber=createSprite(200,150,10,10);
    climber.addImage(climberI);
    climber.velocityY=1;
    climber.lifetime=600;
    climber.x=door.x;
    climberGroup.add(climber);
    
    invisibleBlock=createSprite(200,150,10,10);
    invisibleBlock.width=climber.width;
    invisibleBlock.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.lifetime=600;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible=false;
    
  }
}