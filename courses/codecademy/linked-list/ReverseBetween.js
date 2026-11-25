import TestLinkedList from "./TestLinkedList.js";

function reverseBetween(head, left, right) {
  let leftHeadSeeker = head.head;
  let rightTailSeeker = head.head;
  let leftHead = null;
  let rightHead = null;
  let previousHead = null;
  let count = 1;

  while (leftHeadSeeker) {
    if (count == left) {
      leftHead = leftHeadSeeker;
      break;
    }
    previousHead = leftHeadSeeker;
    leftHeadSeeker = leftHeadSeeker.next;
    count++;
  }
  rightHead = leftHeadSeeker;
  let nextRightHead = leftHeadSeeker.next;

  while (count <= right) {
    if (count == right) {
      if (previousHead == null) {
        head.head = rightHead;
        leftHeadSeeker.next = nextRightHead;
      } else {
        previousHead.next = rightHead;
        leftHeadSeeker.next = nextRightHead;
      }

      break;
    }
    const temp = nextRightHead.next;
    nextRightHead.next = rightHead;
    rightHead = nextRightHead;
    nextRightHead = temp;
    count++;
  }

  return head;
}

const reveresedLinkedList = reverseBetween(TestLinkedList, 1, 2);
reveresedLinkedList.printList();
