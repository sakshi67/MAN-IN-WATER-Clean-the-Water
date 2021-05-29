var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background , backgroundImg;
var diver , diverImg;
var invisibleGround1, invisibleGround2;
var cloneFishG , blueFishG, blackgreenfishG , blackorangefishG  , darkBlueFishG ,  rainbowfishG , yellowFishG;
var plasticBagG , plasticBoxG , plasticCanG , plasticHangerG , plasticMugG , plasticSpoonG ;
var gameOver , restart ;
var collectSound , gameOverSound , loseSound;
var virusG;
var score = 0;

function preload(){
 backgroundImg = loadImage("images/background.jpg");
 diverImg = loadAnimation("images/diver1.png","images/diver2.png","images/diver3.png");
 virusImg = loadImage("images/virus.png");

 cloneFishImg = loadImage("images/cloneFish.png");
 blueFishImg = loadImage("images/blueFish.png");  
 blackgreenfishImg = loadImage("images/blackgreenfish.png");
 blackorangefishImg = loadImage("images/blackorangefish.png");  
 darkBlueFishImg = loadImage("images/darkBlueFish.png");
 rainbowfishImg = loadImage("images/rainbowfish.png");

 plasticBagImg = loadImage("images/plasticBag.png"); 
 plasticBoxImg =loadImage ("images/plasticBox.png");
 plasticCanImg = loadImage("images/plasticCan.png");
 plasticHangerImg =loadImage ("images/plasticHanger.png");
 plasticMugImg = loadImage("images/plasticMug.png");
 plasticSpoonImg =loadImage("images/plasticSpoon.png");

 gameOverImg = loadImage("images/gameOver.png");
 restartImg = loadImage("images/restartButton.png");
 
 
 collectSound = loadSound("sound/collect.mp3");
 gameOverSound = loadSound("sound/gameOver.mp3");
 loseSound = loadSound("sound/lose.mp3");

}
function setup() {
  createCanvas(displayWidth -20,displayHeight -100);

  background=createSprite(displayWidth/2 -50,displayHeight/2 -150);
  background.addImage(backgroundImg);
  background.velocityX = -2;
   background.scale = 8;

  diver = createSprite(400,200);
  diver.addAnimation("SahilDiving",diverImg);
  diver.scale = 0.4;

  gameOver = createSprite(720,300);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.4

  restart = createSprite(700,600);
  restart.addImage(restartImg);
  restart.scale = 0.09;
  restart.visible = false;

  invisibleGround1 = createSprite(730,690,1600,20)
  invisibleGround1.visible = false;

  invisibleGround2 = createSprite(730,80,1600,20)
  invisibleGround2.visible = false;
 
  cloneFishG = new Group();
  blueFishG = new Group();
  blackgreenfishG = new Group();
  blackorangefishG = new Group();
  darkBlueFishG = new Group();
  rainbowfishG = new Group();

  plasticBagG = new Group();
  plasticBoxG = new Group();
  plasticCanG = new Group();
  plasticHangerG = new Group();
  plasticMugG = new Group();
  plasticSpoonG = new Group();
 
  virusG = new Group();

}

