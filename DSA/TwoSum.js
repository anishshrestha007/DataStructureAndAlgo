// Two Sum

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

var twoSum = function (nums, target) {
  var returnArr = [];
  var map = new Map();
  for (i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      returnArr[1] = i;
      returnArr[0] = map.get(target - nums[i]);
      break;
    }
    map.set(nums[i], i);
  }
  return returnArr;
};

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]
