'use strict';

let userScore = 0;
let computerScore = 0;
let moves = 0;

const spanUserScore = document.getElementById('user-score');
const spanComputerScore = document.getElementById('comp-score');
const divScoreBoard = document.querySelector('.score-board');
const pResult = document.querySelector('.result');
const divRock = document.getElementById('r');
const divPaper = document.getElementById('p');
const divScissors = document.getElementById('s');
const btnPlayAgain = document.getElementById('playAgain');
const pMovesleft = document.getElementById('movesleft');
const endgameModal = document.getElementById('endgameModal');
const endgameMsg = document.getElementById('endgameMsg');
const overlay = document.getElementById('overlay');

function countMoves() {
  return moves++;
}

function isGameOver() {
  return userScore === 5 || computerScore === 5;
}

function modalGameOver(playerSelection) {
  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
    playAgain();
    return;
  }
}
function openEndgameModal() {
  endgameModal.classList.add('active');
  overlay.classList.add('active');
}

function closeEndgameModal() {
  endgameModal.classList.remove('active');
  overlay.classList.remove('active');
}

const confettiElement = document.getElementById('my-canvas');
const confettiSettings = {
  target: confettiElement,
  max: 50,
  size: 1.8,
  clock: 30,
  props: ['circle', 'square', 'triangle', 'line'],
  colors: [
    [165, 104, 246],
    [230, 61, 135],
    [0, 199, 228],
    [253, 214, 126],
  ],
  animate: true,
};
let confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
console.log(confettiSettings);

function setFinalMessage() {
  
  if (userScore > computerScore) {
    endgameMsg.textContent = `You won! \u00A0🏆\u00A0🎉`;
    console.log(endgameMsg.textContent);
    confettiElement.classList.add('active');    
    return endgameMsg
  }
  else{
    endgameMsg.textContent = `You lost... \u00A0☹️`;
  }

  // return userScore > computerScore
  //   ? (endgameMsg.textContent = `You won! \u00A0🏆\u00A0🎉`)
  //   : (endgameMsg.textContent = `You lost... \u00A0☹️`);
  //   if(endgameMsg.value.includes('won')){
  //     console.log(endgameMsg.value);
  //     generateConfetti()
  //     confettiElement.classList.add('active');
  //   }
}

function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const rendomNumber = Math.floor(Math.random() * 3);
  return choices[rendomNumber];
}

function convertToWord(letter) {
  if (letter === 'r') return `👊🏻`;
  if (letter === 'p') return `🤚🏻`;
  if (letter === 's') return `✌🏻`;
}

function win(userChoice, computerChoice) {
  countMoves();

  const smallUserWord = 'user'.fontsize(4).fontcolor('crimson').sub();
  const smallCompWord = 'comp'.fontsize(4).fontcolor('crimson').sub();
  const userChoice_div = document.getElementById(userChoice);

  userScore++;
  spanUserScore.innerHTML = userScore;
  spanComputerScore.innerHTML = computerScore;
  pMovesleft.innerText = `Moves : ${moves}`;

  if (isGameOver) {
    modalGameOver(userChoice);
  }
  pResult.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} \u00A0  beats \u00A0  ${convertToWord(
    computerChoice
  )}${smallCompWord}\u00A0. You WIN!!!! 🔥`;
  userChoice_div.classList.add('green-glow');
  setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);
}

function lose(userChoice, computerChoice) {
  countMoves();

  const smallUserWord = 'user'.fontsize(4).fontcolor('crimson').sub();
  const smallCompWord = 'comp'.fontsize(4).fontcolor('crimson').sub();
  const userChoice_div = document.getElementById(userChoice);

  computerScore++;
  spanUserScore.innerHTML = userScore;
  spanComputerScore.innerHTML = computerScore;
  pMovesleft.innerText = `Moves : ${moves}`;

  if (isGameOver) {
    modalGameOver(userChoice);
  }
  pResult.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} \u00A0  loses to \u00A0  ${convertToWord(
    computerChoice
  )}${smallCompWord}\u00A0. You LOST... ☹️`;
  userChoice_div.classList.add('red-glow');
  setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
}

function draw(userChoice, computerChoice) {
  countMoves();

  const smallUserWord = 'user'.fontsize(4).fontcolor('crimson').sub();
  const smallCompWord = 'comp'.fontsize(4).fontcolor('crimson').sub();
  const userChoice_div = document.getElementById(userChoice);

  spanUserScore.innerHTML = userScore;
  spanComputerScore.innerHTML = computerScore;
  pMovesleft.innerText = `Moves : ${moves}`;

  if (isGameOver) {
    modalGameOver(userChoice);
  }
  pResult.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} \u00A0  equals \u00A0  ${convertToWord(
    computerChoice
  )}${smallCompWord}\u00A0. It's a DRAW.`;
  userChoice_div.classList.add('gray-glow');
  setTimeout(() => userChoice_div.classList.remove('gray-glow'), 500);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case 'rs':
    case 'pr':
    case 'sp':
      win(userChoice, computerChoice);
      break;

    case 'rp':
    case 'ps':
    case 'sr':
      lose(userChoice, computerChoice);
      break;

    case 'rr':
    case 'pp':
    case 'ss':
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  divRock.addEventListener('click', () => {
    game('r');
  });

  divPaper.addEventListener('click', () => {
    game('p');
  });

  divScissors.addEventListener('click', () => {
    game('s');
  });
}

main();

function playAgain() {
  spanUserScore.innerHTML = 0;
  spanComputerScore.innerHTML = 0;
  userScore = 0;
  computerScore = 0;
  moves = 0;
  pResult.innerHTML = "Let's play!";
  pMovesleft.innerHTML = 'Moves  : 0';
  
}

btnPlayAgain.addEventListener('click', playAgain);

const closeBtn = document.getElementById('close-modal');
const restartBtn = document.getElementById('restartBtn');

restartBtn.addEventListener('click', () => {
  playAgain();
  confettiElement.classList.remove('active');
  closeEndgameModal();
});
overlay.addEventListener('click', () => {
  playAgain();
  confettiElement.classList.remove('active');
  closeEndgameModal();
});
closeBtn.addEventListener('click', () => {
  playAgain();
  confettiElement.classList.remove('active');
  closeEndgameModal();
});
