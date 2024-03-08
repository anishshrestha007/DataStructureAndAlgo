import Node from "./Node.js";

class LinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    this.head = newHead;
    if (currentHead !== null) {
      this.head.setNextNode(currentHead);
    }
  }

  addToTail(data) {
    const newTail = new Node(data);
    let currentHead = this.head;
    if (currentHead == null) {
      currentHead = newTail;
    } else {
      while (currentHead.getNextNode() !== null) {
        currentHead = currentHead.getNextNode();
      }
      currentHead.setNextNode(newTail);
    }
    return currentHead;
  }

  removeHead() {
    const removeHead = this.head;
    if (!removeHead) {
      return;
    }
    this.head = removeHead.getNextNode();
    return removeHead.data;
  }

  printList() {
    let currentNode = this.head;
    let output = "<head> ";
    while (currentNode !== null) {
      output += currentNode.data + " ";
      currentNode = currentNode.getNextNode();
    }
    output += "<tail>";
    console.log(output);
  }
}
export default LinkedList;
