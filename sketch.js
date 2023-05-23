//Crie aqui as variáveis dos personagens e cenário
var carlinhos, carlinhosImg;
var pocadeagua, pocadeaguaImg, grupoPoca;
var chao, chaoImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //Carregar imagens e sons
  carlinhosImg = loadImage("carlinhos.png");
  pocadeaguaImg = loadImage("pocadeagua.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

  carlinhos = createSprite(150,height-200,20,20);
  carlinhos.addImage(carlinhosImg);
  carlinhos.scale = 0.5;

  chao = createSprite(width/2, height-50, width, 20)
  
  grupoPoca = new Group();
}

function draw() {
  background("blue");
  
  textSize(25);
  fill("white")
  text("Jogo do Pietro", 50,30);

  if(gameState === PLAY){
    if(keyDown("space") && carlinhos.y > 400 ){
      carlinhos.velocityY = -10;
    }
    carlinhos.velocityY = carlinhos.velocityY + 0.5;
    
    gerarPoca();

    if (grupoPoca.isTouching(carlinhos)){
      gameState = END;  
    }

  } 

  if(gameState === END){
    grupoPoca.destroyEach();
    carlinhos.destroy();
    textSize(40);
    fill("white")
    text("FIM DE JOGO", width/2, height/2);
    text("Pressione espaço para recomeçar", width/2 - 150, height/2 + 50);

    if (keyDown("space")){
      reset();
    }
  }

  
  
  /*if(pocadeagua.isTouching(carlinhos)){
    carlinhos.velocityY = 0;
  }*/

  /*if(invisibleBlockGroup.isTouching(ghost) || carlinhos.y > 600){
    carlinhos.destroy();
    gameState = "end"
  }*/

  carlinhos.collide(chao)
  
  drawSprites();
}

//a poça esta fora do lugar
function gerarPoca(){
  if (frameCount % 180 === 0){
    pocadeagua = createSprite(width-300,350,20,20);
    pocadeagua.addImage(pocadeaguaImg);
    pocadeagua.velocityX = -5;
    pocadeagua.scale = 0.04;

    pocadeagua.y = Math.round(random(100, height-100))

    pocadeagua.lifetime = width / 2;

    grupoPoca.add(pocadeagua)

  }
}



//E como faz o reset quando perder
function reset(){
  gameState = PLAY;

  carlinhos = createSprite(150,height-200,20,20);
  carlinhos.addImage(carlinhosImg);
  carlinhos.scale = 0.5;
}