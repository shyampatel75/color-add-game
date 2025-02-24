const cellColors = {};
const rowColorCounts = {};
const colColorCounts = {};

let selectedColor = '';

// Updated to target color-boxes directly
document.querySelectorAll('.color-box').forEach(function (box) {
    box.addEventListener('click', function () {
        selectedColor = this.getAttribute('data-color');
    });
});

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

function fillBox(event) {
    const td = event.target;

    if (!selectedColor) return;
    const row = td.getAttribute('data-row');
    const col = td.getAttribute('data-col');
    const cellKey = `${row}-${col}`;

    // Check if the cell is already filled with the selected color
    if (cellColors[cellKey] === selectedColor) {
        alert("This box is already filled with the selected color.");
        return;
    }

    rowColorCounts[row] = rowColorCounts[row] || {};
    colColorCounts[col] = colColorCounts[col] || {};

    const rowCount = rowColorCounts[row][selectedColor] || 0;
    const colCount = colColorCounts[col][selectedColor] || 0;

    // Check for color repetition in the row or column
    if (rowCount >= 3) {
        alert("You cannot fill this row with the same color more than 3 times.");
        return;
    }

    if (colCount >= 3) {
        alert("You cannot fill this column with the same color more than 3 times.");
        return;
    }

    // Check adjacent cells for the same color
    const adjacentCells = [
        { row: parseInt(row) - 1, col: parseInt(col) }, 
        { row: parseInt(row) + 1, col: parseInt(col) }, 
        { row: parseInt(row), col: parseInt(col) - 1 }, 
        { row: parseInt(row), col: parseInt(col) + 1 }  
    ];

    for (let adj of adjacentCells) {
        const { row, col } = adj;
        if (row >= 0 && col >= 0 && cellColors[`${row}-${col}`] === selectedColor) {
            alert("You cannot fill a cell next to the same color.");
            return;
        }
    }

    // Check diagonal cells for the same color
    const diagonalCells = [
        { row: parseInt(row) - 1, col: parseInt(col) - 1 }, 
        { row: parseInt(row) - 1, col: parseInt(col) + 1 },
        { row: parseInt(row) + 1, col: parseInt(col) - 1 }, 
        { row: parseInt(row) + 1, col: parseInt(col) + 1 }  
    ];

    for (let diag of diagonalCells) {
        const { row, col } = diag;
        if (row >= 0 && col >= 0 && cellColors[`${row}-${col}`] === selectedColor) {
            alert("You cannot fill a cell diagonally with the same color.");
            return;
        }
    }

    td.style.backgroundColor = selectedColor;
    cellColors[cellKey] = selectedColor;

    rowColorCounts[row][selectedColor] = (rowColorCounts[row][selectedColor] || 0) + 1;
    colColorCounts[col][selectedColor] = (colColorCounts[col][selectedColor] || 0) + 1;
}

function saveToFile() {
    const tableData = [];

    document.querySelectorAll("table tr").forEach((tr, rowIndex) => {
        const row = [];
        tr.querySelectorAll("td").forEach((td, colIndex) => {
            row.push({
                row: rowIndex,
                col: colIndex,
                color: cellColors[`${rowIndex}-${colIndex}`] || null
            });
        });
        tableData.push(row);
    });

    const blob = new Blob([JSON.stringify(tableData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_data.json";
    link.click();

    alert("Table saved!");
}

function loadFromFile() {
    document.getElementById('fileInput').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const tableData = JSON.parse(e.target.result);
        loadTableData(tableData);
    };
    reader.readAsText(file);
}

function loadTableData(tableData) {
    const tableBody = document.getElementById("dynamicTable");
    const table = document.createElement("table");
    tableBody.innerHTML = "";
    tableData.forEach(rowData => {
        const tr = table.insertRow();
        rowData.forEach(cell => {
            const td = tr.insertCell();
            td.setAttribute("data-row", cell.row);
            td.setAttribute("data-col", cell.col);
            td.style.backgroundColor = cell.color || "white";
            if (cell.color) {
                cellColors[`${cell.row}-${cell.col}`] = cell.color;
            }
            td.addEventListener("click", fillBox);
        });
    });
    tableBody.appendChild(table);
}

function clearTable() {
    document.getElementById("dynamicTable").innerHTML = "";
    Object.keys(cellColors).forEach(key => delete cellColors[key]);
}
