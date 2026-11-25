class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
var head = null;
function push(newData) {
  let newNode = new Node(newData);

  let temp = head;
  let originHead = head;
  if (temp != null) {
    while (temp.next !== head) {
      temp = temp.next;
    }
    head = newNode;
    head.next = originHead;

    temp.next = head;
  } else {
    head = newNode;
    head.next = head;
  }
}

function print() {
  let temp = head;
  do {
    console.log(temp.data);
    temp = temp.next;
  } while (temp !== head);
}

push(4);
push(3);
push(2);
push(1);

print();
