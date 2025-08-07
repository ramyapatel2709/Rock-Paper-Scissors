let userScore = 0;
let computerScore = 0;
let round = 1;
let isWaiting = false;

function play(userChoice) {
  if (isWaiting || round > 3) return;
  isWaiting = true;

  let choices = ['rock', 'paper', 'scissors'];
  let computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('user-emoji').innerText = getEmoji(userChoice);
  document.getElementById('computer-emoji').innerText = getEmoji(computerChoice);

  clearGlows();

  let userBtn = document.getElementById('user-' + userChoice);
  let computerBtn = document.getElementById('computer-' + computerChoice);

  let result = getResult(userChoice, computerChoice);
  let statusText = 'Round ' + round + ': You chose ' + userChoice + ', Computer chose ' + computerChoice + '. ';

  if (result === 'win') {
    userScore++;
    userBtn.classList.add('green-glow');
    computerBtn.classList.add('orange-glow');
    statusText += 'You Win!';
  } else if (result === 'lose') {
    computerScore++;
    userBtn.classList.add('orange-glow');
    computerBtn.classList.add('green-glow');
    statusText += 'You Lose!';
  } else {
    userBtn.classList.add('orange-glow');
    computerBtn.classList.add('orange-glow');
    statusText += "It's a Draw!";
  }

  document.getElementById('user-score').innerText = userScore;
  document.getElementById('computer-score').innerText = computerScore;
  document.getElementById('status-text').innerText = statusText;

  round++;

  if (round > 3) {
    setTimeout(showFinalResult, 2000);
  } else {
    setTimeout(resetRound, 2500);
  }
}

function getResult(user, computer) {
  if (user === computer) return 'draw';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function getEmoji(choice) {
  if (choice === 'rock') return '✊';
  if (choice === 'paper') return '✋';
  if (choice === 'scissors') return '✌️';
  return '❔';
}

function clearGlows() {
  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('green-glow');
    buttons[i].classList.remove('orange-glow');
  }
}

function resetRound() {
  clearGlows();
  document.getElementById('user-emoji').innerText = '❔';
  document.getElementById('computer-emoji').innerText = '❔';
  document.getElementById('status-text').innerText = 'Round ' + round + ': Make your move!';
  isWaiting = false;
}

function showFinalResult() {
  let finalMessage = '';
  if (userScore > computerScore) {
    finalMessage = '🎉 You won the game!';
  } else if (computerScore > userScore) {
    finalMessage = '💀 Computer wins the match!';
  } else {
    finalMessage = "🤝 It's a draw!";
  }

  document.getElementById('status-text').innerText = finalMessage;

  let playAgainBtn = document.createElement('button');
  playAgainBtn.innerText = '🔁 Play Again';
  playAgainBtn.style.marginTop = '1rem';
  playAgainBtn.onclick = resetGame;
  document.querySelector('.info-section').appendChild(playAgainBtn);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  round = 1;
  isWaiting = false;

  document.getElementById('user-score').innerText = '0';
  document.getElementById('computer-score').innerText = '0';
  document.getElementById('user-emoji').innerText = '❔';
  document.getElementById('computer-emoji').innerText = '❔';
  document.getElementById('status-text').innerText = 'Round 1: Make your move!';

  clearGlows();

  let playAgainBtn = document.querySelector('.info-section button');
  if (playAgainBtn) {
    playAgainBtn.remove();
  }
}
