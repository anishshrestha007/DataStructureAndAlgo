function findBoundary(arr) {
  let left = 0;
  let right = arr.length - 1;
  let boundary_index = -1;

  while (left <= right) {
    let mid = Math.trunc((left + right) / 2);
    if (arr[mid]) {
      boundary_index = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return boundary_index;
}
console.log(findBoundary([false, true, true, true, true]));
