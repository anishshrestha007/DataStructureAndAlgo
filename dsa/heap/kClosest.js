/*
min heap approach:
we can create a minHeap of the whole data set in O(n) time if we start from n/2 and heapify down each parent (see floyd method https://en.wikipedia.org/wiki/Binary_heap#Building_a_heap)

then we remove k times from the heap -> k * log(n) (need to heapify down on each removal)
runtime: O(N + k log (N))
space: O(1) since we are doing it in place
*/
var kClosest = function (points, k) {
  // we can build the heap in place
  let p = Math.floor((points.length - 2) / 2); // last parent
  for (let i = p; i >= 0; i--) {
    heapifyDown(points, i, distance);
  }

  // now we need to remove the smallest (points[0]) k times
  let solution = [];
  for (let i = 0; i < k; i++) {
    solution.push(remove(points, distance));
  }

  return solution;

  // read 0, replace 0 with last position, heapifyDown
  function remove(heap, weightFunction) {
    let val = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0, weightFunction);
    return val;
  }

  // compare with children, swap with smallest, repeat
  function heapifyDown(heap, idx, weightFunction) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let smallest = left;

    if (left >= heap.length) return;

    if (
      right < heap.length &&
      weightFunction(heap[left]) > weightFunction(heap[right])
    ) {
      smallest = right;
    }

    if (weightFunction(heap[idx]) > weightFunction(heap[smallest])) {
      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      heapifyDown(heap, smallest, weightFunction);
    }
  }

  function distance(point) {
    return point[0] * point[0] + point[1] * point[1];
  }
};

kClosest(
  [
    [1, 3],
    [-2, 2],
  ],
  1
);
