// 二叉搜索树

const BinarySearchTree = (function () {
  function Node (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  function insertNode (node, newNode) {
    if (newNode.key < node.key) {
      return (
        node.left === null ? 
        node.left = newNode : 
        insertNode(node.left, newNode)
      )
    }
    node.right === null ? 
    node.right = newNode :
    insertNode(node.right, newNode)
  } 

  function inOrderTraverseNode (node, callback) {
    if (node !== null) { 
      inOrderTraverseNode(node.left, callback)
      callback(node.key)               
      inOrderTraverseNode(node.right, callback)
    }
  }

  function preOrderTraverseNode (node, callback) {
    if (node !== null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }

  function postOrderTraverseNode  (node, callback) {
    if (node !== null) {
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  function minNode (node) {
    if (node){
      while (node && node.left !== null) { 
        node = node.left             
      }
      return node.key
    }
    return null 
  }

  function maxNode (node) {
    if (node){
      while (node && node.right !== null) { 
        node = node.right             
      }
      return node.key
    }
    return null 
  }

  function removeNode (node, key) {
    if (node === null){ 
      return null
    }
    if (key < node.key){ 
      node.left = removeNode(node.left, key) 
      return node 

    } else if (key > node.key){ 
      node.right = removeNode(node.right, key) 
      return node 

    } else { //键等于node.key

      //第一种情况——一个叶节点
      if (node.left === null && node.right === null){ 
        node = null 
        return node 
      }

      //第二种情况——一个只有一个子节点的节点
      if (node.left === null){ 
        node = node.right 
        return node 

      } else if (node.right === null){ 
        node = node.left 
        return node 
      }

      //第三种情况——一个有两个子节点的节点
      var aux = findMinNode(node.right) 
      node.key = aux.key 
      node.right = removeNode(node.right, aux.key) 
      return node 
    }
  }

  let root = null

  function BinarySearchTree () {

  }

  BinarySearchTree.prototype = {
    constructor: BinarySearchTree,

    insert (key) {
      const node = new Node(key)
      root === null ? root = node : insertNode(root, node)
    },

    search (key) {

    },
    // 中序遍历
    inOrderTraverse (callback) {
      inOrderTraverseNode(root, callback)
    },
    // 先序遍历
    preOrderTraverse (callback) {
      preOrderTraverseNode(root, callback)
    },
    // 后序遍历
    postOrderTraverse (callback) {
      postOrderTraverseNode(root, callback)
    },
    // 返回最小的值或键
    min () {
      return minNode(root)
    },
    // 返回最大的值或键
    max () {
      return maxNode(root)
    },
    // 移除某个键
    remove () {
      root = removeNode(root, key)
    }
  }

  return BinarySearchTree
})()

export default BinarySearchTree