const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

// comeca acontagem de frames do 1
let frameCount = 1;
// seta o numero de obstaculos a partir do level
let obCount = frameCount;
// cria uma colecao para as coordenadas geradas
const obXCoors = [];

const square = {

  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0

};

// cria obstaculos para cada frame
const nextFrame = () => {
  // aumenta o frame / "level" numero
  frameCount++;
  
  for (let i = 0; i < obCount; i++) {
    // gera a coordenada x para os triangulos 
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }

}

const controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:// esquerda
        controller.left = key_state;
        break;
      case 38:// cima
        controller.up = key_state;
        break;
      case 39:// direita
        controller.right = key_state;
        break;

    }

  }

};

const loop = function () {

  if (controller.up && square.jumping == false) {

    square.yVelocity -= 20;
    square.jumping = true;

  }

  if (controller.left) {

    square.xVelocity -= 0.5;

  }

  if (controller.right) {

    square.xVelocity += 0.5;

  }

  square.yVelocity += 1.5;// gravidade
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9;// atrito
  square.yVelocity *= 0.9;// atrito

  // se o quadrado cair alem da linha do chao
  if (square.y > 386 - 16 - 32) {

    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;

  }

  // se o quadrado ir alem da linha esquerda
  if (square.x < -20) {

    square.x = 1220;

  } else if (square.x > 1220) {// se o quadrado ir alem da linha direita

    square.x = -20;
    nextFrame();

  }
  // cria o plano de fundo para cada frame
  context.fillStyle = "black";
  context.fillRect(0, 0, 1220, 400); // x, y, largura, altura


  // cria o cubo em cada frame
  context.fillStyle = "green"; // cor do cubo
  context.beginPath();
  context.rect(square.x, square.y, square.width, square.height);
  context.fill();


  // cria obstaculos para cada frame
  // seta o padrao de altura dos obstaculos
  const height = 200 * Math.cos(Math.PI / 6);

  context.fillStyle = "red"; // cor do triangulo
  obXCoors.forEach((obXCoor) => {
    context.beginPath();

    context.moveTo(obXCoor, 385); // x = random, y = coor. no "chao"
    context.lineTo(obXCoor + 20, 385); // x = ^random + 20, y = coor. no "chao"
    context.lineTo(obXCoor + 10, 510 - height); // x = ^random + 10, y = pico do triangulo
  
    context.closePath();
    context.fill();
  })


  // cria o "chao" para cada frame
  context.strokeStyle = "blue";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  // atualiza o browser quando o jogo e iniciado
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);