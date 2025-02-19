
const cellColors = {}; 
const rowColorCounts = {}; 
const colColorCounts = {}; 

function tableCreate() {
    const tableBody = document.getElementById("dynamicTable"),
        table = document.createElement('table');
    tableBody.innerHTML = '';
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    for (let i = 0; i < rows; i++) {
        const tr = table.insertRow();
        for (let j = 0; j < cols; j++) {
            const td = tr.insertCell();
            td.setAttribute('data-row', i);
            td.setAttribute('data-col', j);
            td.addEventListener('click', fillBox); 
        }
    }
    tableBody.appendChild(table);
}


let selectedColor = '';
document.querySelectorAll('.colors input').forEach(function (input) {
    input.addEventListener('click', function () {
        selectedColor = this.getAttribute('data-color');
    });
});
function fillBox(event) {
const td = event.target;

if (!selectedColor) return; 
const row = td.getAttribute('data-row');
const col = td.getAttribute('data-col');
const cellKey = `${row}-${col}`;
console.log(cellKey);

if (cellColors[cellKey] === selectedColor) {

alert("This box is already filled with the selected color.");
return; 
}


rowColorCounts[row] = rowColorCounts[row] || {};
colColorCounts[col] = colColorCounts[col] || {};

const rowCount = rowColorCounts[row][selectedColor] || 0;
const colCount = colColorCounts[col][selectedColor] || 0;

if (rowCount >= 3) {
alert("you cont faill row 4 time some color.");
return; 
}

if (colCount >= 3) {
alert(".yo cont faill col 4 timcolore ");
return; 
}


const adjacentCells = [
{ row: parseInt(row) - 1, col: parseInt(col) }, 
{ row: parseInt(row) + 1, col: parseInt(col) }, 
{ row: parseInt(row), col: parseInt(col) - 1 }, 
{ row: parseInt(row), col: parseInt(col) + 1 }  
];
console.log(adjacentCells);

for (let adj of adjacentCells) {
const { row, col } = adj;
console.log(row + '=' +col);

if (row >= 0 && col >= 0 && cellColors[`${row}-${col}`] === selectedColor) {
    alert("you cont faill this sid color.");
    return; 
}
}

const diagonalCells = [
{ row: parseInt(row) - 1, col: parseInt(col) - 1 }, 
{ row: parseInt(row) - 1, col: parseInt(col) + 1 },
{ row: parseInt(row) + 1, col: parseInt(col) - 1 }, 
{ row: parseInt(row) + 1, col: parseInt(col) + 1 }  
];

for (let diag of diagonalCells) {
const { row, col } = diag;
if (row >= 0 && col >= 0 && cellColors[`${row}-${col}`] === selectedColor) {
    alert("you cont faill this side color");
    return; 
}
}


td.style.backgroundColor = selectedColor;
cellColors[cellKey] = selectedColor;


rowColorCounts[row][selectedColor] = (rowColorCounts[row][selectedColor] || 0) + 1;
colColorCounts[col][selectedColor] = (colColorCounts[col][selectedColor] || 0) + 1;
}

