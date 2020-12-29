

//const Engine = Matter.Engine;
//const World = Matter.World;
//const Bodies = Matter.Bodies;
//const Body = Matter.Body;

var detective, detective_running, detective_shooting;
var thugs_punching

var bg, life

var score;

var bullet,img 

var gameOver,restart;
var GameOver,Restart;
var ground, invisibleGround, groundImage;
var bulletGroup;
var thugGroup;
var cloudGroup;
var cloudImage
var groundImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload()
{
	detective_running = loadAnimation("1.png",
	"2.png",
	"3.png",
	"4.png",
	"5.png",
	"6.png",
	"7.png",
	"8.png",
	"9.png",
	"10.png",
	"11.png",
	"12.png",
	"13.png",
	"14.png",
	"15.png",
	"16.png",
	"17.png",
	"18.png",
	"19.png",
	"20.png");

	img = loadImage("B.png");
	thugs_punching = loadAnimation("01.png",
	"02.png",
	"03.png",
	"04.png",
	"05.png",
	"06.png",
	"07.png",
	"08.png",
	"09.png",
	"010.png",
	"011.png",
	"012.png",
	"013.png",
	"014.png",
	"015.png",
	"016.png",
	"017.png",
	"018.png",
	"019.png",
	"020.png",
	"021.png",
	"022.png"
	);
	cloudImage = loadImage("cloud.png");
	groundImg =  loadImage("ground2.png")
	gameOver = loadImage("gameOver.png");
	restart = loadImage("restart.png");


	

}

function setup() {
	createCanvas(displayWidth,200);//
	//engine = Engine.create();
	//world = engine.world;

	//Create the Bodies Here.

	detective = createSprite(50,180,20,50);

    detective.addAnimation("running", detective_running);
	detective.scale = 1;
	detective.setCollider("circle",0,0,30);

	ground = createSprite(0,180,displayWidth,20);
	ground.addImage(groundImg)
    ground.x = ground.width /2;
    ground.velocityX = -8;
  
    invisibleGround = createSprite(200,190,400,10);
	invisibleGround.visible = false;
	
	
	GameOver = createSprite(camera.position.x,100);
	Restart = createSprite(camera.position.x,140);
	GameOver. addImage("gameOver",gameOver);
	GameOver.scale = 0.5;
	Restart.addImage("restart",restart);
	Restart.scale = 0.5;

	GameOver.visible = false;
	Restart.visible = false;
	
	bulletGroup = new Group();
	thugGroup = new Group ();
	cloudGroup = new Group();

	score = 0

	//Engine.run(engine);
  
}


function draw() {
  background(255);
  fill ("lime");
  textSize(20)
  text("Score: "+ score, camera.position.x - 650,50);
  
  if(gameState === PLAY){
    detective.changeAnimation("running");
    camera .position.x = detective.x

    ground.velocityX = -(6 + 3*score/100);
    score = score + Math.round(getFrameRate()/60);

    if (ground.x < 0){
      ground.x = ground.width/4;
    }

    //jump when the space key is pressed
 if(keyDown("space") && detective.y > 150 ){
  detective.velocityY = -12 ;
}
  
  detective.velocityY = detective.velocityY + 0.6
  detective.debug = true;

  spawnClouds();
  spawnThugs();

  if(thugGroup.isTouching(detective)){
    gameState = END;
   }

  }
  else if(gameState === END){

    GameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    detective.velocityY = 0;
    thugGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    

    
    //set lifetime of the game objects so that they are never destroyed
    thugGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }

  if(mousePressedOver(Restart)) {
    reset();
  }
    
  detective.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % camera.position.x === 0) {
    var cloud = createSprite(displayWidth,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 800;
    
    //adjust the depth
    cloud.depth = detective.depth;
    detective.depth = detective.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
  
}

function spawnThugs() {
	if(frameCount % 100  === 0) {
	  var thug = createSprite(displayWidth,158,40,40);
	  thug.debug = true;
	  thug.addAnimation("punching",thugs_punching);
	  thug.velocityX = -5;
	  
	  /*generate random obstacles
	  var rand = Math.round(random(1,6));
	  switch(rand) {
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
		default: break;
	  }*/
	  
	  //assign scale and lifetime to the obstacle           
	  thug.scale = 1;
	  thug.lifetime = 800;
	  //add each obstacle to the group
	  thugGroup.add(thug);
	}
  }



  function reset(){
  gameState = PLAY;
  cloudGroup.destroyEach();
  thugGroup.destroyEach();
  detective.changeAnimation("running");
  GameOver.visible=false;
  Restart.visible=false;
  score=0; 
}