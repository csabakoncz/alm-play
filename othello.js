"use strict";
var tableC = document.getElementById('table');
var whosTurnC = document.getElementById('whosTurn');
var whiteScoreC = document.getElementById('whiteScore');
var blackScoreC = document.getElementById('blackScore');
var remainingMovesC = document.getElementById('remainingMoves');
var table = [];
var N = 8;
var query = {};
location.search.substr(1).split('&').forEach(function (p) {
    var parts = p.split('=');
    query[parts[0]] = parts[1];
});
if (query['N']) {
    N = parseInt(query['N']);
}
console.log('Table dimension = ' + N);
for (var i = 0; i < N; i++) {
    var row = [];
    var rowC = document.createElement('div');
    rowC.classList.add('row');
    tableC.appendChild(rowC);
    table.push(row);
    for (var j = 0; j < N; j++) {
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
var n21 = N / 2 - 1;
var n2 = N / 2;
toggle(table[n21][n21]);
toggle(table[n2][n2]);
nextPlayer();
toggle(table[n21][n2]);
toggle(table[n2][n21]);
nextPlayer();
var whites = 2;
var blacks = 2;
var remainingMoves = N * N - 4;
displayScore();
showPossibleMoves();
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
            showPossibleMoves();
        }
    };
}
function showPossibleMoves() {
    var count = 0;
    table.forEach(function (row) {
        row.forEach(function (square) {
            if (validClick(square)) {
                count++;
                square.div.setAttribute('validMove', 'true');
            }
            else {
                square.div.setAttribute('validMove', 'false');
            }
        });
    });
    return count;
}
function displayScore() {
    whiteScoreC.innerText = 'White: ' + whites;
    blackScoreC.innerText = 'Black: ' + blacks;
    remainingMovesC.innerText = 'Remaining moves: ' + remainingMoves;
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
    remainingMoves--;
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
    return i >= 0 && i < N;
}
