function showNumberWithAnimation(i,j,randNumber){
    var numberCell = $("#number-cell-"+i+"-"+j);

    numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
    numberCell.css("color",getNumberColor(board[i][j]));
    numberCell.text(board[i][j]);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPos(i),
        left: getPos(j)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPos(tox),
        left:getPos(toy)
    },200);
}

function updateScore(score){
    $("#score").text(score);
}
