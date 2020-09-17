var ball;
var position,Database;

function setup(){
    Database = firebase.database();
    createCanvas(500,500);   
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPos = Database.ref('Ball/Position');
    ballPos.on("value",readPos,showError);
}

function draw()
{
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePos(0,+1);
    }
    drawSprites();
}

function writePos(x,y)
{
    Database.ref('Ball/Position').set({
        x: Position.x + x,
        y: Position.y + y
    });
}

function readPos(data)
{
Position = data.val();
console.log(Position);
ball.x = Position.x;
ball.y = Position.y;
}

function showError()
{
console.log("Error in Accessing Database");
}