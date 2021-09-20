var balloon;
var database,height;

function preload()
{
  bgImg=loadImage('images/bg.png');
  balloonImage=loadAnimation("images/b1.png","images/b2.png","images/b3.png")
}


function setup() {
  createCanvas(1500,658);
  database=firebase.database();
 balloon= createSprite(400, 200, 50, 50);
 balloon.addAnimation("Balloon",balloonImage);
 balloon.scale=0.5;

 var posRef=database.ref('balloon/height');
 posRef.on("value",readHeight,showErr)
}

function draw() {
  background(bgImg);  
  drawSprites();

  if(keyDown(UP_ARROW))
  {
    updateHeight(0,-10);
    balloon.scale=balloon.scale-0.01;
  }
  if(keyDown(DOWN_ARROW))
  {
    updateHeight(0,10);
    balloon.scale=balloon.scale+0.01;
  }
  if(keyDown(LEFT_ARROW))
  {
    updateHeight(-10,0);
  }
  if(keyDown(RIGHT_ARROW))
  {
    updateHeight(10,0);
  }
}
function readHeight(data)
{
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showErr()
{
  console.log("Error in reading from the database")
}

function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}