class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  getNextNode() {
    return this.next;
  }

  setNextNode(node) {
    if (node instanceof Node || node === null) {
      this.next = node;
    }
  }
}
export default Node;
