function findMinRotated(arr) {
  var l = 0;
  var r = arr.length - 1;
  var m = Math.trunc((l + r) / 2);
  var left = arr[m] > arr[l] ? m + 1 : l;
  var right = arr[m] < arr[l] ? m - 1 : r;
  var minValue = -1;
  while (left <= right) {
    let mid = Math.trunc((right + left) / 2);
    if (arr[mid] < arr[mid + 1]) {
      minValue = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return minValue;
}

console.log(findMinRotated([3, 5, 7, 11, 13, 17, 19, 2]));
