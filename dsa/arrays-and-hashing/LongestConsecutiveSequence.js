// Longest Consecutive Sequence

var longestConsecutive = function (nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  let count = 0,
    i = 0,
    j = 0;

  while (i < nums.length) {
    let element = sortedNums[i];
    let nextElement = sortedNums[i + 1];
    if (nextElement == element) {
      j++;
    } else if (nextElement != element + 1) {
      j = i + 1;
    }

    i++;

    count = Math.max(count, i - j + 1);
  }
  return count;
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