function draw() {
  //background(255,255,255);
  edges = createEdgeSprites();

 if(gameState === PLAY){
  if(background.x < 600 ){
    background.x = width/2;
    }

  if(keyDown("u")){
    diver.y = diver.y -2;
  }
  if(keyDown("d")){
    diver.y = diver.y +2;
  }


  diver.collide(invisibleGround1);
  diver.collide(invisibleGround2);
  diver.collide(edges);

  
  if(diver.isTouching(plasticBagG)){
    plasticBagG.destroyEach();
    collectSound.play();
    score = score+1;
  }

  if(diver.isTouching(plasticBoxG)){
    plasticBoxG.destroyEach();
    collectSound.play();
    score = score+2;
  }

  if(diver.isTouching(plasticCanG)){
    plasticCanG.destroyEach();
    collectSound.play();
    score = score+3;
  }

  if(diver.isTouching(plasticHangerG)){
    plasticHangerG.destroyEach();
    collectSound.play();
    score = score+4;
  }

  if(diver.isTouching(plasticMugG)){
    plasticMugG.destroyEach();
    collectSound.play();
    score = score+5;
  }

  if(diver.isTouching(plasticSpoonG)){
    plasticSpoonG.destroyEach();
    collectSound.play();
    score = score+6;
  }

  createPlasticBag();
  createPlasticBox();
  createPlasticCan();
  createPlasticHanger();
  createPlasticMug();
  createPlasticSpoon();


  if(diver.isTouching(cloneFishG)){
    diver.x = 400;
    diver.y = 200;
    cloneFishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  if(diver.isTouching(blueFishG)){
    diver.x = 400;
    diver.y = 200;
    blueFishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  if(diver.isTouching(blackgreenfishG)){
    diver.x = 400;
    diver.y = 200;
    blackgreenfishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  if(diver.isTouching(blackorangefishG)){
    diver.x = 400;
    diver.y = 200;
    blackorangefishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  if(diver.isTouching(darkBlueFishG)){
    diver.x = 400;
    diver.y = 200;
    darkBlueFishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  if(diver.isTouching(rainbowfishG)){
    diver.x = 400;
    diver.y = 200;
    rainbowfishG.destroyEach();
    loseSound.play();
    score = score-2;
  }

  createCloneFish();
  createBlueFish();
  createBlackgreenFish();
  createBlackorangeFish();
  createDarkblueFish();
  createRainbowFish();
  
  createVirus();

  if(diver.isTouching(virusG)){
    gameState = END;
  }
 }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;

    gameOverSound.play();

    diver.changeAnimation("SahilDiving",gameOverImg);
    diver.visible = false;
    background.velocityX = 0;
    
    cloneFishG.destroyEach();
    blueFishG.destroyEach();
    blackgreenfishG.destroyEach();
    blackorangefishG.destroyEach();
    darkBlueFishG.destroyEach();
    rainbowfishG.destroyEach();

    plasticBagG.destroyEach();
    plasticBoxG.destroyEach();
    plasticCanG.destroyEach();
    plasticHangerG.destroyEach();
    plasticMugG.destroyEach();
    plasticSpoonG.destroyEach();

    virusG.destroyEach();
   
    if(mousePressedOver(restart)) {
      reset();
    }
  }
   

  drawSprites();
  fill("black")
  textSize(40);
  text("SCORE : " + score , 1200,60);

  fill("purple");
  textSize(30);
  text("press 'U' to go up",90 ,50);
  text("press 'D' to go down",90 ,100);
}

function reset(){

  gameState=PLAY;
  background.velocityX = -2;

  gameOverSound.stop();

  gameOver.visible = false;
  restart.visible = false;
  
  diver.visible = true;
  diver.x = 400;
  diver.y = 200;

  virusG.destroyEach();
  plasticBagG.destroyEach();
  plasticBoxG.destroyEach();
  plasticCanG.destroyEach();
  plasticHangerG.destroyEach();
  plasticMugG.destroyEach();
  plasticSpoonG.destroyEach();

  cloneFishG.destroyEach();
  blueFishG.destroyEach();
  blackgreenfishG.destroyEach();
  blackorangefishG.destroyEach();
  darkBlueFishG.destroyEach();
  rainbowfishG.destroyEach();
  
  diver.addAnimation("SahilDiving",diverImg);

  score = 0;
}

function createTreasure(){
if (frameCount % 2000 === 0) {
  var treasure = createSprite(3500,165,10,40);
  treasure.y = Math.round(random(300,690));
  treasure.addImage(treasureImg);
  treasure.scale = 0.2;
  treasure.velocityX = -2;
  
   //assign lifetime to the variable
   treasure.lifetime = 2000;
  
  //add each cloud to the group
  treasureG.add(treasure);
 }
}


function createVirus(){
  if (frameCount % 2000 === 0) {
    var virus = createSprite(2500,165,10,40);
    virus.y = Math.round(random(300,690));
    virus.addImage(virusImg);
    virus.scale = 0.2;
    virus.velocityX = -2;
    
     //assign lifetime to the variable
     virus.lifetime = 2000;
    
    //add each cloud to the group
    virusG.add(virus);
  }
  
}



function createCloneFish(){
  if (frameCount % 500 === 0) {
    var cloneFish = createSprite(100,165,10,40);
    cloneFish.y = Math.round(random(600,650));
    cloneFish.addImage(cloneFishImg);
    cloneFish.scale = 0.2;
    cloneFish.velocityX = 1;
    
     //assign lifetime to the variable
     cloneFish.lifetime = 1200;
    
    //add each cloud to the group
    cloneFishG.add(cloneFish);
  }
  
}

function createBlueFish(){
  if (frameCount % 500 === 0) {
    var blueFish = createSprite(2000,265,10,40);
    blueFish.y = Math.round(random(300,400));
    blueFish.addImage(blueFishImg);
    blueFish.scale = 0.05;
    blueFish.velocityX = -2;
    blueFish.rotation = 180
    
     //assign lifetime to the variable
     blueFish.lifetime = 900;
    
    //add each cloud to the group
    blueFishG.add(blueFish);
  }
  
}


function createBlackgreenFish(){
  if (frameCount % 500 === 0) {
    var blackgreenfish = createSprite(2200,25,10,40);
    blackgreenfish.y = Math.round(random(400,500));
    blackgreenfish.addImage(blackgreenfishImg);
    blackgreenfish.scale = 0.1;
    blackgreenfish.velocityX = -2;
   // blackgreenfish.rotation = 180;
    
     //assign lifetime to the variable
     blackgreenfish.lifetime = 1000;
    
    //add each cloud to the group
    blackgreenfishG.add(blackgreenfish);
  }
  
}

function createBlackorangeFish(){
  if (frameCount % 400 === 0) {
    var blackorangefish = createSprite(2100,35,10,40);
    blackorangefish.y = Math.round(random(330,430));
    blackorangefish.addImage(blackorangefishImg);
    blackorangefish.scale = 0.1;
    blackorangefish.velocityX = -2;
   // blackorangefish.rotation = 180;
    
     //assign lifetime to the variable
     blackorangefish.lifetime = 1100;
    
    //add each cloud to the group
    blackorangefishG.add(blackorangefish);
  }
  
}

function createDarkblueFish(){
  if (frameCount % 500 === 0) {
    var darkBlueFish = createSprite(50,45,10,40);
    darkBlueFish.y = Math.round(random(420, 520));
    darkBlueFish.addImage(darkBlueFishImg);
    darkBlueFish.scale = 0.09;
    darkBlueFish.velocityX = 1;
  //  darkBlueFish.rotation = 180;
    
     //assign lifetime to the variable
     darkBlueFish.lifetime = 1500;
    
    //add each cloud to the group
    darkBlueFishG.add(darkBlueFish);
  }
  
}

function createRainbowFish(){
  if (frameCount % 600 === 0) {
    var rainbowfish = createSprite(2200,265,10,40);
    rainbowfish.y = Math.round(random(470,580));
    rainbowfish.addImage(rainbowfishImg);
    rainbowfish.scale = 0.2;
    rainbowfish.velocityX = -2;
    //rainbowfish.rotation = 180;
    
     //assign lifetime to the variable
     rainbowfish.lifetime = 1100;
    
    //add each cloud to the group
    rainbowfishG.add(rainbowfish);
  }
  
}
////////
function createPlasticBag(){
  if (frameCount % 500 === 0) {
    var bag = createSprite(1900,65,10,40);
    bag.y = Math.round(random(390,450));
    bag.addImage(plasticBagImg);
    bag.scale = 0.3;
    bag.velocityX = -1;
    
     //assign lifetime to the variable
     bag.lifetime = 2000;
    
    //add each cloud to the group
    plasticBagG.add(bag);
  }
  
}

function createPlasticBox(){
  if (frameCount % 500 === 0) {
    var box = createSprite(100,20,10,40);
    box.y = Math.round(random(390,450));
    box.addImage(plasticBoxImg);
    box.scale = 0.3;
    box.velocityX = 1;
    
     //assign lifetime to the variable
     box.lifetime = 2000;
    
    //add each cloud to the group
    plasticBoxG.add(box);
  }
  
}

function createPlasticCan(){
  if (frameCount % 500 === 0) {
    var can = createSprite(100,20,10,40);
    can.y = Math.round(random(330,500));
    can.addImage(plasticCanImg);
    can.scale = 0.4;
    can.velocityX = 1;
    
     //assign lifetime to the variable
     can.lifetime = 2000;
    
    //add each cloud to the group
    plasticCanG.add(can);
  }
  
}

function createPlasticHanger(){
  if (frameCount % 500 === 0) {
    var hanger = createSprite(200,30,10,40);
    hanger.y = Math.round(random(390,450));
    hanger.addImage(plasticHangerImg);
    hanger.scale = 0.4;
    hanger.velocityX = 1;
    
     //assign lifetime to the variable
     hanger.lifetime = 2000;
    
    //add each cloud to the group
    plasticHangerG.add(hanger);
  }
  
}

function createPlasticMug(){
  if (frameCount % 500 === 0) {
    var mug = createSprite(2200,65,10,40);
    mug.y = Math.round(random(510,600));
    mug.addImage(plasticMugImg);
    mug.scale = 0.3;
    mug.velocityX = -1;
    
     //assign lifetime to the variable
     mug.lifetime = 2000;
    
    //add each cloud to the group
    plasticMugG.add(mug);
  }
  
}

function createPlasticSpoon(){
  if (frameCount % 500 === 0) {
    var spoon = createSprite(100,65,10,40);
    spoon.y = Math.round(random(540,620));
    spoon.addImage(plasticSpoonImg);
    spoon.scale = 0.3;
    spoon.velocityX = 1;
    
     //assign lifetime to the variable
     spoon.lifetime = 2000;
    
    //add each cloud to the group
    plasticSpoonG.add(spoon);
  }
  
}
