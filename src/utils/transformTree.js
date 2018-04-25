// import DATA from './page'
import { guid } from '@/utils/help'

function toTree (data) {
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

function handleList (tree, list, pid) {
  tree.forEach((item, idx) => {
    let newItem = { pid, idx, ...item }
    delete newItem.children
    list.push(newItem)
    if (item.children && item.children.length > 0) {
      handleList(item.children, list, item.id)
    }
  })
}

function toList (tree) {
  let list = []
  handleList(tree, list, 'root')
  return JSON.parse(JSON.stringify(list))
}

/**
 * 根据 pid 返回 children
 * @param {*} tree
 * @param {*} pid
 */
function treeTravel (tree, pid) {
  if (pid === 'root') {
    return new Promise(resolve => resolve(tree))
  }
  let q = []
  tree.forEach(item => {
    q.push(item)
  })
  // console.dir(q)
  while (q.length > 0) {
    let node = q.shift()
    if (node.id === pid) {
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
 * 根据 pid 返回 children
 * @param {*} tree
 * @param {*} id
 */
function treeTravelById (tree, id) {
  let q = []
  tree.forEach(item => {
    q.push(item)
  })
  while (q.length > 0) {
    let node = q.shift()
    if (node.id === id) {
      return new Promise(resolve => resolve(node))
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        q.push(item)
      })
    }
  }
}

/**
 * 模块编辑转换: 将ids -> element
 */
function moduleSelect (tree, ids) {
  let elements = []
  let q = []
  tree.forEach(item => {
    q.push(item)
  })
  while (q.length > 0) {
    let node = q.shift()
    if (ids.indexOf(node.id) > -1) {
      node.pid = 'root'
      elements.push(node)
    } else if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        q.push(item)
      })
    }
  }
  return new Promise(resolve => resolve(elements))
}

/**
 * 复制包含多个子元素的元素，改变所有的id
 */
function copyElorTempl (el, pid) {
  const id = guid()
  el.id = id
  el.pid = pid
  el.label = `${el.type}/${id}`
  if (el.children && el.children.length > 0) {
    el.children.forEach(item => {
      copyElorTempl(item, id)
    })
  }
}

export { toTree, toList, treeTravel, moduleSelect, treeTravelById, copyElorTempl }
