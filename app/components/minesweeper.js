var angular = require('angular');
angular.module('app').component('mineSweeper', {
    template: require('html!MineSweeperView'),
    controller: function(MineSweeperService) {
        let tableRow = MineSweeperService.getGameLevel().value;
        let tableColumn = MineSweeperService.getGameLevel().value;
        
        _this = this;
        _this.fields = getFields();
        _this.unlockImg = require('url!UnlockImage');
        _this.mineImg = require('url!MineImage');
        _this.flagImg = require('url!FlagImage');
        _this.spotAction = spotAction;
        _this.setFlag = setFlag;
        _this.isGameOver = isGameOver;
        _this.setGameStatus = setGameStatus;
        _this.isResetClicked = isResetClicked;
        _this.openedSpots = 0;
        _this.removeFlag = removeFlag;
        _this.totalFlags = 0;
        _this.isFlagLimitReached = isFlagLimitReached;
        var flagCount = 0;
        _this.totalFlags = tableRow;
        console.log(tableRow);

        let gameStatus = false;
        //Get all the fields to sweep
        function getFields() {
            var minefield = {};
            minefield.rows = [];
            tableRow = MineSweeperService.getGameLevel().value;
            tableColumn = MineSweeperService.getGameLevel().value;
            _this.totalFlags = tableRow;
            for(var i = 0; i < tableRow; i++) {
                var row = {};
                row.spots = [];
                
                for(var j = 0; j < tableColumn; j++) {
                    var spot = {};
                    spot.isCovered = true;
                    spot.isFlagCovered = true;
                    row.spots.push(spot);
                }
                
                minefield.rows.push(row);
            }
            placeManyRandomMines(minefield);
            calculateAllNumbers(minefield);
            return minefield;
        }

        //check if new game is clicked
        function isResetClicked() {
            if (MineSweeperService.isGameReset()) {
                MineSweeperService.setGameStatus('New');
                _this.fields = getFields();
                MineSweeperService.setGameReset(false);
                gameStatus = false;
                _this.openedSpots = 0;
                flagCount = 0;
            }

            return MineSweeperService.isGameReset();
        }

        //Open the covered spot
        function spotAction(spot) {
            _this.openedSpots++;
            if (spot.hasOwnProperty('content') && spot.content === 'mine') {
                uncover(spot);
                MineSweeperService.setGameStatus('End');
            } else if (!spot.hasOwnProperty('content')) {
                uncover(spot);
                if (_this.openedSpots >= Math.pow(parseInt(MineSweeperService.getGameLevel().value), 2)) {
                    MineSweeperService.setGameStatus('Won'); 
                }
            } else {
                spot.isCovered = false;
                spot.neverDisplay = true;
                if (_this.openedSpots >= Math.pow(parseInt(MineSweeperService.getGameLevel().value), 2)) {
                    MineSweeperService.setGameStatus('Won'); 
                }
            }
        }

        //open the hidden spot based on the action - Empty or Mine
        function uncover(section) {
            for(var y = 0; y < tableRow; y++) {
                for(var x = 0; x < tableColumn; x++) {
                    var spot = getSpot(_this.fields, y, x);
                    if (!section.hasOwnProperty('content') && !spot.hasOwnProperty('content')) {
                        if (!spot.showFlag && spot.isCovered) {
                            _this.openedSpots++;
                        }
                        spot.isCovered = false;
                        spot.neverDisplay = true;
                    } else if (section.content === 'mine') {
                        if (!spot.showFlag && spot.isCovered) {
                            _this.openedSpots++;
                        }
                        spot.isCovered = false;
                        spot.neverDisplay = true;
                    }
                    
                }
            }
        }

        //Check if mine is opened
        function isGameOver() {
            return gameStatus;
        }

        //Set the game status
        function setGameStatus(status) {
            gameStatus = status;
        }

        //Set flag indicator to true if flag is used on the spot
        function setFlag(spot, $event) {
            spot.showFlag = true;
            spot.neverDisplay = true;
            spot.isCovered = false;
            flagCount++;
            _this.openedSpots++;
            if (_this.openedSpots >= Math.pow(parseInt(MineSweeperService.getGameLevel().value), 2)) {
                MineSweeperService.setGameStatus('Won'); 
            }
            $event.stopPropagation();
        }

        function removeFlag(spot, $event) {
            spot.showFlag = false;
            spot.neverDisplay = false;
            spot.isCovered = true;
            _this.openedSpots--;
            flagCount--
            $event.stopPropagation();
        }

        function isFlagLimitReached() {
            console.log(_this.totalFlags)
            return _this.totalFlags === flagCount;
        }

        //Place mines on randon spots
        function placeManyRandomMines(minefield) {
            for(var i = 0; i < tableRow + 1; i++) {
                placeRandomMine(minefield);
            }
        }
        
        //Place mine on selected spot
        function placeRandomMine(minefield) {
            var row = Math.round(Math.random() * (tableRow - 1));
            var column = Math.round(Math.random() * (tableColumn - 1));
            var spot = getSpot(minefield, row, column);
            spot.content = "mine";
        }

        //returns the spot value
        function getSpot(minefield, row, column) {
            return minefield.rows[row].spots[column];
        }

        //Calculate number of mines surrounded
        function calculateAllNumbers(minefield) {
            for(var y = 0; y < tableRow; y++) {
                for(var x = 0; x < tableColumn; x++) {
                    calculateNumber(minefield, x, y);
                }
            }
        }

         //Calculate number of mines surrounded for a spot
        function calculateNumber(minefield, row, column) {
            var thisSpot = getSpot(minefield, row, column);

            // if this spot contains a mine then we can't place a number here
            if (thisSpot.content == "mine") {
                return;
            }

            var mineCount = 0;

            // check row above if this is not the first row
            if (row > 0) {
            // check column to the left if this is not the first column
                if(column > 0) {
                    // get the spot above and to the left
                    var spot = getSpot(minefield, row - 1, column - 1);
                    if(spot.content == "mine") {
                        mineCount++;
                    }
                }

                // get the spot right above
                var spot = getSpot(minefield, row - 1, column);
                if (spot.content == "mine") {
                    mineCount++;
                }

                // check column to the right if this is not the last column
                if (column < tableColumn - 1) {
                // get the spot above and to the right
                    var spot = getSpot(minefield, row - 1, column + 1);
                    if(spot.content == "mine") {
                        mineCount++;
                    }
                }
            }

            // check column to the left if this is not the first column
            if (column > 0) {
                // get the spot to the left
                var spot = getSpot(minefield, row, column - 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }

            // check column to the right if this is not the last column
            if (column < tableColumn - 1) {
            // get the spot to the right
                var spot = getSpot(minefield, row, column + 1);
                if(spot.content == "mine") {
                    mineCount++;
                }
            }

            // check row below if this is not the last row
            if (row < tableRow - 1) {
            // check column to the left if this is not the first column
                if(column > 0) {
                    // get the spot below and to the left
                    var spot = getSpot(minefield, row + 1, column - 1);
                    if(spot.content == "mine") {
                        mineCount++;
                    }
                }

            // get the spot right below
            var spot = getSpot(minefield, row + 1, column);
                if(spot.content == "mine") {
                    mineCount++;
                }

                // check column to the right if this is not the last column
                if(column < tableColumn - 1) {
                // get the spot below and to the right
                    var spot = getSpot(minefield, row + 1, column + 1);
                    if(spot.content == "mine") {
                        mineCount++;
                    }
                }
            }

            if(mineCount > 0) {
                thisSpot.content = mineCount;
            }

        }
    }
});