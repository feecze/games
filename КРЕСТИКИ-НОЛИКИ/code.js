

let ticTacToe = {
    mapValues: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    config: {
        rows: 3,
        cols: 3
    },
    status: 'playing',
    gameElement: document.getElementById('game'),
    phase: 1,

    init() {
        this.renderMap();

        this.initEventHandlers();
    },


    initEventHandlers() {
        this.gameElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    cellClickHandler() {
        //Если клик не нужно обрабатывать, уходим из функции
        if(!this.isCorrectClick(event)) {
            return;
        }

        //Заполняем ячейку
        this.fillCell(event);

        //Если кто-то выиграл, заходим в if
        if(this.hasWon()) {
            //Ставим статус в "Остановлено"
            this.setStatusStopped();
            //Сообщаем о победе пользователя
            this.sayWonPhrase();
        }

        //Меняем фигуру (крестик или нолик)
        this.togglePhase();
    },

    togglePhase() {
        this.phase = this.phase === 1 ? -1 : 1;
    },

    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase === 1 ? 'X' : '0';
    },

    hasWon() {
        // return this.isLineWon({x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}) ||
        //     this.isLineWon({x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}) ||
        //     this.isLineWon({x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}) ||

        //     this.isLineWon({x: 0, y: 0}, {x: 0, y: 1}, {x: 2, y: 2}) ||
        //     this.isLineWon({x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}) ||
        //     this.isLineWon({x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}) ||

        //     this.isLineWon({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}) ||
        //     this.isLineWon({x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0});
        let sumOfWin = 0;
        for (i = 0; i < this.mapValues.length; i++) {
            sumOfWin = 0;
            for (j = 0; j < this.mapValues[i].length; j++) {
                sumOfWin += this.mapValues[i][j];
                if (sumOfWin === 3 || sumOfWin === -3) {
                    return true;
                }
            }
        }
        
        sumOfWin = 0;
        for (i = 0; i < this.mapValues.length; i++) {
            sumOfWin = 0;
            for (j = 0; j < this.mapValues[i].length; j++) {
                sumOfWin += this.mapValues[j][i];
                if (sumOfWin === 3 || sumOfWin === -3) {
                    return true;
                }
            }
        }
        
        sumOfWin = 0;
        for (i = 0; i < this.mapValues.length; i++) {
            sumOfWin = 0;
            for (j = 0; j < this.mapValues[i].length; j++) {
                sumOfWin += this.mapValues[i][j];
                if (sumOfWin === 3 || sumOfWin === -3) {
                    return true;
                }
            }
        }
        return false;

    },

    sayWonPhrase() {
        let figure = this.phase === 1 ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    },
    
    setStatusStopped() {
        this.status = 'stopped';
    },

    // isLineWon(a, b, c) {
    //     let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
    //     return value === 'XXX' || value === '000';
    // },

    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    isStatusPlaying() {
        return this.status === 'playing';
    },

    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === 0;
    },

    renderMap() {
        //Пробегаемся по всем линиям
        for (let row = 0; row < this.config.rows; row++) {
            //Создаём линию
            const tr = document.createElement('tr');
            //Добавляем линию в таблицу
            this.gameElement.appendChild(tr);
            //Пробегаемся по всем колонкам
            for (let col = 0; col < this.config.cols; col++) {
                //Создаем колонку
                let td = document.createElement('td');
                //Добавляем в data-аттрибут с номерами этой ячейки
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                //Добавляем колонку в линию
                tr.appendChild(td);
            }
        }
    }
};


window.addEventListener('load', ticTacToe.init());
