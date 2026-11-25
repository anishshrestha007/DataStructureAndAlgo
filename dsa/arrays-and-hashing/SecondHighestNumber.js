const arr = [7, 9, 6, 55, 8, 10, 11, 22, 44, 33, 77];
const highest = {
  second: 0,
  first: 0,
};
function SecondHighest(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (arr[index] > highest["first"]) {
      highest["second"] = highest["first"];
      highest["first"] = arr[index];
    } else if (arr[index] > highest["second"]) {
      highest["second"] = arr[index];
    }
  }
  return highest["second"];
}

console.log(SecondHighest(arr));
