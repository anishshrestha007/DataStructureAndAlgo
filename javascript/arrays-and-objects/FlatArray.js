const arr = [1, 2, 3, [[4, 5, 6]], 7, 9, [12, 23, 43]];
const newArr = [];
function flatArray(arr, level = 1) {
  arr.forEach((element) => {
    if (typeof element === "object" && level > 0) {
      let lvl = level - 1;
      flatArray(element, lvl);
    } else newArr.push(element);
  });
  return newArr;
}

console.log(flatArray(arr));
