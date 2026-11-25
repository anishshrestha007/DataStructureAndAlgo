var head;

class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

function printNode() {
  var n = head; // Set n as head because it is the first element of the linked list

  while (n !== null) {
    console.log(n.data);
    n = n.next;
  }
}

head = new Node(1);
var second = new Node(2);
var third = new Node(3);

head.next = second;
second.next = third;

printNode();
