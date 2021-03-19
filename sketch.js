var naruto, narutoimg;
var ita,itaimg,mad,madimg,kab,kabimg,tob,tobimg,oro,oroimg,kim,kimimg;
var bg,bgimg;
var gameover,gameoverimg,start,startimg,restart,restartimg;
var logo,logoimg;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var score = 0;
var obs,obsgroup;
var rasegan,rasegroup;
var ground; 

function preload(){
narutoimg = loadImage("Naruto1.png",);
itaimg = loadImage("Itachi.png");
madimg = loadImage("Madara.png");
kabimg = loadImage("Kabuto.png");
tobimg = loadImage("Tobi2.png");
oroimg = loadImage("Oro.png");
kimimg = loadImage("Kim.png");
bgimg = loadImage("bg.jpg");
gameoverimg = loadImage("gameover.png");
startimg = loadImage("Start2.png");
restartimg = loadImage("restart.png");
logoimg = loadImage("Logo.png");
}


function setup(){
createCanvas(1550,750);
bg = createSprite(0,0,1200,1200);
bg.addImage(bgimg);
bg.scale = 1.4;
bg.x = bg.width/2;
//bg.velocityX = -9;

naruto = createSprite(165,730,35,50);
naruto.addImage(narutoimg);
naruto.scale = 1.3;
naruto.setCollider("circle",0,0,75);
naruto.debug = true;

ground = createSprite(120,740,1550,10);
ground.visible = false;

logo = createSprite(775,375,40,40);
logo.addImage(logoimg);
logo.scale = 0.7;

start = createSprite(750,560,45,40);
start.addImage(startimg);
start.scale = 0.2;

gameover = createSprite(775,375,45,50);
gameover.addImage(gameoverimg);
gameover.scale = 1.5;
gameover.visible = false;

restart = createSprite(750,560,45,40);
restart.addImage(restartimg);
restart.scale = 0.7;
restart.visible = false;

obsgroup = new Group();

score = 0;


}


function draw(){
if (mousePressedOver(start)){
gameState = PLAY;
start.visible = false;
logo.visible = false;
naruto.velocityY = -20;
}

if(gameState ===PLAY){
//bg.velocityX = -9;
score = score + Math.round(getFrameRate()/60);

if(bg.X<0){
bg.X = bg.width/2;    
}

if(keyDown("space")&& naruto.y>=400){
naruto.velocityY = -20;
 
}
naruto.velocityY = naruto.velocityY +2.5;

if(naruto.isTouching(obsgroup)){
gameState = END;
}

enemy();

}
else if(gameState === END){
gameover.visible = true;
restart.visible = true;
naruto.velocityX = 0;
naruto.velocityY = 0;
obsgroup.setVelocityXEach();
obsgroup.setVelocityYEach();  
obsgroup.destroyEach();
naruto.x = 165;
naruto.y = 730;

}
//if (mousePressedOver(restart)){
//reset();    
//}

naruto.collide(ground);

drawSprites();
textSize(25);
textStyle(BOLD);
fill("black");
text("SCORE: "+score,1350,50);

}

function enemy(){
if(frameCount%60 === 0){
var obs = createSprite(1450,620,45,70);
obs.velocityX = -9;
var rand = Math.round(random(1,6));
switch(rand){
case 1: obs.addImage(itaimg);
obs.scale = 0.5;
break;
case 2: obs.addImage(madimg);
obs.scale = 0.5;
break;
case 3: obs.addImage(kabimg);
obs.scale = 0.6;
break;
case 4: obs.addImage(tobimg);
obs.scale = 1.3;
break;
case 5: obs.addImage(oroimg);
obs.scale = 0.4;
break;
obs.scale = 0.5;
case 6: obs.addImage(kimimg);
obs.scale = 0.5;
break;
}  
obsgroup.add(obs);
}
    

}
function reset(){
gameState = PLAY;
gameover.visible = false;
score = 0;
obsgroup.destroyEach();
naruto.x = 165;
naruto.y = 750;
}