let board;
let boardwidth =400;
let boardheight =700;
let context =document.getElementById("let");

//craeting doodler

let doodlewidth =46;
let doodleheight =46;
let doodleX =boardwidth/2 - doodlewidth/2; // 
let doodleY =boardheight*7/8 -doodleheight;

let doodler ={  //we are creating a objects to the doodler
    img : null,             
    x : doodleX,
    y : doodleY,
    width : doodlewidth,
    height : doodleheight
}
//physics applying//

let velocityX = 0;
let velocityY = 0;
let initialvelocityY = -10;
let gravity = 0.6;


//platforms//

let platformArray = [];
let platformwidth = 50;
let platformheight =20;
let platrformImg;

// score 
let score = 0;
let maxscore =0;




window.onload = function(){      //  for getting loading the page quickly  
    board = document.getElementById("board");
    board.height = boardheight; 
    board.width = boardwidth;
    context = board.getContext("2d");//used for drawing the 2d drawings



doodlerRightImg = new Image();// upload a doodler image left and right  
doodlerRightImg.src = "doodle right.png";
doodler.img = doodlerRightImg;
doodlerRightImg.onload = function(){

    context.drawImage(doodler.img,doodler.x,doodler.y,doodler.width,doodler.height); // drawing a image

}

doodlerLeftImg = new Image();
doodlerLeftImg.src ="doodle left.jpg";

platrformImg = new Image();
platrformImg.src =  "new platforn 1.jpg";

velocityY =initialvelocityY;


placeplatforms();


 requestAnimationFrame(update);
document.addEventListener("keydown",movDoodler);

}

function update(){
  requestAnimationFrame(update);   //  to get smoother animation 
  context.clearRect( 0, 0,board.width,board.height );  //clear the frame rate
  doodler.x+= velocityX;
  if(doodler.x>board.width){
    doodler.x=0;
  }else if(doodler.x+doodler.width<0){
    doodler.x = board.width;
  }


  doodler.y += velocityY;
  velocityY += gravity;

  context.drawImage(doodler.img,doodler.x,doodler.y,doodler.width,doodler.height);

  for(let  i= 0 ; i< platformArray.length;i++){
    let platform =platformArray[i];
    if(velocityY<0 && doodler.y < boardheight*3/4){
        platform.y -= initialvelocityY;   // slide plat form 
    }
    if(detectCollision(doodler,platform) && velocityY>=0){
        velocityY =initialvelocityY;
    }
    context.drawImage(platform.img,platform.x,platform.y,platform.width,platform.height);
  }

  while(platformArray.length > 0 && platformArray[0].y >= boardheight){
    platformArray.shift();
    newplatform();
  }

updatescore();
context.fillStyle = "black";
context.font = "16px sans-serif";
context.fillText(score,5,20);

}

function movDoodler(e){
    if(e.code =="ArrowRight"  ||  e.code =="keyD"){
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if(e.code == "ArrowLeft" ||  e.code == "keyA"){
        velocityX=-4;
        doodler.img = doodlerLeftImg;
    }
}

function placeplatforms(){
    platformArray = [];

    let platForm ={
        img : platrformImg,
        x : boardwidth/2 ,
        y : boardheight - 50,
        width : platformwidth,
        height : platformheight
        

     }
     platformArray.push(platForm);

    //   platForm ={
    //     img : platrformImg,
    //     x : boardwidth/2 ,
    //     y : boardheight - 150,
    //     width : platformwidth,
    //     height : platformheight
        

    //  }
    //  platformArray.push(platForm);
    for(let i =0; i < 7 ;i++){
        let randomX = Math.floor(Math.random() * boardwidth *3/4);
        let platForm ={
            img : platrformImg,
            x : randomX ,
            y : boardheight -  75*i-150,
            width : platformwidth,
            height : platformheight
            
    
         }
         platformArray.push(platForm);

    }


}
function newplatform(){
    let randomX = Math.floor(Math.random() * boardwidth *3/4);
    let platForm ={
        img : platrformImg,
        x : randomX ,
        y : -platformheight,
        width : platformwidth,
        height : platformheight
        

     }
     platformArray.push(platForm);

}

//  how to control the access of getting one after another platform 
function detectCollision(a,b){
    return a.x < b.x + b.width &&  //a top left corner doesnt reach b top right corner
           a.x + a.width > b.x &&  //a top right corner passes b top left corner
           a.y < b.y + b.height && //a top left corner doesnt reach b top bottom corner
           a.y + a.height > b.y;

}

function updatescore(){
    let points = Math.floor(50*Math.random());
    if(velocityY < 0){
        maxscore += points;
        if(score < maxscore){
            score = maxscore;
        }
    }else if(velocityY>= 0){
        maxscore -= points;
    }
}
