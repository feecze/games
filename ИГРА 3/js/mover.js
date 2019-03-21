let mover = {
  makeStep() {
    let newPosition = this.getNewPosition(event);

    if(this.arePositionsEqual(player, newPosition)) {
      return;
    }

    if(!this.canPlayerMakeStep(newPosition)) {
      return;
    }

    renderer.clearUserPosition();
    player.changePosition(newPosition);
    renderer.renderUserPosition(player);

  },

  getNewPosition(event) {
    switch (event.key) {
      case "ArrowUp":
        return {x: player.x, y: player.y - 1};
      case "ArrowDown":
        return {x: player.x, y: player.y + 1};
      case "ArrowLeft":
        return {x: player.x - 1, y: player.y};
      case "ArrowRight":
        return {x: player.x + 1, y: player.y};
      default:
        return {x: player.x, y: player.y};

    }
  },

  arePositionsEqual(player, newPosition) {
    let tds = document.querySelectorAll(`[data-obstacle="true"]`);
    //let isObstacle = false;
    for (i = 0; i < tds.length; i++) {
      if(+tds[i].getAttribute('data-x') === newPosition.x && +tds[i].getAttribute('data-y') === newPosition.y) {
        //isObstacle = true;
        return true;
      }
    }
    return player.x === newPosition.x && player.y === newPosition.y;
  },

  canPlayerMakeStep(nextPoint) {
    return renderer.getSquare(nextPoint) !== null;
  },

};