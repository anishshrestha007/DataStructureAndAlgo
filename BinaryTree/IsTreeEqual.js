/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
var p = null;
var q = null;
var isSameTree = function (p, q) {
  // Base case: If both trees are empty, they are identical.
  if (p === null && q === null) {
    return true;
  }

  // If one of the trees is empty and the other is not, they are not identical.
  if (p === null || q === null) {
    return false;
  }

  // Compare the values of the current nodes.
  if (p.val !== q.val) {
    return false;
  }

  // Recursively check the left and right subtrees.
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

p = new Node(1);
p.left = new Node(2);

q = new Node(1);
q.left = new Node(null);
q.right = new Node(3);

isSameTree(p, q);
