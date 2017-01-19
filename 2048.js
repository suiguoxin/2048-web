// --------------------------------------------------------------------------------------------------------------------
//definition of the global variables
// --------------------------------------------------------------------------------------------------------------------

//the matrice to store the numbers
var aMat = new Array();
//the matrice to know if there is already a fusion in the cell
var aFlagMixed = new Array();
//the score
var iScore = 0;

// --------------------------------------------------------------------------------------------------------------------
//the main function
// --------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
  fnNewGame();

  // the function of the button new game
  $("#btnNewGame").click(function() {
    fnNewGame();
  });

});

function fnNewGame() {
  iScore = 0;
  //initialisation of the array
  for (var i = 0; i < 4; i++) {
    aMat[i] = new Array();
    for (var j = 0; j < 4; j++) {
      aMat[i][j] = 0;
    }
    aFlagMixed[i] = new Array();
  }
  //generate two numbers
  fnGenerateCell();
  fnGenerateCell();

  //test code
  // aMat[0] = [2, 2, 4, 0];
  // aMat[1] = [0, 2, 0, 4];
  // aMat[2] = [8, 8, 16, 16];
  // aMat[3] = [2, 0, 2, 4];
  //test code
  // aMat[0] = [2, 4, 8, 4];
  // aMat[1] = [4, 2, 8, 4];
  // aMat[2] = [8, 2, 4, 16];
  // aMat[3] = [2, 4, 8, 2];

  // test code
  // aMat[0] = [2, 4, 8, 128];
  // aMat[1] = [0, 0, 16342, 256];
  // aMat[2] = [8, 2048, 4096, 16];
  // aMat[3] = [2, 8192, 2048, 2048];

  fnUpdateGrid();
  fnUpdateScore(iScore);
}

// --------------------------------------------------------------------------------------------------------------------
//set the functions for key up, right, down, left
// --------------------------------------------------------------------------------------------------------------------

$(document).keydown(function(ev) {
  var oEvent = ev || event;
  oEvent.preventDefault();
  switch (oEvent.keyCode||oEvent.which) {
    case 37:
    case 87: // move left
      if (!fnBlockHorizontal()) {
        fnMoveLeft();
        setTimeout(fnUpdateGrid, 200);
        setTimeout(fnUpdateScore(iScore), 200);
        setTimeout(fnGenerateCell, 200);
        setTimeout(fnIsGameOver, 400);
      } 
      break;
    case 38:
    case 65: // move up
      if (!fnBlockVertical()) {
        fnMoveUp();
        setTimeout(fnUpdateGrid, 200);
        setTimeout(fnUpdateScore(iScore), 200);
        setTimeout(fnGenerateCell, 200);
        setTimeout(fnIsGameOver, 400);
      } 
      break;
    case 39:
    case 68: // move right
      if (!fnBlockHorizontal()) {
        fnMoveRight();
        setTimeout(fnUpdateGrid, 200);
        setTimeout(fnUpdateScore(iScore), 200);
        setTimeout(fnGenerateCell, 200);
        setTimeout(fnIsGameOver, 400);
      } 
      break;
    case 40:
    case 83: // move down
      if (!fnBlockVertical()) {
        fnMoveDown();
        setTimeout(fnUpdateGrid, 200);
        setTimeout(fnUpdateScore(iScore), 200);
        setTimeout(fnGenerateCell, 200);
        setTimeout(fnIsGameOver, 400);
      } 
      break;
    default: // default
  }
});

//function to gerenate a new cell
//the number could be 2 or 4
function fnGenerateCell() {
  //choose the position
  var iRanI, iRanJ;
  do {
    iRanI = Math.floor(Math.random() * 4);
    iRanJ = Math.floor(Math.random() * 4);
  } while (aMat[iRanI][iRanJ] != 0);
  //set the number to 2 or 4
  aMat[iRanI][iRanJ] = Math.random() < 0.5 ? 2 : 4;

  fnAnimationGeneration(iRanI, iRanJ, aMat[iRanI][iRanJ]);
}

// --------------------------------------------------------------------------------------------------------------------
//functions for moving 
// --------------------------------------------------------------------------------------------------------------------

//function to determine if the game is over
function fnIsGameOver() {
  if (fnBlockHorizontal() && fnBlockVertical()) {
    alert('Game Over !');
    fnNewGame();
    return true;
  } else
    return false;
}
//function to determine if the grid is blocked horzontally
function fnBlockHorizontal() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (aMat[i][j] == 0) return false;
    }
    for (var k = 0; k < 3; k++) {
      if (aMat[i][k] == aMat[i][k + 1]) return false;
    }
  }
  return true;
}
//function to determine if the grid is blocked vertically 
function fnBlockVertical() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (aMat[i][j] == 0) return false;
    }
    for (var k = 0; k < 3; k++) {
      if (aMat[k][i] == aMat[k + 1][i]) return false;
    }
  }
  return true;
}

