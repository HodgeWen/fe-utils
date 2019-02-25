const array = [
	{ id: '0', parentId: null },
	{ id: '1', parentId: '0' },
	{ id: '2', parentId: '0' },
	{ id: '3', parentId: '1' },
	{ id: '4', parentId: '3' },
	{ id: '5', parentId: '4' }
]

function toTree(arr) {
  const tree = arr.filter(item => !item.parentId)
  function treeHasId(tree, id) {
    let len = tree.length
    for (let i = 0; i < len; i++) {
      if (tree[i].id === id) {
        return tree[i]
      }
      if (tree[i].children) {
        return treeHasId(tree[i].children, id)
      }
    }
    return false
  }

  arr.forEach(item => {
    const node = treeHasId(tree, item.parentId)
    if (node) {
      if (!node.children) {
        node.children = []
      }
      node.children.push(item)
    }
  })
  return tree
}
toTree(array)