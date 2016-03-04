documentWidth = $(window).width();
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPos(num) {
    return cellSpace + num * (cellSideLength + cellSpace);
}

function getPicture(number) {
    switch (number) {
        case 2:
            return "images/1.png";
            break;
        case 4:
            return "images/5.png";
            break;
        case 8:
            return "images/10.png";
            break;
        case 16:
            return "images/20.png";
            break;
        case 32:
            return "images/50.png";
            break;
        case 64:
            return "images/100.png";
            break;
        case 128:
            return "images/watch.png";
            break;
        case 256:
            return "images/mobile.png";
            break;
        case 512:
            return "images/notebook.png";
            break;
        case 1024:
            return "images/car.png";
            break;
        case 2048:
            return "images/house.png";
            break;
    }

    return "black";
}

function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                return false;
        }

    return true;
}

function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

function canMoveUp( board ){

    for( var i = 1 ; i < 4 ; i ++ )
        for( var j = 0; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j > -1 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var i = 2 ; i > -1 ; i -- )
        for( var j = 0; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

function noBlockVertical(row1, row2, col, board){
    for(var i=row1+1;i<row2;i++)
        if(board[i][col] != 0)
            return false;
    return true;
}

function nomove(board){
    if(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board))
        return false;

    return true;
}
