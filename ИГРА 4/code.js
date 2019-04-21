let clicker = document.querySelector('.clicker');
let count = score();
clicker.addEventListener('click', count);

function score() {
  let score = 0;
  let clicker = document.querySelector('.clicker');
  let counterTitle = document.querySelector('.score');
  return function counter(event) {
    //Замыкание
    score += 1;
    counterTitle.textContent = `Score: ${score}`;
    
    let node = event.target;
    let coordinateX = node.clientX;
    let coordinateY = node.clientY;
    let coordinates = randomPosition(coordinateX, coordinateY);
    console.log(coordinates);
    clicker.style.cssText = `top: ${coordinates.randomNumberX}px; right: ${coordinates.randomNumberY}px;`;
  }
};

function randomPosition(x, y) {
  let randomNumberX = Math.random()
  let randomNumberY = Math.random()
  let step = 300

  if(randomNumberX > 0.5) {
    randomNumberX = Math.floor(randomNumberX * step);
    if(randomNumberX > document.documentElement.clientWidth) {
      randomNumberX -= step;
    }
  }else {
    randomNumberX = Math.floor(randomNumberX * -step);
    if(randomNumberX < 0) {
      randomNumberX += step;
    }
  }

  if(randomNumberY > 0.5) {
    randomNumberY = Math.floor(randomNumberY * step);
    if(randomNumberY > document.documentElement.clientHeight) {
      randomNumberY -= step;
    }
  }else {
    randomNumberY = Math.floor(randomNumberY * -step);
    if(randomNumberY < 0) {
      randomNumberY += step;
    }
  };

  return {
    randomNumberX,
    randomNumberY
  };
}