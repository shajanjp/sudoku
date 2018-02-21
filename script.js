let posibilities = {};
let in_cells = {};
let sudokuDataSet = []; 
let is_finished = 0;
let snapshot = [];

sudokuDataSet[0] = { 1: 9, 3: 3, 9: 8, 11: 5, 17: 1, 20: 6, 22: 2, 26: 9, 31: 1, 32: 6, 33: 4, 34: 5, 36: 2, 41: 3, 46: 6, 48: 1, 49: 5, 50: 8, 51: 7, 56: 4, 60: 6, 62: 8, 65: 8, 71: 2, 73: 2, 79: 3, 81: 7 };
sudokuDataSet[1] = { 4: 9, 12: 7, 14: 6, 16: 5, 21: 3, 22: 5, 26: 7, 27: 9, 28: 4, 30: 5, 33: 9, 36: 1, 37: 8, 45: 7, 46: 1, 49: 6, 52: 9, 54: 8, 55: 6, 56: 4, 60: 8, 61: 7, 66: 9, 68: 1, 70: 2, 78: 7 };
sudokuDataSet[2] = { 2: 6, 5: 8, 8: 3, 19: 4, 22: 3, 24: 2, 26: 8, 28: 5, 29: 9, 31: 7, 34: 4, 38: 4, 44: 7, 48: 2, 51: 5, 53: 1, 54: 9, 56: 8, 58: 4, 60: 3, 63: 6, 67: 5, 74: 3, 77: 6, 79: 2 };

function setCellValue(cell, cellValue){
	document.getElementById(cell).value = cellValue;
}

function getCellValue(cell){
	if (document.getElementById(cell).value)
		return parseInt((document.getElementById(cell).value || false));	
	else
		return "";
}

function getAllValues(){
	let values = {}
	for(var cell=1; cell<82; cell++){
		values[cell] = getCellValue(cell); 
	}
	return values;
}

function setAllValues(dataset){
	for(var cell=1; cell<82; cell++){
		if(dataset[cell])
			setCellValue(cell, dataset[cell]);
		posibilities[cell] = [dataset[cell]];
	}
}

function getDependedRowCells(cell){
	let row = $(`#${cell}`).data('row');
	let cells = [];
	$(`.r${row}`).each(function() {
		cells.push(parseInt(this.id));
		// this.value=this.id;
	});
	return cells;
}

function getDependedColumnCells(cell){
	let column = $(`#${cell}`).data('column');
	let cells = [];
	$(`.c${column}`).each(function() {
		cells.push(parseInt(this.id));
	});
	return cells;
}


function getDependedBlockCells(cell){
	let block = $(`#${cell}`).data('block');
	let cells = [];
	$(`.b${block}`).each(function() {
		cells.push(parseInt(this.id));
		// this.value=this.id;
	});
	return cells;	
}

function getDependedCells(cell){
	let cells = getDependedBlockCells(cell);
	getDependedRowCells(cell).forEach((r) => {
		if(cells.indexOf(r) === -1)
			cells.push(r);
	});	

	getDependedColumnCells(cell).forEach((c) => {
		if(cells.indexOf(c) === -1)
			cells.push(c);
	});	
	return cells;
}

function wildGuess(){
	for(var cell=1; cell<82; cell++){
		if(posibilities[cell].length == 2){
			console.log(`fixing first element for ${cell} as ${posibilities[cell][0]}`);
			setCellValue(cell, posibilities[cell][0]);
			posibilities[cell] = [posibilities[cell][0]];
			break;
		}
	}
}

function getPossibilities(cell){
	let poss = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	getDependedCells(cell).forEach((x) => {
		if(getCellValue(x) != "") {
			if(poss.indexOf(getCellValue(x)) > -1) {
				poss.splice(poss.indexOf(getCellValue(x)), 1);
			}
		}
	});

	if (poss.length == 1)
		setCellValue(cell, poss[0]);

	posibilities[cell] = poss;
	return poss;
}

function updatePossibilites(){
	for(var cell=1; cell<82; cell++){
		if(getCellValue(cell) == "")
			getPossibilities(cell);
	}
}

function updateLoop(){
	updatePossibilites();
	console.log('posibilities', posibilities);
	setTimeout(function(){ updateLoop(); }, 0);
}

$('#solve').on('click', function(){
	updateLoop();
});

$('#export').on('click', function(){
	alert("export");
	let dump = getAllValues();
	console.log('data dump', dump);
});

$('#prefill').on('click', function(){
	setAllValues(sudokuDataSet[0]);
});

$('#iterate').on('click', function(){
	updatePossibilites();
	console.log('posibilities', posibilities);
});

$('#wildguess').on('click', function(){
	wildGuess();
});