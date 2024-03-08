import testLinkedList from "./TestLinkedList.js";

function swapNodes(list, data1, data2) {
  if (data1 === data2) return list;
  let currentNode = list.head;
  let firstNode = null;
  let secondNode = null;

  while (currentNode != null) {
    if (firstNode && secondNode) {
      break;
    }
    if (currentNode.data == data1) {
      firstNode = currentNode;
    }
    if (currentNode.data == data2) {
      secondNode = currentNode;
    }
    currentNode = currentNode.next;
  }

  if (!firstNode || !secondNode) {
    return "First or second Node could not be found!";
  }

  const temp = firstNode.data;
  firstNode.data = secondNode.data;
  secondNode.data = temp;

  return list;
}

let exampleList = testLinkedList;
let retList = swapNodes(exampleList, 2, 5);
console.log(retList);
// Leave this so we can test your code:
export default swapNodes;
