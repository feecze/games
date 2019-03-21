let mover = {
    getNextPoint(direction) {
        let nextPoint = {
            x: player.x,
            y: player.y
        }
        
        //2, 6, 8, 4
        switch (direction) {
            case 2: 
                if (player.y === config.nRows - 2) {
                    nextPoint.y = 0
                    return nextPoint
                }
                nextPoint.y++;
            break;
            case 6:
                if (player.x === config.nColumns - 2) {
                    nextPoint.x = 0
                    return nextPoint
                }
                nextPoint.x++
            break;
            case 8:
                if (player.y === 1) {
                    nextPoint.y = config.nRows - 2
                    return nextPoint
                }
                nextPoint.y--
            break;
            case 4:
                if (player.x === 1) {
                    nextPoint.x = config.nColumns - 2
                    return nextPoint
                }
                nextPoint.x--
            break;
            case 7:
                if (player.y === 1 || player.x === 1) {
                return nextPoint
                }
                nextPoint.x--
                nextPoint.y--
            break;
            case 9:
            if (player.y === 1 || player.x === config.nColumns - 2 ) {
                return nextPoint
            }
                nextPoint.x++
                nextPoint.y--
            break;
            case 3:
            if (player.y === config.nRows - 2 || player.x === config.nColumns - 2) {
                return nextPoint
            }
                nextPoint.x++
                nextPoint.y++
            break;
            case 1:
            if (player.y === config.nRows - 2 || player.x === 1) {
                return nextPoint
            }
                nextPoint.x--
                nextPoint.y++
            break
        }
        return nextPoint;
    }  
};