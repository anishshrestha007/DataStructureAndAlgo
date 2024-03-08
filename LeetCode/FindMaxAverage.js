var findMaxAverage = function (nums, k) {
  debugger;
  if (nums.length === 1) return nums.toString();
  let len = nums.length < k ? nums.length : k;
  let maxAverage = -Infinity;
  let i = 0,
    j = len - 1;
  let prevValue = -Infinity,
    avg = -Infinity;
  while (j < nums.length) {
    if (avg > -Infinity) {
      avg = (avg * len - prevValue + nums[j]) / len;
    } else {
      avg = nums.slice(i, j + 1).reduce((a, b) => a + b, 0) / len;
    }

    if (avg > maxAverage) {
      maxAverage = avg;
    }
    prevValue = nums[i];
    i++;
    j++;
  }
  return maxAverage;
};

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
