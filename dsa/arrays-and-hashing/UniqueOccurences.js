var uniqueOccurrences = function (arr) {
  let obj = {};
  for (let ele of arr) {
    if (ele in obj) {
      obj[ele] += 1;
    } else {
      obj[ele] = 1;
    }
  }
  debugger;
  let prev = [];
  for (let key in obj) {
    if (prev.includes(obj[key])) {
      return false;
    }
    prev.push(obj[key]);
  }
  return true;
};

console.log(
  uniqueOccurrences([
    26, 2, 16, 16, 5, 5, 26, 2, 5, 20, 20, 5, 2, 20, 2, 2, 20, 2, 16, 20, 16,
    17, 16, 2, 16, 20, 26, 16,
  ])
);
