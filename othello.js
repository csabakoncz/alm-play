"use strict";
var tableC = document.getElementById('table');
var whosTurnC = document.getElementById('whosTurn');
var whiteScoreC = document.getElementById('whiteScore');
var blackScoreC = document.getElementById('blackScore');
var table = [];
for (var i = 0; i < 8; i++) {
    var row = [];
    var rowC = document.createElement('div');
    rowC.classList.add('row');
    tableC.appendChild(rowC);
    table.push(row);
    for (var j = 0; j < 8; j++) {
        var div = document.createElement('div');
        div.classList.add('square');
        var stone = document.createElement('div');
        stone.classList.add('stone');
        div.appendChild(stone);
        rowC.appendChild(div);
        var square = { i: i, j: j, div: stone };
        createOnclick(square);
        row.push(square);
    }
}
var black = 'black';
var white = 'white';
var whosTurn;
nextPlayer();
toggle(table[3][3]);
toggle(table[4][4]);
nextPlayer();
toggle(table[3][4]);
toggle(table[4][3]);
nextPlayer();
var whites = 2;
var blacks = 2;
displayScore();
function nextTurn() {
    return whosTurn == black ? white : black;
}
function nextPlayer() {
    whosTurn = nextTurn();
    whosTurnC.setAttribute('who', whosTurn);
}
function createOnclick(square) {
    var div = square.div;
    div.onclick = function () {
        if (validClick(square)) {
            toggle(square);
            var captured = capture(square, false);
            updateScore(captured);
            displayScore();
            nextPlayer();
        }
    };
}
function displayScore() {
    whiteScoreC.innerText = 'White: ' + whites;
    blackScoreC.innerText = 'Black: ' + blacks;
}
function updateScore(captured) {
    var isBlack = whosTurn == black;
    var currentPlayer = isBlack ? blacks : whites;
    var opponent = isBlack ? whites : blacks;
    currentPlayer += 1;
    currentPlayer += captured;
    opponent -= captured;
    blacks = isBlack ? currentPlayer : opponent;
    whites = isBlack ? opponent : currentPlayer;
}
function validClick(square) {
    if (square.color) {
        return false;
    }
    var captured = capture(square, true);
    return captured > 0;
}
function capture(fromSquare, dryRun) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            count += captureDir(fromSquare, { i: i, j: j }, dryRun);
        }
    }
    return count;
}
function captureDir(fromSquare, dir, dryRun) {
    var captured = captureDir0(fromSquare, dir, true);
    if (captured > 0 && !dryRun) {
        captureDir0(fromSquare, dir, false);
    }
    return captured;
}
function captureDir0(fromSquare, dir, dryRun) {
    var captured = 0;
    var next;
    var ni = fromSquare.i;
    var nj = fromSquare.j;
    while (true) {
        ni += dir.i;
        nj += dir.j;
        var valid = validPos(ni) && validPos(nj);
        if (!valid) {
            return 0;
        }
        var square = table[ni][nj];
        if (!square.color) {
            return 0;
        }
        if (square.color == whosTurn) {
            return captured;
        }
        else {
            captured++;
            if (!dryRun) {
                toggle(square);
            }
        }
    }
}
function toggle(square) {
    square.color = whosTurn;
    square.div.setAttribute('color', whosTurn);
}
function validPos(i) {
    return i >= 0 && i < 8;
}
