(() => {
  'use strict;'
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const todayBtn = document.getElementById('today');
  const title = document.getElementById('title');
  const tBody = document.getElementById('tbody');

  function getClenderHead() {
    const dates = [];
    let d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();
    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true
      });
    }
    return dates;
  }
  function getClenderFoot() {
    const dates = [];
    let lastDay = new Date(year, month + 1, 0).getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true
      });
    }
    return dates;
  }
  function getClenderBody() {
    const dates = [];//date:日付、day:曜日
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    return dates;
  }
  function clearCalender() {
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  }
  function renderTitle() {
    title.textContent = `${year} / ${month + 1}`;
  }
  function renderWeeks() {
    const dates = [
      ...getClenderHead(),
      ...getClenderBody(),
      ...getClenderFoot()
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        (td.textContent == day && month === todayMonth && year === todayYear) ? date.isToday = true : '';
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      tBody.appendChild(tr)
    });
  }
  function addToday() {

  }
  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }
  prevBtn.addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalender();
  });
  nextBtn.addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalender();
  });
  todayBtn.addEventListener('click', () => {
    year = todayYear;
    month = todayMonth;
    createCalender();
  })
  createCalender();
})();