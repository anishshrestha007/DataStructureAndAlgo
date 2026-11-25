// /* Function to left rotate arr of size n by d */
// function leftRotate(arr, d, n) {
//   debugger;
//   for (i = 0; i < d; i++) leftRotatebyOne(arr, n);
// }

// function leftRotatebyOne(arr, n) {
//   debugger;
//   var i, temp;
//   temp = arr[0];
//   for (i = 0; i < n - 1; i++) arr[i] = arr[i + 1];
//   arr[n - 1] = temp;
// }

// /* utility function to print an array */
// function printArray(arr, n) {
//   for (i = 0; i < n; i++) document.write(arr[i] + " ");
// }

// // Driver program to test above functions

// var arr = [1, 2, 3, 4, 5, 6, 7];
// leftRotate(arr, 2, 7);
// printArray(arr, 7);

function leftRotate(arr, d, n) {
  for (i = 0; i < d; i++) {
    leftRotateArray(arr, n);
  }
}
function leftRotateArray(arr, n) {
  temp = arr[0];
  for (j = 0; j < n - 1; j++) {
    arr[j] = arr[j + 1];
  }
  arr[n - 1] = temp;
}

function printArray(arr, n) {
  for (i = 0; i < n; i++) console.log(arr[i] + " ");
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
leftRotate(array, 1, 9);
printArray(array, 9);
