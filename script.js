let posibilities = {};
let in_cells = {};
let sudokuDataSet = []; 
let is_finished = 0;
let cleanState = ["000000000000000000000000000000000000000000000000000000000000000000000000000000000"];

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