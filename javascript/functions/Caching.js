// Caching or memoization

function hugeProduct(num1, num2) {
  let product = 0;
  for (let index = 0; index < 1000000; index++) {
    product = product + num1 * num2;
  }
  return product;
}

function myMemoization(fn, context) {
  let memo = {};
  return function (...args) {
    if (!memo[args]) {
      memo[args] = fn.apply(this, args);
    }
    return memo[args];
  };
}

productMemoizingFn = myMemoization(hugeProduct);
console.time("First");
productMemoizingFn(11, 89);
console.timeEnd("First");
console.time("Second");
productMemoizingFn(11, 89);
console.timeEnd("Second");
