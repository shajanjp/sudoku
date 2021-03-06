let posibilities = {};

function setCellValue(cell, cellValue) {
  document.getElementById(cell).value = cellValue;
}

function isSolved() {
  let solved = true;
  for (let cell = 1; cell < 82; cell++) {
    if (getCellValue(cell) == '') {
 solved = false;
}
  }
  return solved;
}

function getCellValue(cell) {
  if (document.getElementById(cell).value) {
 return parseInt((document.getElementById(cell).value || false));
} else {
 return '';
}
}

function getAllValues() {
  let values = {};
  for (let cell = 1; cell < 82; cell++) {
    values[cell] = getCellValue(cell);
  }
  return values;
}

function randomSudoku() {
  return sudokuTestData[Math.floor(Math.random() * sudokuTestData.length)];
}

function fillData() {
  let dataset = randomSudoku();
  for (let cell = 1; cell < 82; cell++) {
    if (dataset[cell - 1] != 0) {
      setCellValue(cell, dataset[cell - 1]);
      posibilities[cell] = dataset[cell - 1];
    } else if (dataset[cell - 1] == 0) {
 setCellValue(cell, '');
}
  }
}

function getDependedRowCells(cell) {
  let row = $(`#${cell}`).data('row');
  let cells = [];
  $(`.r${row}`).each(function() {
    cells.push(parseInt(this.id));
  });
  return cells;
}

function getDependedColumnCells(cell) {
  let column = $(`#${cell}`).data('column');
  let cells = [];
  $(`.c${column}`).each(function() {
    cells.push(parseInt(this.id));
  });
  return cells;
}

function getDependedBlockCells(cell) {
  let block = $(`#${cell}`).data('block');
  let cells = [];
  $(`.b${block}`).each(function() {
    cells.push(parseInt(this.id));
  });
  return cells;
}

function getDependedCells(cell) {
  let cells = getDependedBlockCells(cell);
  getDependedRowCells(cell).forEach((r) => {
    if (cells.indexOf(r) === -1) {
 cells.push(r);
}
  });

  getDependedColumnCells(cell).forEach((c) => {
    if (cells.indexOf(c) === -1) {
 cells.push(c);
}
  });
  return cells;
}

function wildGuess() {
  for (let cell = 1; cell < 82; cell++) {
    if (posibilities[cell].length == 2) {
      console.log(`fixing first element for ${cell} as ${posibilities[cell][0]}`);
      setCellValue(cell, posibilities[cell][0]);
      posibilities[cell] = [posibilities[cell][0]];
      break;
    }
  }
}

function getPossibilities(cell) {
  let poss = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  getDependedCells(cell).forEach((x) => {
    if (getCellValue(x) != '') {
      if (poss.indexOf(getCellValue(x)) > -1) {
        poss.splice(poss.indexOf(getCellValue(x)), 1);
      }
    }
  });

  if (poss.length == 1) {
 setCellValue(cell, poss[0]);
}

  posibilities[cell] = poss;
  return poss;
}

function updatePossibilites() {
  for (let cell = 1; cell < 82; cell++) {
    if (getCellValue(cell) == '') {
 getPossibilities(cell);
}
  }
}

$('#solve').on('click', function() {
  for (let i = 0; i < 81; i++) {
    if (isSolved()) {
      console.log('solved...');
      break;
    } else {
      console.log('updating possibilities...');
      updatePossibilites();
    }
  }
});

$('#export').on('click', function() {
  let dump = getAllValues();
  console.log('Data Dump', dump);
});

$('#prefill').on('click', function() {
  fillData();
});

$('#iterate').on('click', function() {
  updatePossibilites();
  console.log('posibilities', posibilities);
});

$('#wildguess').on('click', function() {
  wildGuess();
});
