function findDuplicates(nums) {
  var res = [];
  debugger;
  for (i = 0; i < nums.length; i++) {
    var index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) res.push(Math.abs(index + 1));
    nums[index] = -nums[index];
  }
  return res;
}

findDuplicates([4, 7, 7, 2, 3, 8, 2, 3, 1]);
