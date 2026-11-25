const gameBoard = (() => {
  let gameArray = new Array(9);

  // history[0] is the empty board; history[n] is the board after move n.
  // Each entry also remembers whose turn it is at that point.
  let history = [];
  let currentStep = 0;

  const setPosition = (step, player) => {
    step = step - 1;
    gameArray[step] = player.icon;
  };

  const getBoard = () => gameArray.slice();

  const checkWinner = () => {
    let winningCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winner = null;

    for (let index = 0; index < winningCases.length; index++) {
      const element = winningCases[index];
      let a = element[0];
      let b = element[1];
      let c = element[2];
      if (
        gameArray[a] &&
        gameArray[a] === gameArray[b] &&
        gameArray[c] === gameArray[b]
      ) {
        winner = gameArray[a];
      }
    }

    return winner;
  };

  const getCurrentPlayer = () => {
    return playerX.isCurrent() ? playerX : playerO;
  };

  const setCurrentPlayer = (player) => {
    playerX.setCurrent(player === playerX);
    playerO.setCurrent(player === playerO);
  };

  const setNextPlayer = () => {
    setCurrentPlayer(playerX.isCurrent() ? playerO : playerX);
  };

  // Saves the board after a move. Making a move after jumping back
  // throws away the moves that came after that point.
  const saveStep = () => {
    history = history.slice(0, currentStep + 1);
    history.push({ board: getBoard(), next: getCurrentPlayer() });
    currentStep = history.length - 1;
  };

  // Restores the board and the player to move as they were at `step`.
  const goToStep = (step) => {
    const snapshot = history[step];
    gameArray = snapshot.board.slice();
    setCurrentPlayer(snapshot.next);
    currentStep = step;
  };

  const getHistoryLength = () => history.length;
  const getCurrentStep = () => currentStep;

  return {
    setPosition,
    getBoard,
    getCurrentPlayer,
    checkWinner,
    setNextPlayer,
    saveStep,
    goToStep,
    getHistoryLength,
    getCurrentStep,
  };
})();

const displayController = (function () {
  const container = document.getElementById("container");
  const squares = container.querySelectorAll(".square");
  const currentPlayerElement = document.getElementById("currentPlayer");
  const winner = document.getElementById("winner");
  const historyList = document.getElementById("history");
  let gameOver = false;

  container.addEventListener("click", handleContainerClick);

  function handleContainerClick(e) {
    if (gameOver || !e.target.dataset.value) return;
    if (e.target.innerHTML === "") {
      const player = gameBoard.getCurrentPlayer();
      gameBoard.setPosition(e.target.dataset.value, player);
      setPosition(e.target, player);
      let winner = gameBoard.checkWinner();
      if (winner) {
        setWinner(player);
        stopGame();
      } else {
        gameBoard.setNextPlayer();
        setCurrentPlayer();
      }
      gameBoard.saveStep();
      renderHistory();
    }
  }

  const setCurrentPlayer = () => {
    const player = gameBoard.getCurrentPlayer();
    currentPlayerElement.innerHTML = player.name + " - " + player.icon;
  };

  const setPosition = (element, player) => {
    element.innerHTML = player.icon;
  };

  const setWinner = (player) => {
    winner.innerHTML = player.name;
  };

  const stopGame = () => {
    gameOver = true;
  };

  // Redraws every square from the board array (used after jumping to a step).
  const renderBoard = () => {
    const board = gameBoard.getBoard();
    squares.forEach((square) => {
      square.innerHTML = board[square.dataset.value - 1] || "";
    });
  };

  const goToStep = (step) => {
    gameBoard.goToStep(step);
    renderBoard();
    const won = gameBoard.checkWinner();
    gameOver = Boolean(won);
    winner.innerHTML = won ? (won === playerX.icon ? playerX.name : playerO.name) : "";
    setCurrentPlayer();
    renderHistory();
  };

  // One button per saved step: "Go to start", "Go to move 1", ...
  // The step currently on the board is marked and disabled.
  const renderHistory = () => {
    historyList.innerHTML = "";
    for (let step = 0; step < gameBoard.getHistoryLength(); step++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = step === 0 ? "Go to start" : "Go to move " + step;
      if (step === gameBoard.getCurrentStep()) {
        button.disabled = true;
        button.setAttribute("aria-current", "step");
      }
      button.addEventListener("click", () => goToStep(step));
      li.appendChild(button);
      historyList.appendChild(li);
    }
  };

  const start = () => {
    setCurrentPlayer();
    gameBoard.saveStep(); // step 0: empty board
    renderHistory();
  };

  return { setCurrentPlayer, start };
})();

const player = (name, icon) => {
  let current = false;

  function setCurrent(state) {
    current = state;
  }

  function isCurrent() {
    return current;
  }

  return {
    name,
    icon,
    isCurrent,
    setCurrent,
  };
};

const playerX = player("Anish", "X");
const playerO = player("Manjushree", "O");
playerX.setCurrent(true);
displayController.start();
