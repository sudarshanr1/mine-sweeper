var angular = require('angular');
angular.module('app', []).component('mainComponent', {
    template: require('html!MainView'),
    controller: function(MineSweeperService) {
         _this = this;
         _this.gameObj = getGameObj;
         function getGameObj() {
            let game = {};
            if (MineSweeperService.getGameStatus() === 'New') {
                game = {};
                game.status = MineSweeperService.getGameStatus();
                game.text = "Mine Sweeper Game";
                game.class = ""
            } else if (MineSweeperService.getGameStatus() === 'End') {
                game = {};
                game.status = MineSweeperService.getGameStatus();
                game.text = "Sorry, that is a mine. Please try again.";
                game.class = "lost"
            } else if (MineSweeperService.getGameStatus() === 'Won') {
                game = {};
                game.status = MineSweeperService.getGameStatus();
                game.class = "won"
                game.text = "Hurray, you made it. You can try again if you wish.";
            }

            return game;
         }
    }
});
