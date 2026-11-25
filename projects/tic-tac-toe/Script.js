const gameBoard = (() => {
  let gameArray = new Array(9);

  const setPosition = (step, player) => {
    step = step - 1;
    gameArray[step] = player.icon;
  };

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

  const setNextPlayer = () => {
    if (playerX.isCurrent()) {
      playerO.setCurrent(true);
      playerX.setCurrent(false);
    } else {
      playerX.setCurrent(true);
      playerO.setCurrent(false);
    }
  };

  return {
    setPosition,
    getCurrentPlayer,
    checkWinner,
    setNextPlayer,
  };
})();

const displayController = (function () {
  const container = document.getElementById("container");
  const currentPlayerElement = document.getElementById("currentPlayer");
  const winner = document.getElementById("winner");

  container.addEventListener("click", handleContainerClick);

  function handleContainerClick(e) {
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
    container.removeEventListener("click", handleContainerClick);
  };

  return { setCurrentPlayer };
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
displayController.setCurrentPlayer();
