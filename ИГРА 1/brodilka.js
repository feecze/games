let game = {
    run() {
        while(true) {
            let direction = +prompt('Введите управление (2, 8, 4 или 6)');

            if(direction === 0) {
                console.log('Игра окончена');
                return;
            }
            
            let nextPoint = mover.getNextPoint(direction);
            renderer.clear();
            player.move(nextPoint);
            renderer.render();
        }
    },
    
    init() {
        console.log('Для начала игры введите команду game.run()');
        renderer.render();
    }
};

game.init();
