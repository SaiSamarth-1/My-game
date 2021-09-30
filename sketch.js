var bgNight,bgSprite;
var player, gameState = 0, playerHealth;
var invisFloor;
var isCrouching = false;
var enemysGroup;

function preload(){
    bgNight = loadImage("images/gamebackground.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bgSprite = createSprite(width/2,height/2);
  bgSprite.addImage(bgNight);
  bgSprite.scale = 3;
  player = createSprite(width/4,658, 50, 50);
  player.shapeColor = "red";
  playerHealth = 100;
  invisFloor = createSprite(width/2, windowHeight - 40, windowWidth, 30);
  invisFloor.visible = false;
  enemysGroup = createGroup();
}

function draw() {
  background(0);  
  if (bgSprite.x < 100){
    bgSprite.x = width;
  } 



    // console.log("mouse y: " + mouseY)
    // console.log(windowHeight - 140)
    player.collide(invisFloor)
  spawnEnemies();
  drawSprites();
  playerPlaying();
}

function playerPlaying() {
    if(keyIsDown(UP_ARROW) && player.y > windowHeight - 140){
        player.velocityY -= 1.5
    }
    else {
      player.velocityY +=0.8
    }

      if(keyIsDown(RIGHT_ARROW)){
    player.x += 6
    }
  if(keyIsDown(LEFT_ARROW)){
    player.x -= 6
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
  if (frameCount % 60 === 0) {
    var enemy = createSprite(0, 120,40,40);
    enemy.x = Math.round(random(100,width));
    enemy.velocityY = 20;

    enemy.shapeColor = "purple";
    
     //assign lifetime to the variable
    enemy.lifetime = 200;
    
    //adjust the depth
    enemy.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each enemy to the group
    enemysGroup.add(enemy);
  }
}
