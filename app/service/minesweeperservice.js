var angular = require('angular');
angular.module('app').service('MineSweeperService', function () {
    var _this = this;
    
    _this.getGameLevels = getGameLevels;
    _this.setGameLevel = setGameLevel;
    _this.setGameReset = setGameReset;
    _this.isGameReset = isGameReset;
    _this.getGameLevel = getGameLevel;
    _this.getGameStatus = getGameStatus;
    _this.setGameStatus = setGameStatus;
    _this.getResetCounter = getResetCounter;
    _this.setResetCounter = setResetCounter

    let status = "New";
    const levels = [{
        id: 1,
        label: 'Easy',
        value: 3
      }, {
        id: 2,
        label: 'Medium',
        value: 6
      },
      {
        id: 3,
        label: 'Hard',
        value: 9
      }
    ];
    
    let reset = false;
    let resetCounter = false;
    let gameLevel = levels[2];
    
    function getGameLevels() {
        return levels;
    }

    function getGameLevel() {
        return gameLevel;
    }

    function setGameLevel(level) {
        gameLevel = level;
    }

    function setGameReset(status) {
        reset = status;
    }

    function isGameReset() {
        return reset;
    }

    function setGameStatus(action) {
        status = action;
    }

    function getGameStatus() {
        return status;
    }

    function getResetCounter() {
        return resetCounter;
    }

    function setResetCounter(counter) {
        resetCounter = counter;
    }

    return _this;

});
