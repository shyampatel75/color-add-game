function tableCreate() {
    const tabelbody = document.getElementById("dynamicTable"),
      tabel = document.createElement('table');


    tabelbody.innerHTML = '';

    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;


    for (let i = 0; i < rows; i++) {
      const tr = tabel.insertRow();

      for (let j = 0; j < cols; j++) {
        const td = tr.insertCell();

      }
    }


    tabelbody.appendChild(tabel);
  }
  document.querySelectorAll('.colors input').forEach(function (input) {
    input.addEventListener('click', function () {
      var selectedColor = this.getAttribute('data-color');


      document.querySelectorAll('#dynamicTable td').forEach(function (td) {
        td.addEventListener('click', function () {
          this.style.backgroundColor = selectedColor;
        });
       

      });
    });
  });

