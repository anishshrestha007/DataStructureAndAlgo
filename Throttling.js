const expensive = () => {
  const heightOutput = document.getElementById("height");
  const widthOutput = document.getElementById("width");
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
};

const win = window;
const resizeWin = (expensive, limit) => {
  let flag = true;

  return function () {
    if (flag) {
      expensive();

      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};
const throttleFunc = (expensive, limit) => {
  let flag = true;

  return function () {
    if (flag) {
      expensive();
    }
  };
};
//var reszize = resizeWin(expensive);

window.addEventListener("resize", resizeWin(expensive, 1000));
//window.addEventListener("resize", throttleFunc(expensive, 5800));
