// import DATA from './page'

const toTree = list => {
  let idMap = {}
  let tree = []

  list.forEach(item => {
    idMap[item.id] = item
  })

  list.forEach(v => {
    let parent = idMap[v.pid]
    // debugger
    if (parent) {
      !parent.children && (parent.children = [])
      // parent.children.push(v)
      parent.children[v.idx] = v
      idMap[v.pid] = parent
    } else {
      // tree.push(v)
      tree[v.idx] = v
    }
  })
  return tree
}

const handleList = (tree, list, pid) => {
  tree.forEach((item, idx) => {
    const data = JSON.parse(JSON.stringify(item))
    let newItem = { pid, idx, ...data }
    delete newItem.children
    newItem = JSON.parse(JSON.stringify(newItem))
    // console.log(newItem)
    list.push(newItem)
    if (item.children && item.children.length > 0) {
      handleList(item.children, list, item.id)
    }
  })
}

const toList = (tree) => {
  let list = []
  handleList(tree, list, 'root')
  return list
}

export { toTree, toList }
