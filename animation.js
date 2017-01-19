
// --------------------------------------------------------------------------------------------------------------------
//functions for animations
// --------------------------------------------------------------------------------------------------------------------

//animation for moving the cell
function fnAnimationMove(iFromI, iFromJ, iToI, iToJ) {
	var oCell = $('#number-cell-' + iFromI + "-" + iFromJ);
	oCell.animate({
		top: fnGetPosition(iToI),
		left: fnGetPosition(iToJ)
	}, 200);
}

//animation for the generation of new number 
function fnAnimationGeneration(iPosI, iPosJ,iNum) {
	//create a new cell
	$("#grid").append('<div id="number-cell-' + iPosI + '-' + iPosJ + '" class="number-cell" ></div>');
	var oCell = $('#number-cell-' + iPosI + "-" + iPosJ);
	// var iNb = aMat[iPosI][iPosJ];
	var iNb = iNum;
	//define the styles
	oCell.css('background',fnGetBgColor(iNb));
	oCell.css('color',fnGetTxtColor(iNb));
	oCell.text(iNb);
	//the styles who change during the animation
	oCell.css('width',0);
	oCell.css('height',0);
	oCell.css('top',fnGetPosition(iPosI)+40);
	oCell.css('left',fnGetPosition(iPosJ)+40);
	oCell.css('font-size',fnGetFontSize(aMat[iPosI][iPosJ]));

	oCell.animate({		
		width:'80px',
		height:'80px',
		top:fnGetPosition(iPosI),
		left:fnGetPosition(iPosJ)
	}, 200);
}