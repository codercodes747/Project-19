var sky,skyImg
var jet,jetImg
var bullet,bulletImg
var score=0;
var gamestate = "play"
var  restart;


function preload(){
    skyImg = loadImage("night_sky4.png")
    jetImg = loadImage("Jet.png")
    bulletImg = loadImage("Bullet.png")
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    sky = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
    sky.addImage("sky",skyImg);

    jet = createSprite(100,windowHeight/3.75,30,30)
    jet.addImage("jet",jetImg)
    jet.scale = 0.1

    restart = createSprite(300,140);
    restart.addImage(restartImg);
    restart.scale = 0.5
    restart.visible = false;

    bulletsGroup = new Group()

}

function draw() {
 background(skyImg)
    
 

   score = score + Math.round(getFrameRate()/60);
    sky.velocityX = -(6 + 3*score/100);

   if(gamestate==="play"){

      if(keyDown(UP_ARROW)){
        jet.y = jet.y - 5
      }

      if(keyDown(DOWN_ARROW)){
        jet.y = jet.y + 5
      }
      sky.velocityX = -10
      
      if(sky.x<-2400){
        sky.x = 375
      }
      sky.scale=1
      

      if(score>=5000){
        gamestate = "victory"
       
      }
      
      spawnBullets()

      if (bulletsGroup.isTouching(jet)){
        gamestate = "end"
      }
   } 
    
   if(gamestate==="end"){
    sky.velocityX = 0
    bullets.lifetime = -1
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }

   }

   
 drawSprites()
 textSize(25);
 fill("white")
text("score: "+score,windowWidth-150,80)
}

function spawnBullets(){
   if(frameCount%60===0){
   
    bullet = createSprite(windowWidth-75,Math.round(random(60,560)))
    bullet.addImage("bullet",bulletImg)
    bullet.velocityX = -20
    bullet.scale = 0.15
    bullet.lifetime = windowWidth / 7
    bulletsGroup.add(bullet)
}
}
function reset(){
  gameState = "play";
  restart.visible = false;
  
  bulletsGroup.destroyEach();
    
  score = 0;
  
}