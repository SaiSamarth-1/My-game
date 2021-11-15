var bgNight,bgSprite;
var player, gameState = 0, playerHealth = 100, playerSprite, playerSprite2;
var invisFloor;
var isCrouching = false;
var enemysGroup,bombSprite,explosionSprite;
var frameCountSpeed = 60;
var score=0;
var explosionSound;

function preload(){
    bgNight = loadImage("images/gamebackground.png");
    playerSprite = loadImage("images/superherosprite1_1.png");
    playerSprite2 = loadImage("images/superherosprite1.png");
    bombSprite = loadImage("images/poisonbomb.png");
    explosionSprite = loadImage("images/explosion.png");
    explosionSound = loadSound("sounds/explosionsound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bgSprite = createSprite(width/2,height/2);
  bgSprite.addImage(bgNight);
  bgSprite.scale = 3;
  player = createSprite(width/4,658, 50, 50);
  player.addImage(playerSprite);
  player.scale=1.5;
  invisFloor = createSprite(width/2, windowHeight - 40, windowWidth, 30);
  invisFloor.visible = false;
  enemysGroup = createGroup();
}

function draw() {
  background(0);  
  if (bgSprite.x < 100){
    bgSprite.x = width;
  }
  
  if(frameCount % 10 === 0){
    score += 1;
  }

  if(frameCount % 240 === 0){
    frameCountSpeed -= 5
  }
  

  if(playerHealth == 0){
    gameState = 1;
  }

  if(gameState == 1){
    fill("Red")
    textSize(120);
    text("Game Over", windowWidth / 2 - 300, windowHeight / 2);
  }

  // push()


    // console.log("mouse y: " + mouseY)
    // console.log(windowHeight - 140)
  if(gameState == 0){
    enemysGroup.collide(invisFloor, explode);
    player.collide(invisFloor)
  spawnEnemies();
  drawSprites();

  fill("#5AC750");
  text("Score: " + score, player.x + 10, player.y - 40);

  fill("#8df0a8");
  text("Health: " + playerHealth, player.x - 80, player.y - 40);
  playerPlaying();
  }
}

function playerPlaying() {
    if(keyIsDown(UP_ARROW) && player.y > windowHeight - 140){
        player.velocityY -= 1.5
    }
    else {
      player.velocityY +=0.8
    }

      if(keyIsDown(RIGHT_ARROW)){
    player.x += 12
    player.addImage(playerSprite);
    }
  if(keyIsDown(LEFT_ARROW)){
    player.x -= 12
    player.addImage(playerSprite2);
    }  
    

    if(keyWentDown(DOWN_ARROW) && isCrouching === false){
            player.height = 30
            isCrouching = true
    }
    if(keyWentUp(DOWN_ARROW) && isCrouching === true){
        player.height = 50
        isCrouching = false;
    }
    console.log(isCrouching)    
}

function spawnEnemies(){
  if (frameCount % frameCountSpeed === 0) {
    var enemy = createSprite(0, 120,40,40);
    enemy.x = Math.round(random(100,width));
    enemy.velocityY = 20;

    enemy.addImage(bombSprite);
    enemy.scale=2
    
     //assign lifetime to the variable
    enemy.lifetime = 150;
    
    //adjust the depth
    enemy.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each enemy to the group
    enemysGroup.add(enemy);
  }
}

function explode(spriteA) {
  var explosion = createSprite(spriteA.x, spriteA.y,140,140);
  explosion.addImage(explosionSprite);
  if(player.overlap(explosion)){
    playerHealth -= 10;
    player.y -= 100
    player.x += 100
  }
  explosionSound.setVolume(0.1, 0.7);
  explosionSound.play();
  explosion.lifetime = 20;
  explosion.scale += 10.0;
  

  spriteA.remove();
}
