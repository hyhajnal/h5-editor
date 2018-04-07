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
  if (id === 'root') {
    return new Promise(resolve => resolve(tree))
  }
  let q = []
  tree.forEach(item => {
    q.push(item)
  })
  // console.dir(q)
  while (q.length > 0) {
    let node = q.shift()
    if (node.id === id) {
      return new Promise(resolve => resolve(node.children))
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        q.push(item)
      })
    }
  }
}

/**
 * 模块编辑转换
 */
const moduleSelect = function (tree, ids, pid) {
  let newElements = []
  treeTravel(tree, pid).then(list => {
    list.forEach(item => {
      if (ids.indexOf(item.id) > -1) {
        item.pid = 'root'
        newElements.push(item)
      }
    })
    const mod = {
      id: 'mod-demo',
      name: '模块-demo',
      elements: newElements
    }
    return new Promise(resolve => resolve(mod))
  })
}

export { toTree, toList, treeTravel, moduleSelect }
