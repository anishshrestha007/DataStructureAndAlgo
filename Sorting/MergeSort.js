function Merge(arr, start, mid, end) {
  let tempArr = new Array(end - start + 1);
  let k = 0;
  let i = start;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      tempArr[k] = arr[i];
      k++;
      i++;
    } else {
      tempArr[k] = arr[j];
      k++;
      j++;
    }
  }

  while (i <= mid) {
    tempArr[k] = arr[i];
    i++;
    k++;
  }

  while (j <= end) {
    tempArr[k] = arr[j];
    j++;
    k++;
  }

  for (let index = start; index <= end; index++) {
    const element = tempArr[index - start];
    array[index] = element;
  }
}

function MergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let mid = parseInt((start + end) / 2);

  MergeSort(arr, start, mid);

  MergeSort(arr, mid + 1, end);

  Merge(arr, start, mid, end);
}

var array = [6, 7, 4, 2, 14, 55, 66, 77, 89, 11, 21, 9];

MergeSort(array, 0, array.length - 1);

console.log(array);
