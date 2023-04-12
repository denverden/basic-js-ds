const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    let tree = this.tree;

    if (this.tree === null) {
      this.tree = new Node(data);
    } else {
      while (tree) {
        if (data < tree.data) {
          if (tree.left) {
            tree = tree.left;
          } else {
            tree.left = new Node(data);
            break;
          }
        }

        if (data > tree.data) {
          if (tree.right) {
            tree = tree.right;
          } else {
            tree.right = new Node(data);
            break;
          }
        }
      }
    }
  }

  has(data) {
    let tree = this.tree;

    while (tree) {
      if (tree.data === data){
        return true;
      } else if (data < tree.data){
        tree = tree.left;
      } else if (data > tree.data){
        tree = tree.right;
      }
    }

    return false;
  }

  find(data) {
    let tree = this.tree;

    while (tree) {
      if (tree.data === data) {
        return tree;
      }

      if (data < tree.data){
        tree = tree.left;
      }

      if (data > tree.data){
        tree = tree.right;
      }
    }

    return null;
  }

  remove(data, tree = this.tree) {
    const findMinNode = (node) => {
      return (!node.left) ? node : findMinNode(node.left);
    }

    if (!tree) {
      return null;
    } else if (data < tree.data) {
      tree.left = this.remove(data, tree.left);
      return tree;
    } else if (data > tree.data) {
      tree.right = this.remove(data, tree.right);
      return tree;
    } else {
      if (!tree.left && !tree.right) {
        tree = null;
        return tree;
      }

      if (!tree.left) {
        tree = tree.right;
        return tree;
      } else if (!tree.right) {
        tree = tree.left;
        return tree;
      }

      let newNode = findMinNode(tree.right);
      tree.data = newNode.data;
      tree.right = this.remove(newNode.data, tree.right);
      return tree;
    }
  }

  min() {
    let tree = this.tree.left;
    let min = this.tree.data;

    while (tree) {
      min = tree.data;
      tree = tree.left;
    }

    return min;
  }

  max() {
    let tree = this.tree.right;
    let max = this.tree.data;

    while (tree) {
      max = tree.data;
      tree = tree.right;
    }

    return max;
  }
}

module.exports = {
  BinarySearchTree
};