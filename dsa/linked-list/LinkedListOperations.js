var head = null;

class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

function printNode() {
  var n = head;
  while (n !== null) {
    console.log(n.data);
    n = n.next;
  }
}

function push(newData) {
  let newNode = new Node(newData);

  newNode.next = head;

  head = newNode;
}

function insertAfter(prevNode, newData) {
  let newNode = new Node(newData);

  if (head === null) {
    console.log("Head cannot be empty!");
    return;
  }

  newNode.next = prevNode.next;

  prevNode.next = newNode;
}

function append(newData) {
  let newNode = new Node(newData);

  if (head === null) {
    head = newNode;
    return;
  }
  let prevNode = head;
  while (prevNode && prevNode.next !== null) {
    prevNode = prevNode.next;
  }
  newNode.next = null;
  prevNode.next = newNode;
}

function deleteNode(key) {
  let temp = head,
    prev = null;

  if (temp !== null && temp.data === key) {
    temp = temp.next;
    return;
  }

  while (temp !== null && temp.data !== key) {
    prev = temp;
    temp = temp.next;
  }
  if (temp === null) {
    return;
  }

  prev.next = temp.next;
}

function deleteNodePosition(position) {
  let temp = head,
    prev = null;

  if (temp !== null && position === 0) {
    head = temp.next;
    return;
  }
  var counter = 0;
  while (temp !== null && counter !== position) {
    prev = temp;
    temp = temp.next;
    counter++;
  }

  if (temp === null) {
    return;
  }

  prev.next = temp.next;
}

function revertLinkedList(node) {
  var prev = null,
    curr = node,
    next = null;

  if (node === null) {
    return;
  }

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  node = prev;
  return node;
}

push(1);

append(2);
append(3);
append(4);
append(5);

append(6);
insertAfter(head.next, 7);
//printNode();
deleteNode(3);
deleteNodePosition(1);
//printNode();

head = revertLinkedList(head);
printNode();
