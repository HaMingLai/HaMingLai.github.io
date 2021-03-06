var board = new Array();
var hasConflicted = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    prepareForMobile();
    newgame();
});

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://Left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://Up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://Right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://Down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default ://default
            break;
    }
});

document.addEventListener("touchstart",function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
    event.preventDefault();
});

document.addEventListener("touchend",function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax) < 0.2 * documentWidth && Math.abs(deltay) < 0.2 * documentWidth)
        return;

    //x
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            //moveRight
            if (moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //moveLeft
            if (moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
    //y
    else{
        if(deltay > 0){
            //moveDown
            if (moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //moveUp
            if (moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});

function prepareForMobile(){
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }

    $("#grid-container").css("width",gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("height",gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02 * gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02 * cellSideLength);
}

function newgame() {
    //initialization
    init();
    //generate two number
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPos(i));
            gridCell.css("left", getPos(j));
        }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }

    }

    updateBoardView();
    score = 0;
    updateScore(score);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            theNumberCell.append('<img class="picture-cell" id="picture-cell-'+ i + '-' + j +'" />');
            var thePictureCell = $("#picture-cell-" + i + "-" + j);
            thePictureCell.css("width", "100%");
            thePictureCell.css("height", "100%");

            if (board[i][j] == 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPos(i) + cellSideLength/2);
                theNumberCell.css("left", getPos(j) + cellSideLength/2);
            }
            else {
                theNumberCell.css("width", cellSideLength);
                theNumberCell.css("height", cellSideLength);
                theNumberCell.css("top", getPos(i));
                theNumberCell.css("left", getPos(j))
                thePictureCell.attr("src",getPicture(board[i][j]));
            }

            hasConflicted[i][j] = false;
        }

    $(".number-cell").css("line-height",cellSideLength + "px");
    $(".number-cell").css("font-size",0.45 * cellSideLength + "px");

}

function generateOneNumber() {
    if (nospace(board))
        return false;

    //random a position
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0)
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if(times == 50){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
    }
    //random a number
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //add the number to the position
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

function moveLeft() {

    if (!canMoveLeft(board))
        return false;

    //moveLeft
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score)
                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {

    if (!canMoveUp(board))
        return false;

    //moveUp
    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {

    if (!canMoveRight(board))
        return false;

    //moveRight
    for (var i = 0; i < 4; i++)
        for (var j = 2; j > -1; j--) {
            if (board[i][j] != 0) {

                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {

    if (!canMoveDown(board))
        return false;

    //moveDown
    for (var i = 2; i > -1; i--)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function isgameover() {
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("gameover!");
}
