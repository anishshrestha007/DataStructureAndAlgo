import testLinkedList from "./TestLinkedList.js";

function reverseLinkedList(linkedList) {
  // Write your code here
  let currentHead = linkedList.head;
  let nextHead = currentHead.next;
  currentHead.next = null;
  while (nextHead !== null) {
    const temp = nextHead.next;
    nextHead.next = currentHead;
    currentHead = nextHead;
    nextHead = temp;
  }

  return currentHead;
}

//Calling your function on an example
console.log("Original");
let exampleLinkedList = testLinkedList;
exampleLinkedList.printList();
console.log("Reversed");
let reversed = reverseLinkedList(exampleLinkedList);
reversed.printList();
// Leave this here so we can test your code
export default reverseLinkedList;
