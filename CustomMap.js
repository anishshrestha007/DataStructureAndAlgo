const arr = [1, 2, 3];

function customMap(fn, arr) {
  try {
    arr.forEach((element, i) => {
      arr[i] = fn.call(this, element);
    });

    return arr;
  } catch (error) {
    console.log(error);
  }
}

function addTwo(x) {
  return x + 2;
}

console.log(customMap(addTwo, arr));
