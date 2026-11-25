const arr = [1, 2, 3, [[4, 5, 6]], 7, 9, [12, 23, 43]];
const newArr = [];
function addByTwo(a) {
  return a + 2;
}

function flatMap(fn, arr, level = 1) {
  arr.forEach((element) => {
    if (typeof element === "object" && level > 0) {
      let lvl = level - 1;
      flatMap(fn, element, lvl);
    } else {
      newArr.push(fn(element));
    }
  });
  return newArr;
}

console.log(flatMap(addByTwo, arr));
