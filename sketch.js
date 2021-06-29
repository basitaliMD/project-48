var PLAY =1;
var END = 0
var gameState = PLAY; 
var shooter,shooter_running, shooter_collided;
var zombie_running;
var bullet_Image;
var zombieGroup, bulletsGroup,extraLifeGroup;
var track_Image;
var life = 3;
var kills = 0;
var bulletsCount =10;
var bulletfeed, killfeed, lifeR ,life_image;
var extraLife;
var bullet1Group,bullet2Group;
var killfeed_Image;
var bulletSound, zombieSound, powerupSound;

function preload(){
  shooter_running = loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png")
  zombie_running = loadAnimation("Z1.png","Z2.png","Z3.png","Z4.png","Z5.png","Z6.png")
  shooter_collided = loadAnimation("S1.png");

  bullet_Image = loadImage('bullet.png')
  track_Image = loadImage('track.jpg')
  life_image = loadImage("life.png")
  extraLife = loadAnimation("L1.png","L2.png","L3.png","L4.png");
  killfeed_Image = loadImage("Gun.png");

  bulletSound = loadSound("gun.mp3");
  zombieSound = loadSound("zombie.mp3");
  powerupSound = loadSound("powerup.mp3")


}

function setup(){
  createCanvas(900,600)

  bg = createSprite(450,0,1200,800)
  bg.addImage(track_Image)
  bg.y = bg.height/2;
  bg.velocityY=-5
  bg.scale = 2
  bulletfeed = createSprite(280,40,20,20)
  bulletfeed.addImage(bullet_Image);
  bulletfeed.scale = 0.1

  lifeR = createSprite(480,40,20,20)
  lifeR.addImage(life_image);
  lifeR.scale = 0.1

  killfeed = createSprite(680,50,20,20)
  killfeed.addImage(killfeed_Image);
  killfeed.scale = 0.3;

  shooter = createSprite(500,500,20,20)
  shooter.addAnimation("running",shooter_running);
  shooter.scale = 0.3

  zombieGroup = new Group();
  bulletsGroup = new Group();
  extraLifeGroup = new Group();
  bullet1Group = new Group();
  bullet2Group = new Group();

  // shooter.debug = true;
  shooter.setCollider("rectangle",0,0, 200,300);




}
function draw(){
  background("brown") 
  drawSprites();
  if(gameState===PLAY){
    shooter.velocityY = 0;
    shooter.velocityX = 0;



  if(keyWentDown("space") && bulletsCount >0){
    shootBullets();
    bulletsCount -=1
  }



  if(keyDown('LEFT_ARROW')){
    shooter.velocityX = -4
  }
  if(keyDown('RIGHT_ARROW')){
    shooter.velocityX = 4;
  }
  for (var i = 0; i < zombieGroup.length; i++)
   { 
     if (zombieGroup.get(i).isTouching(bulletsGroup)) 
     { 
       zombieGroup.get(i).destroy();
       kills +=1;
  }
}
  
  if(bg.y<0){
    bg.y= bg.height/2
  }

  if(zombieGroup.isTouching(shooter)){
    zombieGroup.destroyEach();
    life -= 1;
  }
  if(extraLifeGroup.isTouching(shooter)){
    extraLifeGroup.destroyEach();
    life += 1;
    powerupSound.play();
  }
  if(bullet1Group.isTouching(shooter)){
    console.log("bullet1Group")
    bullet1Group.destroyEach();
    bulletsCount += 5;
    powerupSound.play();
   }

  if(kills === 20){
    zombieGroup.velocityY = 4;
  }
  // if(bullet2Group.isTouching(shooter)){
  //   console.log("bullet2Group")
  //   bullet2Group.destroyEach();
  //   bulletsCount += 10;
  // }


  if(life === 0){
    gameState = END;
  }
  if(kills % 15 === 0 && kills>0)  {
    life  +=1
    kills += 1;
  }
  spawnZombies();
  spawnLifePowerups();
  spawnBulletPowerups();

}
if(gameState === END){
  zombieGroup.destroyEach();
  bulletsGroup.destroyEach();
  extraLifeGroup.destroyEach();
  bullet1Group.destroyEach();
  shooter.velocityX = 0;

  textSize(50)
  text("Press R to Restart", 450,500);


}


if(keyWentDown("r")){
  reset();
}
  stroke('black')
  fill('red')
  textSize(50)
  text( life , 500,60)
  text( kills , 720,60)
  text (bulletsCount,300,60)
}

function spawnZombies(){
   if(frameCount % 100 === 0){
     var zombie = createSprite(600,10,20,20);
     zombie.x = Math.round(random(800,200))
     zombie.velocityY = 1;
     zombie.addAnimation("running",zombie_running);
     zombie.scale = 0.3

     zombie.lifetime = 1000;

     zombieGroup.add(zombie);
    //  zombie.debug = true;
   }
}

function shootBullets(){
  if( bulletsCount>0){
    var bullets = createSprite(1000,5000,10,20);
    bullets.addImage('bullet',bullet_Image)
    bullets.scale = 0.03
    bullets.x = shooter.x
    bullets.y = shooter.y
    bullets.velocityY = -5;

    bullets.depth = shooter.depth;
    shooter.depth = shooter.depth+1

    bulletsGroup.add(bullets);

    bullets.lifetime= 333;

    bulletSound.play();



  }

}
function spawnLifePowerups(){
    if(frameCount % 2000 === 0){
      var lifePowerup = createSprite(600,10,20,20);
      lifePowerup.addAnimation("extraLife",extraLife)
      lifePowerup.x = Math.round(random(800,200))
      lifePowerup.velocityY = 1;

      lifePowerup.lifetime = 1000;
      extraLifeGroup.add(lifePowerup)
    }
}
function spawnBulletPowerups(){
  if(frameCount % 1000 === 0){
      var bullet1 = createSprite(600,10,20,20);
      bullet1.addImage("bullet",bullet_Image);
      bullet1.shapeColor= "red"
      bullet1.x = Math.round(random(800,200))
      bullet1.velocityY = 1;

      bullet1.scale = 0.1

      bullet1.lifetime = 1000;

      bullet1Group.add(bullet1)
  }
}

function reset(){
  gameState = PLAY;
  kills = 0;
  bulletsCount = 10;
  life = 3;


}


