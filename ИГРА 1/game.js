let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let mode = +prompt('Выберите режим (1 - Уровни, 2 - Аркада)');

let cheat = +prompt('Введите чит код (исползование читов - минус к карме)');
let health = 3
let fireSpeed = 35;
let asterCreateSpeed = 50;
let complexity = 0;
let score = 10;
let asters = [];
let fire = [];
let expl = [];
let timer = 0;
let ship = {x: 300, y:300, destroy: false};


if (cheat === 404) {
    alert('Ускоренные пули активированы!')
    fireSpeed = 10
}else if (cheat === 1034) {
    alert('Поздравляем, вы прошли игру!')
    gameStop();

}else if (cheat === 999) {
    alert('Ох зря ты это ввел...')
    asterCreateSpeed = 1
    score = 'ЧИТЕР                    '
    complexity = 666
}

let fonimg = new Image();
fonimg.src = 'Images/fon.png';

let aster = new Image();
aster.src = 'Images/astero.png';

let ship1 = new Image();
ship1.src = 'Images/ship01.png';

let fireimg = new Image();
fireimg.src = 'Images/fire.png';

let explimg = new Image();
explimg.src = 'Images/expl222.png';

asters.push({x: 0, y: 300, dx: 1, dy: 2});

canvas.addEventListener('mousemove', function(event) {
    ship.x = event.offsetX-25;
    ship.y = event.offsetY-13;
});


fonimg.onload = function() {
    if (mode > 2) {
      alert('Некорректное число!');
    } else {
        game();
    }
}
function game() {
    if (health <= 0) {
      return;
    }
    update();
    render();
    requestAnimFrame(game);
}

function update() {
    timer++;
    if (timer % asterCreateSpeed === 0) {
        asters.push({
            x: Math.random()*600,
            y: -50, 
            dx: Math.random()*2 - 1, 
            dy: Math.random()*2 + 2,
            del: 0
        });
    }
    if (timer % fireSpeed === 0) {
        if (!ship.destroy) {
            fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2 });
            fire.push({ x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5 });
            fire.push({ x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5 });
        }
    }

    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;

        if (fire[i].y < -30) {
            fire.splice(i, 1);
        }
    }

    for (i in asters) {
        asters[i].x = asters[i].x + asters[i].dx;
        asters[i].y = asters[i].y + asters[i].dy;

        if (asters[i].x >= 550 || asters[i].x < 0) {
            asters[i].dx=-asters[i].dx
        }
        if (asters[i].y >= 600) {
            asters.splice(i, 1);
        }
        
        if (
          Math.abs(asters[i].x - ship.x) < 25 &&
          Math.abs(asters[i].y - ship.y) < 25
        ) {
          health -= 1;
          asters[i].del = 1;
          ship.destroy = true;
          expl.push({
            x: ship.x - 25,
            y: ship.y - 25,
            animx: 0,
            animy: 0,
            isShip: true,
          });
        }

        for (j in fire) {
            if (Math.abs(asters[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(asters[i].y - fire[j].y) < 25) {
                expl.push({
                    x: asters[i].x - 25,
                    y: asters[i].y - 25,
                    animx: 0,
                    animy: 0,
                    isShip: false,
                });
                asters[i].del = 1;
                fire.splice(j, 1);
                score += 5
                if (score % 100 === 0) {
                    alert('Уровень сложности повышен');
                    complexity += 1
                    asterCreateSpeed -= 5;
                }
                if (complexity === 10) {
                    alert('Поздравляем, вы прошли игру!')
                    gameStop();
                }
                break;

            }
        }
        if (asters[i].del === 1) {
            asters.splice(i, 1);
        }
    
    }
    for (i in expl) {
        expl[i].animx = expl[i].animx + 1;
        if (expl[i].animx > 7) {
            expl[i].animy++;
            expl[i].animx = 0
        }
        if (expl[i].animy > 7) {       
            if (expl[i].isShip) {
                ship.destroy = false;
            }
            expl.splice(i, 1);
        }
    }
}

function render() { 
    context.drawImage(fonimg, 0, 0, 600, 600);
    context.fillStyle = 'white';
    context.font = 'bold 10px sans-serif';
    context.fillText('Ед. здоровья ' + health, 275, 25);
    context.fillStyle = 'purple';
    context.font = 'bold 30px sans-serif';
    context.fillText('Очков: ' + score, 250, 50);
    context.fillStyle = 'green';
    context.font = 'bold 10px sans-serif';
    context.fillText(' Уровень сложности: ' + complexity, 260, 60);
    if (health <= 0) {
        context.fillStyle = 'blue';
        context.font = 'bold 50px sans-serif';
        context.fillText('GAME OVER', 165, 250);
    }
    if (!ship.destroy) {
        context.drawImage(ship1, ship.x, ship.y);
    }
    for (i in fire) {
        context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
    }
    for (i in asters) {
        context.drawImage(aster, asters[i].x, asters[i].y, 50, 50);
    }
    for (i in expl) {
        const animx = 128 * Math.floor(expl[i].animx);
        const animy = 128 * Math.floor(expl[i].animy);
        context.drawImage(explimg, animx, animy, 128, 128, expl[i].x, expl[i].y, 100, 100);
    }
}
let requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame  ||
    window.mozRequestAnimationFrame     ||
    window.oRequestAnimationFrame       ||
    window.msRequestAnimationFrame      ||
    function(callback){
        window.setTimeout(callback, 1000 / 20)
    };
})();
function gameStop() {
    // requestAnimFrame(false);
}

// }else if(mode === 2) {
    
