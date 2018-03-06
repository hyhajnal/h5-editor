const toTree = list => {
  let idMap = []
  let tree = []

  list.forEach(v => {
    idMap[v.id] = v
  })

  list.forEach(v => {
    let parent = idMap[v.pid]
    if (parent) {
      !parent.children && (parent.children = [])
      parent.children.push(v)
    } else {
      tree.push(v)
    }
  })
  return tree
}

const toList = (tree, pid, list) => {
  tree.forEach(item => {
    let newItem = { ...item, pid }
    delete newItem.children
    list.push(newItem)
    if (item.children && item.children.length > 0) {
      toList(item.children, item.id, list)
    }
  })
  return list
}

export { toTree, toList }
