let renderer = {
  render() {
    let table = this.generateTable();
    document.body.appendChild(table);
    this.renderUserPosition(player);
  },

  generateTable() {
      let table = document.createElement('table');
    for(let y = 0; y < config.rowsCount; y++) {
      let tr = document.createElement('tr');
      for(let x = 0; x < config.colsCount; x++) {
        let td = document.createElement('td');
        let isObstacle = Math.random() > 0.8;
        if(isObstacle && player.x !== x && player.y !== y) {
          td.setAttribute('data-obstacle', true);
          td.classList.add('obstacle');
        }
        td.setAttribute('data-x', x);
        td.setAttribute('data-y', y);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  },

  renderUserPosition(player) {
    let square = this.getSquare(player);
    square.classList.add('user');
  },

  getSquare(player) {
    return document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`)
  },

  clearUserPosition() {
    document.querySelector('.user').classList.remove('user')
  }
};