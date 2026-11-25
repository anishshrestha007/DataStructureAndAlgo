const gameBoard = (() => {
  let gameArray = new Array(9);

  // history[0] is the empty board; history[n] is the board after move n.
  // Each entry remembers whose turn is next and which square was played.
  let history = [];
  let currentStep = 0;

  const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const setPosition = (step, player) => {
    step = step - 1;
    gameArray[step] = player.icon;
  };

  const getBoard = () => gameArray.slice();

  // Returns { icon, line } for the winner, or null.
  const checkWinner = () => {
    for (let index = 0; index < winningCases.length; index++) {
      const [a, b, c] = winningCases[index];
      if (
        gameArray[a] &&
        gameArray[a] === gameArray[b] &&
        gameArray[c] === gameArray[b]
      ) {
        return { icon: gameArray[a], line: winningCases[index] };
      }
    }
    return null;
  };

  const isFull = () => {
    for (let i = 0; i < 9; i++) if (!gameArray[i]) return false;
    return true;
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
  const saveStep = (move) => {
    history = history.slice(0, currentStep + 1);
    history.push({ board: getBoard(), next: getCurrentPlayer(), move: move || null });
    currentStep = history.length - 1;
  };

  // Restores the board and the player to move as they were at `step`.
  const goToStep = (step) => {
    const snapshot = history[step];
    gameArray = snapshot.board.slice();
    setCurrentPlayer(snapshot.next);
    currentStep = step;
  };

  const reset = () => {
    gameArray = new Array(9);
    history = [];
    currentStep = 0;
    setCurrentPlayer(playerX);
    saveStep();
  };

  const getHistory = () => history.slice();
  const getCurrentStep = () => currentStep;

  return {
    setPosition,
    getBoard,
    getCurrentPlayer,
    checkWinner,
    isFull,
    setNextPlayer,
    saveStep,
    goToStep,
    reset,
    getHistory,
    getCurrentStep,
  };
})();

const displayController = (function () {
  const container = document.getElementById("container");
  const squares = Array.from(container.querySelectorAll(".square"));
  const statusElement = document.getElementById("status");
  const historyList = document.getElementById("history");
  const score = { X: 0, O: 0, draws: 0 };

  container.addEventListener("click", handleContainerClick);
  container.addEventListener("keydown", handleBoardKeys);
  document.getElementById("new-game").addEventListener("click", newGame);

  function handleContainerClick(e) {
    const square = e.target.closest(".square");
    if (!square || square.getAttribute("aria-disabled") === "true" || isGameOver()) return;

    const index = Number(square.dataset.value);
    if (gameBoard.getBoard()[index - 1]) return;

    const player = gameBoard.getCurrentPlayer();
    gameBoard.setPosition(index, player);

    const result = gameBoard.checkWinner();
    if (result) {
      score[result.icon]++;
    } else if (gameBoard.isFull()) {
      score.draws++;
    } else {
      gameBoard.setNextPlayer();
    }
    gameBoard.saveStep({ index: index - 1, icon: player.icon });
    render();
  }

  // Arrow keys move focus around the 3x3 board.
  function handleBoardKeys(e) {
    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 };
    if (!(e.key in moves)) return;
    const i = squares.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    let next = i + moves[e.key];
    if (e.key === "ArrowLeft" && i % 3 === 0) next = i + 2;
    if (e.key === "ArrowRight" && i % 3 === 2) next = i - 2;
    if (next < 0) next += 9;
    if (next > 8) next -= 9;
    squares[next].focus();
  }

  const isGameOver = () => Boolean(gameBoard.checkWinner()) || gameBoard.isFull();

  const playerFor = (icon) => (icon === playerX.icon ? playerX : playerO);

  const mark = (icon) => `<span class="mark-${icon.toLowerCase()}">${icon}</span>`;

  const squareName = (i) => `row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`;

  const renderBoard = () => {
    const board = gameBoard.getBoard();
    const result = gameBoard.checkWinner();
    const over = isGameOver();
    const turn = gameBoard.getCurrentPlayer().icon;

    container.dataset.turn = over ? "" : turn;
    squares.forEach((square, i) => {
      const value = board[i] || "";
      square.textContent = value;
      square.dataset.preview = turn;
      square.className = "square" + (value ? " mark-" + value.toLowerCase() : "");
      if (result && result.line.includes(i)) square.classList.add("is-winning");
      // aria-disabled (not disabled) so a played square keeps keyboard focus
      square.setAttribute("aria-disabled", String(Boolean(value) || over));
      square.setAttribute("aria-label", `${squareName(i)}, ${value || "empty"}`);
    });
  };

  const renderStatus = () => {
    const result = gameBoard.checkWinner();
    const current = gameBoard.getCurrentPlayer();
    if (result) {
      statusElement.innerHTML = `${playerFor(result.icon).name} (${mark(result.icon)}) wins!`;
    } else if (gameBoard.isFull()) {
      statusElement.textContent = "It's a draw.";
    } else {
      statusElement.innerHTML = `${current.name}'s turn (${mark(current.icon)})`;
    }

    const over = isGameOver();
    document.getElementById("score-x").classList.toggle("is-turn", !over && current === playerX);
    document.getElementById("score-o").classList.toggle("is-turn", !over && current === playerO);
    document.getElementById("wins-x").textContent = score.X;
    document.getElementById("wins-o").textContent = score.O;
    document.getElementById("draws").textContent = score.draws;
  };

  // One button per saved step: "Game start", "1. X → row 1, column 1", ...
  // The step currently on the board is marked and disabled.
  const renderHistory = () => {
    historyList.innerHTML = "";
    const history = gameBoard.getHistory();
    history.forEach((entry, step) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML =
        step === 0
          ? "Game start"
          : `${step}. ${mark(entry.move.icon)} → ${squareName(entry.move.index)}`;
      if (step === gameBoard.getCurrentStep()) {
        button.disabled = true;
        button.setAttribute("aria-current", "step");
      }
      button.addEventListener("click", () => goToStep(step));
      li.appendChild(button);
      historyList.appendChild(li);
    });
    // Keep the current move visible inside the list without scrolling the page.
    const currentButton = historyList.querySelector('[aria-current="step"]');
    if (currentButton && historyList.scrollHeight > historyList.clientHeight) {
      const top = currentButton.offsetTop - historyList.offsetTop;
      if (top < historyList.scrollTop) historyList.scrollTop = top;
      else if (top + currentButton.offsetHeight > historyList.scrollTop + historyList.clientHeight)
        historyList.scrollTop = top + currentButton.offsetHeight - historyList.clientHeight;
    }
  };

  const render = () => {
    renderBoard();
    renderStatus();
    renderHistory();
  };

  const goToStep = (step) => {
    gameBoard.goToStep(step);
    render();
  };

  function newGame() {
    gameBoard.reset();
    render();
    squares[4].focus();
  }

  const start = () => {
    document.getElementById("name-x").textContent = playerX.name;
    document.getElementById("name-o").textContent = playerO.name;
    gameBoard.reset();
    render();
  };

  return { start };
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
