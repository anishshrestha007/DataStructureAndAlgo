// Fibonnaci
// Memoization

function fib(n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  debugger;
  return fib(n - 1) + fib(n - 2);
}

// console.log(fib(6));

// function fib(n, memo = {}) {
//   if (memo[n]) return memo[n];

//   if (n <= 0) return 0;
//   if (n <= 1) return 1;

//   let calculatedValue = fib(n - 1, memo) + fib(n - 2, memo);
//   memo[n] = calculatedValue;
//   return calculatedValue;
// }

console.log(fib(6));
