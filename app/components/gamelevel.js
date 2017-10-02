var angular = require('angular');
angular.module('app').component('gameLevel', {
    template: require('html!GameLevelView'),
    controller: function(MineSweeperService) { 
        _this = this;
        _this.resetGame = resetGame;
        _this.gameLevels = MineSweeperService.getGameLevels();
        _this.setGameLevel = setGameLevel;
        function resetGame() {
            MineSweeperService.setGameReset(true);
            MineSweeperService.setResetCounter(true);
        } 

        function gameLevel() {
            MineSweeperService.getGameLevel();
        }

        function setGameLevel(level) {
            MineSweeperService.setGameLevel(level);
        }
    }
});