function cellValue(cell){
		return document.getElementById(cell).value;	
}

function getDependedRowCells(cell){
	let row = $(`#${cell}`).data('row');
	let cells = $(`.${row}`).map(c => {
		return c;
	})
	console.log('cellls', cells);
}

function getDependedColumnCells(cell){
	switch(cell) {
		case 1: 
		case 10:
		case 19:
		case 28:
		case 37:
		case 46:
		case 55:
		case 64:
		case 73:
			return [1, 10, 19, 28, 37, 46, 55, 64, 73];
			break;

		case 2: 
		case 11:
		case 20:
		case 29:
		case 38:
		case 47:
		case 56:
		case 65:
		case 74:
			return [2, 11, 20, 29, 38, 47, 56, 65, 74];
			break;

		case 3: 
		case 12:
		case 21:
		case 30:
		case 39:
		case 48:
		case 57:
		case 66:
		case 75:
			return [3, 12, 21, 30, 39, 48, 57, 66, 75];
			break;

		case 4: 
		case 13:
		case 22:
		case 31:
		case 40:
		case 49:
		case 58:
		case 67:
		case 76:
			return [4, 13, 22, 31, 40, 49, 58, 67, 76];
			break;

		case 5: 
		case 14:
		case 23:
		case 32:
		case 41:
		case 50:
		case 59:
		case 68:
		case 77:
			return [5, 14, 23, 32, 41, 50, 59, 68, 77];
			break;

		case 6: 
		case 15:
		case 24:
		case 33:
		case 42:
		case 51:
		case 60:
		case 69:
		case 78:
			return [6, 15, 24, 33, 42, 51, 60, 69, 78];
			break;

		case 7: 
		case 16:
		case 25:
		case 34:
		case 43:
		case 52:
		case 61:
		case 70:
		case 79:
			return [7, 16, 25, 34, 43, 52, 61, 70, 79];
			break;

		case 8: 
		case 17:
		case 26:
		case 35:
		case 44:
		case 53:
		case 62:
		case 71:
		case 80:
			return [8, 17, 26, 35, 44, 53, 62, 71, 80];
			break;

		case 9: 
		case 18:
		case 27:
		case 36:
		case 45:
		case 54:
		case 63:
		case 72:
		case 81:
			return [9, 18, 27, 36, 45, 54, 63, 72, 81];
			break;

	}
}


function getDependedBlockCells(cell){
	
}

function getDependedCells(cell){

}

function findPossibilities(cell){

}

console.log(getDependedRowCells(45));
console.log(getDependedColumnCells(45));