const FibonacciSequence = function (num, memo = {}) {
  if (num in memo) return memo[num];
  if (num <= 2) return 1;

  memo[num] =
    FibonacciSequence(num - 1, memo) + FibonacciSequence(num - 2, memo);
  return memo[num];
};

console.log(FibonacciSequence(50));

// 1 1 2 3 5 8 13
