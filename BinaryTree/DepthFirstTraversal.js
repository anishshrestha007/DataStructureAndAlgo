// (a) Inorder (Left, Root, Right) : 4 2 5 1 3
// (b) Preorder (Root, Left, Right) : 1 2 4 5 3
// (c) Postorder (Left, Right, Root) : 4 5 2 3 1

class Node {
  constructor(val) {
    this.key = val;
    this.left = null;
    this.right = null;
  }
}
var root = null;

function InOrder(node) {
  // Base case - while doing recursion always remember base case first
  if (node == null) {
    return;
  }

  InOrder(node.left);

  console.log(node.key);

  InOrder(node.right);
}

root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

console.log("---- Log InOrder ----");

InOrder(root);