//function to call before moving
//initialisation of the matrice aFlagMixed
function fnMoveInit() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      aFlagMixed[i][j] = false;
    }
  }
}

//function move left
function fnMoveLeft() {
  fnMoveInit();
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (aMat[i][j] == 0) continue;
      //the position of the target
      var iTarget = j;
      //move over the 0
      while (iTarget > 0 && aMat[i][iTarget - 1] == 0) iTarget--;
      //if there are still cells on the left and when this is a fusion 
      //the cell moves and the number change
      if ((iTarget > 0) && (aMat[i][iTarget - 1] == aMat[i][j]) && (!aFlagMixed[i][iTarget - 1])) {
        //change the matrice;                           
        iTarget--;
        aMat[i][iTarget] *= 2;
        aMat[i][j] = 0;
        //change the score
        iScore += aMat[i][iTarget];

        aFlagMixed[i][iTarget] = true;
        fnAnimationMove(i, j, i, iTarget);
      }
      //if there aren't any more cells on the left or when there is no fusion 
      else {
        //the cell doesn't move
        if (iTarget == j) continue;
        else {
          //the cell moves
          aMat[i][iTarget] = aMat[i][j];
          aMat[i][j] = 0;
          fnAnimationMove(i, j, i, iTarget);
        }
      }
    }
  }
}

//function move right
function fnMoveRight() {
  fnMoveInit();
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (aMat[i][j] == 0) continue;
      //the position of the target
      var iTarget = j;
      //move over the 0
      while (iTarget < 3 && aMat[i][iTarget + 1] == 0) iTarget++;
      //if there are still cells on the right and when this is a fusion 
      //the cell moves and the number change
      if ((iTarget < 3) && (aMat[i][iTarget + 1] == aMat[i][j]) && (!aFlagMixed[i][iTarget + 1])) {
        //change the matrice; 
        iTarget++;
        aMat[i][iTarget] *= 2;
        aMat[i][j] = 0;
        //change the score
        iScore += aMat[i][iTarget];

        aFlagMixed[i][iTarget] = true;
        fnAnimationMove(i, j, i, iTarget);
      }
      //if there aren't any more cells on the right or when there is no fusion 
      else {
        //the cell doesn't move
        if (iTarget == j) continue;
        else {
          //the cell moves
          aMat[i][iTarget] = aMat[i][j];
          aMat[i][j] = 0;
          fnAnimationMove(i, j, i, iTarget);
        }
      }
    }
  }
}

//function move up
function fnMoveUp() {
  fnMoveInit();
  for (var j = 0; j < 4; j++) {
    for (var i = 1; i < 4; i++) {
      if (aMat[i][j] == 0) continue;
      //the position of the target
      var iTarget = i;
      //move over the 0
      while (iTarget > 0 && aMat[iTarget - 1][j] == 0) iTarget--;
      //if there are still cells on the top and when this is a fusion 
      //the cell moves and the number change
      if ((iTarget > 0) && (aMat[iTarget - 1][j] == aMat[i][j]) && (!aFlagMixed[iTarget - 1][j])) {
        //change the matrice; 
        iTarget--;
        aMat[iTarget][j] *= 2;
        aMat[i][j] = 0;
        //change the score
        iScore += aMat[iTarget][j];

        aFlagMixed[iTarget][j] = true;
        fnAnimationMove(i, j, iTarget, j);
      }
      //if there aren't any more cells on the top or when there is no fusion 
      else {
        //the cell doesn't move
        if (iTarget == i) continue;
        else {
          //the cell moves
          aMat[iTarget][j] = aMat[i][j];
          aMat[i][j] = 0;
          fnAnimationMove(i, j, iTarget, j);
        }
      }
    }
  }
}

//function move down
function fnMoveDown() {
  fnMoveInit();
  for (var j = 0; j < 4; j++) {
    for (var i = 2; i >= 0; i--) {
      if (aMat[i][j] == 0) continue;
      //the position of the target
      var iTarget = i;
      //move over the 0
      while (iTarget < 3 && aMat[iTarget + 1][j] == 0) iTarget++;
      //if there are still cells on the bottom and when this is a fusion 
      //the cell moves and the number change
      if ((iTarget < 3) && (aMat[iTarget + 1][j] == aMat[i][j]) && (!aFlagMixed[iTarget + 1][j])) {
        //change the matrice;
        iTarget++;
        aMat[iTarget][j] *= 2;
        aMat[i][j] = 0;
        //change the score
        iScore += aMat[iTarget][j];

        aFlagMixed[iTarget][j] = true;
        fnAnimationMove(i, j, iTarget, j);
      }
      //if there aren't any more cells on the bottom or when there is no fusion 
      else {
        //the cell doesn't move
        if (iTarget == i) continue;
        else {
          //the cell moves
          aMat[iTarget][j] = aMat[i][j];
          aMat[i][j] = 0;
          fnAnimationMove(i, j, iTarget, j);
        }
      }
    }
  }
}