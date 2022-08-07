(() => {
  'use strict';

  const ths = document.getElementsByTagName('th');
  let sortOder = 1;//1:昇順、2:降順

  function rebuildTbody(rows) {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (let i = 0; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
    }
  }
  function updateClassName(th) {
    for (let k = 0; k < ths.length; k++) {
      ths[k].className = '';
    }
    th.className = sortOder === 1 ? 'asc' : 'desc';
  }
  function conpare(a, b, col, type) {
    let _a = a.children[col].textContent;
    let _b = b.children[col].textContent;
    if (type === 'number') {
      _a = _a * 1;
      _b = _b * 1;
    } else if (type === 'string') {
      _a = _a.toLowerCase();
      _b = _b.toLowerCase();
    }
    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  }
  function sortRows(th) {
    const rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));
    let col = th.cellIndex;
    let type = th.dataset.type;
    rows.sort(function (a, b) {
      return conpare(a, b, col, type) * sortOder;
    });
    return rows;
  }
  function setUp() {
    let i;
    for (i = 0; i < ths.length; i++) {
      ths[i].addEventListener('click', function () {
        let rows;
        rows = sortRows(this);
        rebuildTbody(rows);
        updateClassName(this);
        sortOder *= -1;
      });
    }
  }
  setUp();
})();