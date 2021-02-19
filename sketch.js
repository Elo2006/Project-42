var monkey,monkeyImage,jungle,jungleImage;
var banana,bananaImage,foodGroup;
var stone,stoneImage,obstacleGroup;
var PLAY;
var gameState = PLAY
var ground



var score = 0;


function preload(){
  
  monkeyImage =   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  jungleImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");
 
 
}



function setup() {
  createCanvas(500,450);
  
  jungle = createSprite(300,150,500,450);
  jungle.addImage(jungleImage);
  jungle.velocityX = -5; 

  
  monkey = createSprite(80,390,20,20);
  monkey.addAnimation("mImage",monkeyImage);
  monkey.scale = 0.115;
  
  ground = createSprite(250,465,500,35);
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw(){
  background("white")
  
  
  
  monkey.collide(ground)
  
  
  if(gameState === PLAY){
    
    if(jungle.x < 0){
      jungle.x = jungle.width/2
    }
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 2
       
     if(monkey.isTouching(foodGroup)){
      var size = Math.round(random(10,40))
  switch(size){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
  }
     }      
    }
    
    if(keyDown("space") && monkey.y >= 310){
      monkey.velocityY = -15;
    }
    
    monkey.velocityY = monkey.velocityY + 0.4;
    
    jungle.velocityX = -5;
    
    
    if(obstacleGroup.isTouching(monkey)){
      jungle.velocityX = 0;
      monkey.velocityX = 0;
      foodGroup.velocity = 0
      obstacleGroup = 0
    
    }
    
    
  spawnObstacle();
  spawnFood();
  
    
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,400,50);
  
  
  }
  
  
  
}

function spawnObstacle(){
  if(frameCount%300 === 0){
    stone = createSprite(690,410,10,10);
    stone.velocityX = 2
    stone.addImage(stoneImage);
    stone.scale = 0.15 ;
    
    obstacleGroup.add(stone);
  }
}

function spawnFood(){
  if(frameCount%80 === 0){
    banana = createSprite(630,160,35,10);
    banana.velocityX = -6;
    banana.y = random(100,150);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
  
    
    foodGroup.add(banana);
  }
}


