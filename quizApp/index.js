(() => {
  'use strict';
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const quizSet = [
    { q: 'What is A', c: ['A0', 'A1', 'A2'] },
    { q: 'What is B', c: ['B0', 'B1', 'B2'] },
    { q: 'What is C', c: ['C0', 'C1', 'C2'] },
  ];
  let currentNum = 0;

  question.textContent = quizSet[currentNum].q;

  let answer = quizSet[currentNum].c;
  let ansewrLen = answer.length;
  let shuffleAnswerArray = [];
  function shuffle() {
    for (let i = ansewrLen; i > 0; i--) {
      const random = Math.floor(Math.random() * i);
      const answerItem = answer.splice(random, 1);
      shuffleAnswerArray.push(answerItem);
    }
  }
  shuffle();
  shuffleAnswerArray.forEach(choice => {
    const elm = document.createElement('li');
    elm.textContent = choice;
    choices.appendChild(elm);
  });
})()