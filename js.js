$(document).ready(function() {
	
	var nextPlayer = 1;
	var playerNames = [ "red", "yellow" ];
	var playerClasses = [ "cell_red", "cell_yellow" ];
	var columns = [ // where 0 denotes an empty cell, 1 & 2 a player piece
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
	var divs = [ [], [], [], [], [], [], [] ];
	var numColumns = columns.length;
	var numRows = columns[0].length;
	
	var createElements = function() {
		for (var rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) { 
			for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
				var div = $('<div />');
				div.addClass("cell");
				div.attr("_columnIndex", columnIndex);
				div.click(function(event) { nextMove($(event.target).attr("_columnIndex")); });
				divs[columnIndex][rowIndex] = div;
				$("#grid").append(div);
			}
		}
	};
	
	var reset = function() {
		for (var rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) { 
			for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
				divs[columnIndex][rowIndex].attr("class", "cell");
				columns[columnIndex][rowIndex] = 0;
				nextPlayer = 1;
			}	
		}
	};
	
	var nextMove = function(columnIndex) {
		for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
			if (columns[columnIndex][rowIndex] == 0) {
				columns[columnIndex][rowIndex] = nextPlayer;
				divs[columnIndex][rowIndex].addClass(playerClasses[nextPlayer - 1]);
				if (checkForWinner() == true) {
					setTimeout(function() {
						alert(playerNames[nextPlayer - 1] + " won!");
						reset();
					}, 0);
					return;
				};
				switchPlayer();
				return;
			}
		}
		alert("you can't go there");
	};
	
	var switchPlayer = function() {
		nextPlayer = (nextPlayer == 1) ? 2 : 1;
	};
	
	var checkForWinnerAtPositionWithSlope = function(x, y, xinc, yinc) {
		var player = columns[x][y];
		for (var i = 1; i < 4; i++) {
			var cell = columns[x + i * xinc][y + i * yinc];
			if (player != cell || cell == 0) {
				return false;
			}
			player = cell;
		}
		return true;
	};
	
	var checkForWinner = function() {
		var directions = [ [0, 1], [1, 0], [1, 1], [1, -1] ];
		for (var d = 0; d < directions.length; d++) {
			var xinc = directions[d][0], yinc = directions[d][1];
			for (var x = 0; x < numColumns - (xinc == 1 ? 3 : 0); x++) {
				for (var y = (yinc == -1 ? 3 : 0); y < numRows - (yinc == 1 ? 3 : 0); y++) {
					if (checkForWinnerAtPositionWithSlope(x, y, xinc, yinc)) {
						return true;
					}
				}
			}
		}
		return false;
	};
	
	createElements();
	
});
