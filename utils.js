// --------------------------------------------------------------------------------------------------------------------
//functions for updating the view
// --------------------------------------------------------------------------------------------------------------------

//update the view
function fnUpdateView(iScore) {
       fnUpdateGrid();
       fnUpdateScore(iScore);
}

//update the view of the grid according to the matrice
function fnUpdateGrid() {
       //remove all the number-cell
       $(".number-cell").remove();

       //set the number-cell by using the matrix
       for (var i = 0; i < 4; i++) {
              for (var j = 0; j < 4; j++) {
                     //create a new cell when the number is not 0
                     if (aMat[i][j] != 0) {
                            $("#grid").append('<div id="number-cell-' + i + '-' + j + '" class="number-cell" ></div>');
                            var oCell = $('#number-cell-' + i + '-' + j);
                            //set the background color
                            oCell.css('background', fnGetBgColor(aMat[i][j]));
                            //set the position                              
                            oCell.css('top', fnGetPosition(i));
                            oCell.css('left', fnGetPosition(j));
                            //set the text color
                            oCell.css('color', fnGetTxtColor(aMat[i][j]));
                            //set the number
                            oCell.text(aMat[i][j]);
                            oCell.css('font-size', fnGetFontSize(aMat[i][j]));
                     }
              }
       }
}
//update the score
function fnUpdateScore(iScore) {
       $("#numberScore").text(iScore);
}

// --------------------------------------------------------------------------------------------------------------------
//functions for determining the style 
// --------------------------------------------------------------------------------------------------------------------

//function to get the color of background
function fnGetBgColor(oNom) {
       switch (oNom) {
              case 2:
                     return "#eee4da";
              case 4:
                     return "#ede0c8";
              case 8:
                     return "#f2b179";
              case 16:
                     return "#f59563";
              case 32:
                     return "#f67c5f";
              case 64:
                     return "#f65e3b";
              case 128:
                     return "#edcf72";
              case 256:
                     return "#edcc61";
              case 512:
                     return "#9c0";
              case 1024:
                     return "#33b5e5";
              case 2048:
                     return "#09c";
              case 4096:
                     return "#a6c";
              case 8192:
                     return "#93c";
              default:
                     return 'purple';
       }
}

//function to get the size of text
function fnGetFontSize(oNom) {
       if (oNom < 100) {
              return '40px';
       } else if (oNom < 1000) {
              return '35px'
       }  else if (oNom < 10000) {
              return '30px'
       }  
       else return '25px';
}

//function to get the color of text
function fnGetTxtColor(oNom) {
       if (oNom <= 4) {
              return 'white';
       } else return 'black';
}

//function to get the position of the cell
//the size of cell is 80px
//the padding is 15px
function fnGetPosition(oIndex) {
       return oIndex * 95 + 15;
}