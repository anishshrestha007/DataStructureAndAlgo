var head = null;

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function pushNode(data) {
  let newNode = new Node(data);
  let originHead = head;

  if (head == null) {
    head = newNode;
    head.next = newNode;
  } else if (head.data > data) {
    let temp = head;
    newNode.next = head;
    head = newNode;
    do {
      temp = temp.next;
    } while (temp.next !== originHead);

    temp.next = newNode;
  } else {
    let temp = head;
    while (temp.next.data < data && temp.next !== originHead) {
      temp = temp.next;
    }
    newNode.next = temp.next;
    temp.next = newNode;
    temp = newNode;
  }
  return head;
}

function PrintNodes() {
  let temp = head;
  do {
    console.log(temp.data);
    temp = temp.next;
  } while (temp !== head);
}

var array = [5, 4, 7, 1, 9, 3, 2];

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  pushNode(element);
}

PrintNodes();
