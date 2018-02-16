let posibilities = {};

function cellValue(cell){
	return parseInt(document.getElementById(cell).value);	
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
		// this.value=this.id;
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

function getPossibilities(cell){
	let poss = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	
	getDependedCells(cells).forEach((x) => {
		if(poss.indexOf(cellValue(x)))
			del (poss[poss.indexOf(cellValue(x))]);
	});

	// posibilities[cell] = 
}

let checkCell = 36;

// console.log(getDependedRowCells(checkCell));
// console.log(getDependedColumnCells(checkCell));
// console.log(getDependedBlockCells(checkCell));

console.log(getDependedCells(checkCell));