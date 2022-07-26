'use strict';
(() => {
  const addBtn = document.getElementById('add-button');
  const input = document.getElementById('add-text');
  const incompleteUl = document.querySelector('.incomplete-area ul')
  const completeUl = document.querySelector('.complete-area ul')

  const onClickAdd = () => {
    let inputValue = input.value;

    const createDiv = document.createElement('div');
    createDiv.classList.add('list-row');

    const createLi = document.createElement('li');
    createLi.textContent = inputValue;

    const createResultBtn = document.createElement('button');
    const createDeleteBtn = document.createElement('button');
    createResultBtn.textContent = '完了';
    createResultBtn.addEventListener('click', function () {
      const deleteTarget = this.parentNode;
      deleteTarget.querySelectorAll('button').forEach(elm => { elm.remove(); });
      const backBtn = document.createElement('button');
      backBtn.textContent = '戻す';
      deleteTarget.appendChild(backBtn);
      completeUl.appendChild(deleteTarget);

      backBtn.addEventListener('click', function () {
        const deleteTarget = this.parentNode;
        this.remove();
        createIncompeteList(deleteTarget);
        deleteTarget.textContent = '';

      });
    });
    createDeleteBtn.textContent = '削除';
    createDeleteBtn.addEventListener('click', function () {
      const deleteTarget = this.parentNode;
      deleteTarget.remove();
    });

    createDiv.appendChild(createLi);
    createDiv.appendChild(createResultBtn);
    createDiv.appendChild(createDeleteBtn);

    incompleteUl.appendChild(createDiv);

    input.value = '';
  }

  const createIncompeteList = (deleteTarget) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('list-row');

    const createLi = document.createElement('li');
    createLi.textContent = deleteTarget.textContent;

    const createResultBtn = document.createElement('button');
    const createDeleteBtn = document.createElement('button');
    createResultBtn.textContent = '完了';
    createResultBtn.addEventListener('click', function () {
      const deleteTarget = this.parentNode;
      deleteTarget.querySelectorAll('button').forEach(elm => { elm.remove(); });
      const backBtn = document.createElement('button');
      backBtn.textContent = '戻す';
      deleteTarget.appendChild(backBtn);
      completeUl.appendChild(deleteTarget);

      backBtn.addEventListener('click', function () {
        const deleteTarget = this.parentNode;
        this.remove();
        createIncompeteList(deleteTarget);
        deleteTarget.textContent = '';
      });
    });
    createDeleteBtn.textContent = '削除';
    createDeleteBtn.addEventListener('click', function () {
      const deleteTarget = this.parentNode;
      deleteTarget.remove();
    });

    createDiv.appendChild(createLi);
    createDiv.appendChild(createResultBtn);
    createDiv.appendChild(createDeleteBtn);

    incompleteUl.appendChild(createDiv);

    input.value = '';
  }

  addBtn.addEventListener('click', () => onClickAdd());
})();