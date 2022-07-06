(() => {
  'use strict';
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const quizSet = shuffle([
    { q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
    { q: '2の8乗は？', c: ['256', '225', '360'] },
    { q: '次の内、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML'] },
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return
    }
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }
  // let answer = [...quizSet[currentNum].c];
  // let shuffleAnswerArray = [];
  // function shuffle(answer) {
  //   let ansewrLen = answer.length;
  //   for (let i = ansewrLen; i > 0; i--) {
  //     const random = Math.floor(Math.random() * i);
  //     const answerItem = answer.splice(random, 1);
  //     shuffleAnswerArray.push(answerItem);
  //     console.log(quizSet[currentNum].c);
  //   }
  // }
  // shuffle(answer);
  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    const shuffleedChoices = shuffle([...quizSet[currentNum].c]);
    shuffleedChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li)
        isAnswered = true;
      });
      choices.appendChild(li);
    });
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }
  setQuiz();
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    if (currentNum === quizSet.length - 1) {
      scoreLabel.innerHTML = `Score : ${score}/${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
})()