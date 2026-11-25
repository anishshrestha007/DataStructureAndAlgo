import testLinkedList from "./TestLinkedList.js";

function reverseLinkedList(linkedList) {
  // Write your code here
  let currentHead = linkedList.head;
  if (currentHead === null) return linkedList;
  let nextHead = currentHead.next;
  currentHead.next = null;
  while (nextHead !== null) {
    const temp = nextHead.next;
    nextHead.next = currentHead;
    currentHead = nextHead;
    nextHead = temp;
  }

  // currentHead is now the old tail; make it the list's head and return the list itself
  linkedList.head = currentHead;
  return linkedList;
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
