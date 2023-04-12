// A Javascript program to find a peak element
// using divide and conquer

// A binary search based function
// that returns index of a peak element
function findPeakUtil(arr, low, high, n) {
  // Find index of middle element
  // (low + high)/2
  var mid = low + parseInt((high - low) / 2);

  // Compare middle element with its
  // neighbours (if neighbours exist)
  if (
    (mid == 0 || arr[mid - 1] <= arr[mid]) &&
    (mid == n - 1 || arr[mid + 1] <= arr[mid])
  )
    return mid;
  // If middle element is not peak and its
  // left neighbour is greater than it,
  // then left half must have a peak element
  else if (mid > 0 && arr[mid - 1] > arr[mid])
    return findPeakUtil(arr, low, mid - 1, n);
  // If middle element is not peak and its
  // right neighbour is greater than it,
  // then right half must have a peak element
  else return findPeakUtil(arr, mid + 1, high, n);
}

// A wrapper over recursive function findPeakUtil()

function findPeak(arr, n) {
  return findPeakUtil(arr, 0, n - 1, n);
}

// Driver Code
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var n = arr.length;
document.write("Index of a peak point is " + findPeak(arr, n));
