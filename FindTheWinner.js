var findTheWinner = function (n, k) {
  debugger;
  // var i = 0 + (k - 1);
  var i = 0;
  var nums = [];
  for (j = 1; j <= n; j++) {
    nums.push(j);
  }
  while (nums.length !== 1) {
    i = (k + i) % nums.length;
    if (i - 1 < 0) {
      nums.splice(nums.length - 1, 1);
      i = nums.length;
    } else {
      nums.splice(i - 1, 1);
      i = i - 1;
    }
    //nums.splice(i, 1);

    // if (i + k > nums.length) {
    //   i = i + k - (nums.length + 1);
    //   if (i >= nums.length) {
    //     i = (i % k) - 1;
    //   }
    // } else {
    //   i = i + (k - 1);
    // }
  }
  console.log(nums[0]);
  return nums[0];
};

findTheWinner(6, 5);
