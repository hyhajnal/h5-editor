// import DATA from './page'

const toTree = data => {
  let list = JSON.parse(JSON.stringify(data))
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
    let newItem = { pid, idx, ...item }
    delete newItem.children
    list.push(newItem)
    if (item.children && item.children.length > 0) {
      handleList(item.children, list, item.id)
    }
  })
}

const toList = (tree) => {
  let list = []
  handleList(tree, list, 'root')
  return JSON.parse(JSON.stringify(list))
}

const treeTravel = (tree, id) => {
  let result = null
  if (id === 'root') {
    return new Promise(resolve => resolve(tree))
  }
  for (let i = 0; i < tree.length; i++) {
    let item = tree[i]
    if (item.id === id) {
      result = item.children
      break
    }
    if (item.children && item.children.length > 0) {
      treeTravel(item.children, id)
    }
  }
  if (result) {
    return new Promise(resolve => resolve(result))
  }
}

export { toTree, toList, treeTravel }
