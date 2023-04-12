document.addEventListener("DOMContentLoaded", () => {
  init();
});

let arr = Array.from(Array(9));
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let winner = "";
let arrSteps = [];

async function pushSteps(step, squareID) {
  if (!winner) {
    step = step - 1;
    if (!arr[step]) {
      arr[step] = currentPlayer;
      document.querySelector("#" + squareID).innerHTML = currentPlayer;
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
      document.querySelector("#nextPlayer").innerHTML = currentPlayer;
      try {
        winner = await calculateWinner();
        if (winner) {
          document.querySelector("#winner").innerHTML = winner;
        }
      } catch (error) {
        buildSteps(step);
      }
    }
  }
}

function buildSteps() {
  let ul = document.querySelector("#StatusUL");
  if (arrSteps.length === 0) {
    ul = document.createElement("ul");
    ul.id = "StatusUL";
    document.querySelector("#Status").appendChild(ul);
  }
  // Creating new array object
  let newArr = JSON.parse(JSON.stringify(arr));
  arrSteps.push(newArr);
  let step = arrSteps.length;

  let li = document.createElement("li");
  li.className = "step";
  li.id = "stepLI" + step;

  let b = document.createElement("button");
  b.innerHTML = "Step " + step;
  b.onclick = () => travelSteps(step);

  li.appendChild(b);
  ul.appendChild(li);
}

function travelSteps(step) {
  winner = "";
  document.querySelector("#winner").innerHTML = "";
  for (let index = step + 1; index <= arrSteps.length; index++) {
    document.getElementById("stepLI" + index).remove();
  }
  arrSteps = arrSteps.slice(0, step);
  let travelledStep = arrSteps[arrSteps.length - 1];

  if (step === 0) {
    currentPlayer = playerX;
    travelledStep = Array.from(Array(9));
    document.querySelector("#StatusUL").remove();
    document.querySelector("#nextPlayer").innerHTML = currentPlayer;
  }

  arr = travelledStep;
  let squareEle = document.getElementsByClassName("square");
  for (let index = 0; index < squareEle.length; index++) {
    const element = squareEle[index];
    if (travelledStep[index]) {
      element.innerHTML = travelledStep[index];
    } else {
      element.innerHTML = "";
    }
  }
}

function calculateWinner() {
  return new Promise((resolve, reject) => {
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
      if (arr[a] && arr[a] === arr[b] && arr[c] === arr[b]) {
        winner = arr[a];
        break;
      }
    }
    if (winner) {
      resolve(winner);
    } else {
      reject();
    }
  });
}

function init() {
  document.querySelector("#container").addEventListener("click", (e) => {
    const squareID = e.target.id;
    if (squareID) {
      switch (squareID) {
        case "one":
          pushSteps(1, squareID);
          break;
        case "two":
          pushSteps(2, squareID);
          break;
        case "three":
          pushSteps(3, squareID);
          break;
        case "four":
          pushSteps(4, squareID);
          break;
        case "five":
          pushSteps(5, squareID);
          break;
        case "six":
          pushSteps(6, squareID);
          break;
        case "seven":
          pushSteps(7, squareID);
          break;
        case "eight":
          pushSteps(8, squareID);
          break;
        case "nine":
          pushSteps(9, squareID);
          break;
        default:
          break;
      }
    }
  });
}
