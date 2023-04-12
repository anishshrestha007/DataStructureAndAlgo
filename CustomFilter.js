Array.prototype.customFilter = function (fn, initValue = 0) {
  let arr = this;
  let accumulatedValue = initValue;
  arr.forEach((element, i) => {
    return (accumulatedValue = addTwo(accumulatedValue, element));
  });
  return accumulatedValue;
};

function addTwo(acc, val) {
  return acc + val;
}

console.log([1, 2, 3].customFilter(addTwo, 1));

// console.log(
//   [1, 2, 3].reduce((acc, val, i) => {
//     return (acc = acc + val);
//   }, 0)
// );
