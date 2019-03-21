/**
 * Обьект отрисовки карты
 * @type {{map: string, render(): void}}
 */
let renderer = {
    map: '',

    render() {
        for(let i = 0; i < config.nRows; i++) {
            for (let j = 0; j < config.nColumns; j++) {
                if(player.x === j && player.y === i) {
                    this.map += 'o';
                }else if (i === 0 || i === config.nRows - 1) {
                    this.map += 'x';
                }else if (j === 0 || j === config.nColumns - 1) {
                    this.map += 'x';
                }else {
                    this.map += ' ';
                }
                
            }
            this.map += '\n';
        }
        console.log(this.map);
    },

    clear() {
        console.clear();
        this.map = '';
    }
};