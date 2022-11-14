var trex ,trex_running,groundImage,cloudImage,trex_collided;
var gameOverImage,gameOver,restartImage,restart;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png")
  trex_collided=loadAnimation("trex_collided.png")
 
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png") 
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  //-------------------------------------------------------------- PRIMERO CARGAR SONIDOS
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkpoint.mp3")
}

function setup(){
createCanvas(600,200)
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);  
//edges=createEdgeSprites();
trex.scale=0.5;
trex.x=50;
ground=createSprite(200,180,400,20);
ground.addImage("ground", groundImage);
ground.x=ground.width/2;

invisibleGround=createSprite(200,190,400,10);
invisibleGround.visible=false;
var rand=Math.round(random(10,60))
obstaclesGroup=new Group();
cloudsGroup=new Group();
console.log(rand)
score=0;
//-----------------------------------------------------SEPTIMO INTELIGENCIA ARTIFICIAL
//trex.setCollider("circle",0,0,40)
trex.setCollider("rectangle",0,0,400,trex.height)
trex.debug=true;
trex.addAnimation("collided",trex_collided)
gameOver=createSprite(300,100)
gameOver.addImage(gameOverImage)
gameOver.scale=0.5;
gameOver.visible=false;
restart=createSprite(300,140)
restart.addImage(restartImage)
restart.scale=0.5
restart.visible=false;
 
}

  function draw(){
  background("white")
  text("Puntuación:"+score,500,50);
  console.log("Esto es ", gameState)
  if(gameState === PLAY){
    //---------------------------------------------------------SEXTO AUMENTAR LA VELOCIDAD DEL PISO
    ground.velocityX=-(4+3* score/100);
    score=score+Math.round(frameCount/60)
    // CUARTO CREAR ITO DE PUNTAJE
    if(score>0 && score%100 ===0){
      checkpoint.play()
    }
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }  
  if(keyDown("space")&& trex.y>=100){
    
    trex.velocityY=-10;
    //-----------------------------------------------------------------SEGUNDO LLAMAR SONIDO DE SALTO
    jump.play()
  }
  trex.velocityY=trex.velocityY+0.8;
  spawnObstacles();
  spawnClouds();
  
  if(obstaclesGroup.isTouching(trex)){
   // -------------------------------------------------------------------INTELIGENCIA ARTIFICIAL
    trex.velocityY=-12
   jump.play()
    // gameState = END;
    // -----------------------------------------------------TERCERO LLAMAR SONIDO DE FIN DE JUEGO
    //die.play()
  }
  }
  else if(gameState === END){
  ground.velocityX=0;
  trex.velocityY=0;
  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
// QUÍ QUEDAMOS
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0);
  restart.visible=true;
  gameOver.visible=true;
  }
  
    
    
    
    
    trex.collide(invisibleGround);
   
    drawSprites();
    
    

  }
  
function spawnClouds(){
  
  if(frameCount%60===0){
 cloud=createSprite(600,100,40,10)
 cloud.addImage(cloudImage)
 cloud.y=Math.round(random(10,60))
 cloud.scale=0.4
 cloud.velocityX=-3
 cloud.lifetime=200;
 cloud.depth=trex.depth
 trex.depth=trex.depth+1
 console.log(trex.depth)
 console.log(cloud.depth)
 cloudsGroup.add(cloud);
 

  }
 
}

function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,165,10,40)
    //------------------------------------------------------QUINTO AUMENTAR VELOCIDAD DE LOS OBTACULOS
    obstacle.velocityX=-(6+score/100)

    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break; 
      case 5: obstacle.addImage(obstacle5);
              break;  
      case 6: obstacle.addImage(obstacle6);
              break;  
      default:break;   
    }

obstacle.scale=0.5;
obstacle.lifetime=300;
obstaclesGroup.add(obstacle);
  }
}
