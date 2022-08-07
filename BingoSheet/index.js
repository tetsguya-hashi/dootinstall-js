(() => {
  'use strict';
  const tbody = document.querySelector('tbody');
  function createColumn(col) {
    const source = [];
    let column = [];
    const radom = (index) => Math.floor(Math.random() * index);
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(radom(source.length), 1)[0];
    }
    return column;
  }
  function createColumns() {
    const columns = [];
    for (let k = 0; k < 5; k++) {
      columns[k] = createColumn(k);
    }
    columns[2][2] = 'FREE';
    console.table(columns)
    return columns;
  }

  // function createBingo(columns) {
  //   const bingo = [];
  //   for (let row = 0; row < 5; row++) {
  //     bingo[row] = [];
  //     for (let col = 0; col < 5; col++) {
  //       bingo[row][col] = columns[col][row];
  //     }
  //   }
  //   return bingo;
  // }

  function draw(columns) {
    for (let k = 0; k < 5; k++) {
      const tr = document.createElement('tr');
      for (let i = 0; i < 5; i++) {
        const td = document.createElement('td');
        td.textContent = columns[i][k];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
  const columns = createColumns();
  // const bingo = createBingo(columns);
  draw(columns);
})();