var angular = require('angular');
angular.module('app').component('timer', {
    template: require('html!TimerView'),
    controller: function($scope, $interval, MineSweeperService) { 
       $scope.countDown = getCounterValue;
        var count = 0;
        var isCounterRunning = false;
        function startTimer() {
            isCounterRunning = true;
            var timer = $interval(function(){
                count++;
                if (MineSweeperService.getGameStatus() !== 'New') {
                    isCounterRunning = false;
                    $interval.cancel(timer);
                }
                
                if (MineSweeperService.getResetCounter()) {
                    count = 0;
                    MineSweeperService.setResetCounter(false);
                }
            }, 1000);
        }
        
        startTimer();
        function getCounterValue(value) {
            if (!isCounterRunning && MineSweeperService.getResetCounter()) {
                count = 0;
                startTimer();
            }
            return count;
        }
    }
});