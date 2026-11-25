function firstOccurrences(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let firstOccurrence = -1;
  while (left <= right) {
    let mid = Math.trunc((right + left) / 2);
    if (arr[mid] > target || arr[mid] === target) {
      firstOccurrence = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return firstOccurrence;
}

console.log(firstOccurrences([3, 3, 3, 3, 3, 6, 10, 10, 10, 100], 100));
