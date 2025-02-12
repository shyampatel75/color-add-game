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
    }
  }
  
  tableBody.appendChild(table);
}

let rowColorCount = {}; 
let colColorCount = {}; //ob
let selectedColor = ''; 

document.querySelectorAll('.colors input').forEach(function (input) {
  input.addEventListener('click', function () {
    selectedColor = this.getAttribute('data-color'); 
  });
});

document.getElementById('dynamicTable').addEventListener('click', function (event) {
  const td = event.target;
  console.log(event);
  console.log("td");  
  
  if (td.tagName === 'TD' && selectedColor) {
    const rowIndex = td.getAttribute('data-row');
    const colIndex = td.getAttribute('data-col');
    
    const rowKey = rowIndex + selectedColor;
    const colKey = colIndex + selectedColor;
    

    rowColorCount[rowKey] = rowColorCount[rowKey] || 0;
    colColorCount[colKey] = colColorCount[colKey] || 0;

    console.log(colColorCount[colKey]);
    
    if (rowColorCount[rowKey] < 3 && colColorCount[colKey] < 3) {
      td.style.backgroundColor = selectedColor;
      rowColorCount[rowKey]++; 
      colColorCount[colKey]++; 
    } else {
      
      alert("4 box sem color not fell");
    }
  }
});
