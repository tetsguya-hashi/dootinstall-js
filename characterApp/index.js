(() => {
  'use strict';

  const cards = document.getElementById('cards');
  const check = document.getElementById('check');
  const retry = document.getElementById('retry');
  const userName = document.getElementById('user_name');
  const tweet = document.getElementById('tweet');
  userName.focus();

  check.addEventListener('click', () => {
    const msgs = [
      '究極の進化を遂げた',
      '太鼓より蘇った',
      '最も怖れられた'
    ];
    const jobs = [
      { name: '勇者', img: 'hero.gif' },
      { name: '魔法使い', img: 'wizard.gif' },
      { name: '武闘家', img: 'fighter.gif' }
    ];
    const types = [
      { name: 'その炎はすべてを焼き尽くす', img: 'bg-fire' },
      { name: 'その清水ですべてを浄化する', img: 'bg-water' },
      { name: 'その雷撃は万物の怒りを鎮める', img: 'bg-thunder' }
    ];
    let msg;
    let job;
    let type;
    let tweetUrl;
    let resultImg = document.getElementById('result_img');


    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    function setTextContent(id, text) {
      document.getElementById(id).textContent = text;
    }

    if (userName.value === '' || userName.value.length > 10) {
      userName.value = '名無しさん';
    }

    msg = getRandomElement(msgs);
    job = getRandomElement(jobs);
    type = getRandomElement(types);
    tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(
      `${userName.value}さんは、${msg}${job.name}でした。`
    ) + '&hashtags=dotinstall';


    setTextContent('result_name', userName.value);
    setTextContent('result_msg', msg);
    setTextContent('result_job', job.name);
    resultImg.children[0].src = 'img/' + job.img;
    setTextContent('result_type', type.name);
    resultImg.classList.add(`${type.img}`);
    tweet.href = tweetUrl;
    cards.classList.add('move');
  });
  retry.addEventListener('click', () => {
    cards.classList.remove('move');
    userName.value = '';
    userName.focus();

  });
})();