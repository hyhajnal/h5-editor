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

// const treeTravel = (tree, id) => {
//   if (id === 'root') {
//     return new Promise(resolve => resolve(tree))
//   }
//   let result = null
//   for (let i = 0; i < tree.length; i++) {
//     let item = tree[i]
//     if (item.id === id) {
//       console.log(`${item.id}-${id}`)
//       result = item.children
//       break
//     } else if (item.children && item.children.length > 0) {
//       treeTravel(item.children, id)
//     }
//   }
//   if (result) {
//     const p = new Promise(resolve => resolve(result))
//     console.log(p)
//     return p
//   } else {
//     return true
//   }
// }

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

export { toTree, toList, treeTravel }