//     let playerAsterCreateSpeed = +prompt('Введите кол-во метеоритов за кадр (от 0 до бесконечности)');
//     asterCreateSpeed = playerAsterCreateSpeed
//     if (cheat === 404) {
//     alert('Ускоренные пули активированы!')
//     fireSpeed = 10
// }else if (cheat === 1034) {
//     alert('Поздравляем, вы прошли игру!')
//     gameStop();
// }else if (cheat === 999) {
//     alert('Ох зря ты это ввел...')
//     asterCreateSpeed = 1
//     score = 'ЧИТЕР                    '
//     complexity = 666
// }

// let fonimg = new Image();
// fonimg.src = 'Images/fon.png';

// let aster = new Image();
// aster.src = 'Images/astero.png';

// let ship1 = new Image();
// ship1.src = 'Images/ship01.png';

// let fireimg = new Image();
// fireimg.src = 'Images/fire.png';

// let explimg = new Image();
// explimg.src = 'Images/expl222.png';

// asters.push({x: 0, y: 300, dx: 1, dy: 2});

// canvas.addEventListener('mousemove', function(event) {
//     ship.x = event.offsetX-25;
//     ship.y = event.offsetY-13;
// });


// fonimg.onload = function() {
//     game();
// }
// function game() {
//     update();
//     render();
//     requestAnimFrame(game);
// }

// function update() {
//     timer++;
//     if (timer % asterCreateSpeed === 0) {
//         asters.push({
//             x: Math.random()*600,
//             y: -50, 
//             dx: Math.random()*2 - 1, 
//             dy: Math.random()*2 + 2,
//             del: 0
//         });
//     }
//     if (timer % fireSpeed === 0) {
//         fire.push({x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2});
//         fire.push({x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5});
//         fire.push({x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5});
//     }

//     for (i in fire) {
//         fire[i].x = fire[i].x + fire[i].dx;
//         fire[i].y = fire[i].y + fire[i].dy;

//         if (fire[i].y < -30) {
//             fire.splice(i, 1);
//         }
//     }

//     for (i in asters) {
//         asters[i].x = asters[i].x + asters[i].dx;
//         asters[i].y = asters[i].y + asters[i].dy;

//         if (asters[i].x >= 550 || asters[i].x < 0) {
//             asters[i].dx=-asters[i].dx
//         }
//         if (asters[i].y >= 600) {
//             asters.splice(i, 1);
//         }

//         for (j in fire) {
//             if (Math.abs(asters[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(asters[i].y - fire[j].y) < 25) {
//                 expl.push({
//                     x: asters[i].x - 25,
//                     y: asters[i].y - 25,
//                     animx: 0,
//                     animy: 0
//                 });
//                 asters[i].del = 1;
//                 fire.splice(j, 1);
//                 score += 5
//                 break;

//             }
//         }
//         if (asters[i].del === 1) {
//             asters.splice(i, 1);
//         }
    
   
//         if (asters[i].x === ship.x && asters[i].y === ship.y) {
//             asters[i].del = 1;
//             asters.splice(j, 1);
//             alert('GAME OVER INSERT COIN TO CONTINUE')
//             return;
//         }
    
    
//         for (i in expl) {
//             expl[i].animx = expl[i].animx + 1;
//             if (expl[i].animx > 7) {
//                 expl[i].animy++;
//                 expl[i].animx = 0
//             }
//             if (expl[i].animy > 7) {       
//                 expl.splice(i, 1);
//             }
//         }
//     }
// }
// function render() { 
//     context.drawImage(fonimg, 0, 0, 600, 600);
//     context.fillStyle = 'purple';
//     context.font = 'bold 30px sans-serif';
//     context.fillText('Очков: ' + score, 250, 50);
//     if (asterCreateSpeed === 1) {
//         context.fillStyle = 'red';
//         context.font = 'bold 10px sans-serif';
//         context.fillText('Уровень сложности: Невероятно сложно', 260, 60);
//     }else if (asterCreateSpeed <= 10) {
//         context.fillStyle = 'orange';
//         context.font = 'bold 10px sans-serif';
//         context.fillText('Уровень сложности: Сложно', 260, 60);
//     }else if(asterCreateSpeed <= 25) {
//         context.fillStyle = 'yellow';
//         context.font = 'bold 10px sans-serif';
//         context.fillText('Уровень сложности: Средне', 260, 60);
//     }else if(asterCreateSpeed <= 40) {
//         context.fillStyle = 'green';
//         context.font = 'bold 10px sans-serif';
//         context.fillText('Уровень сложности: Легко', 260, 60);
//     }else if (asterCreateSpeed > 40) {
//         context.fillStyle = 'green';
//         context.font = 'bold 10px sans-serif';
//         context.fillText('Уровень сложности: очень легко', 260, 60);
//     }else {
//     alert('Некорректное число!')
//     }   
//     context.drawImage(ship1, ship.x, ship.y,);
//     for (i in fire) {
//         context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
//     }
//     for (i in asters) {
//         context.drawImage(aster, asters[i].x, asters[i].y, 50, 50);
//     }
//     for (i in expl) {
//         const animx = 128 * Math.floor(expl[i].animx);
//         const animy = 128 * Math.floor(expl[i].animy);
//         context.drawImage(explimg, animx, animy, 128, 128, expl[i].x, expl[i].y, 100, 100);
//     }
// }
// let requestAnimFrame = (function() {
//     return window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame  ||
//     window.mozRequestAnimationFrame     ||
//     window.oRequestAnimationFrame       ||
//     window.msRequestAnimationFrame      ||
// function(callback){
//     window.setTimeout(callback, 1000 / 20)
// };
// })();
// function gameStop() {
//     requestAnimFrame() = false
// }
// }
// }