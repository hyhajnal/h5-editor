const toStyleString = (data) => {
  let styleStr = ''
  Object.keys(data).forEach(key => {
    if (key === 'width' && data[key] === 0) {
      return
    }
    if (key === 'height' && data[key] === 0) {
      return
    }
    const value = toStyleStrItem(key, data[key])
    styleStr = `${styleStr}${key}:${value};`
  })
  return styleStr
}

function toStyleStrItem (key, value) {
  let result = ''
  switch (key) {
    case 'width':
      // result = value === 0 ? '100%' : `${value}px`
      result = `${value}px`
      break
    case 'height':
      result = `${value}px`
      break
    case 'top':
      result = `${value}px`
      break
    case 'bottom':
      result = `${value}px`
      break
    case 'left':
      result = `${value}px`
      break
    case 'right':
      result = `${value}px`
      break
    case 'margin':
      result = `${value[0]}px ${value[1]}px ${value[2]}px ${value[3]}px`
      break
    case 'padding':
      result = `${value[0]}px ${value[1]}px ${value[2]}px ${value[3]}px`
      break
    case 'border':
      result = `${value[0]}px ${value[1]} ${value[2]}`
      break
    case 'borderRadius':
      result = `${value[0]}${value[1]}`
      break
    case 'fontWeight':
      result = value * 10
      break
    case 'fontSize':
      result = `${value}px`
      break
    default:
      result = value
  }
  return result
}

const toStyleObj = (str) => {
  const data = str.split(';')
  let styleObj = {}
  data.splice(data.length - 1, 1)
  data.forEach(itemStr => {
    const item = itemStr.split(':')
    let itemobj = {}
    itemobj[item[0]] = toStyleObjItem(item[0], item[1])
    styleObj = {...styleObj, ...itemobj}
  })
  return styleObj
}

function toStyleObjItem (key, value) {
  let result = ''
  switch (key) {
    case 'width':
      if (value === '100%') {
        result = 0
      } else {
        result = parseInt(value.split('px')[0])
      }
      break
    case 'height':
      result = parseInt(value.split('px')[0])
      break
    case 'top':
      result = parseInt(value.split('px')[0])
      break
    case 'bottom':
      result = parseInt(value.split('px')[0])
      break
    case 'left':
      result = parseInt(value.split('px')[0])
      break
    case 'right':
      result = parseInt(value.split('px')[0])
      break
    case 'margin':
      let dataM = value.split(' ')
      result = dataM.map(item => parseInt(item.split('px')[0]))
      break
    case 'padding':
      let dataP = value.split(' ')
      result = dataP.map(item => parseInt(item.split('px')[0]))
      break
    case 'border':
      const dataB = value.split(' ')
      result = [parseInt(dataB[0].split('px')[0]), dataB[1], dataB[2]]
      break
    case 'borderRadius':
      if (value.indexOf('%') > -1) {
        result = [parseInt(value.split('%')[0]), '%']
      } else {
        result = [parseInt(value.split('px')[0]), 'px']
      }
      break
    case 'fontSize':
      result = parseInt(value.split('px')[0])
      break
    case 'fontWeight':
      if (value === 'normal') {
        result = 40
      } else if (value === 'bold') {
        result = 70
      } else {
        result = value / 10
      }
      break
    default:
      result = value
  }
  return result
}

// const styleToClass = (tree, s) => {
//   let str = s || ''
//   console.log('hh', s)
//   tree.forEach((item, idx) => {
//     str = `${str}.${item.id}{${item.style}}`
//     if (item.children && item.children.length > 0) {
//       debugger
//       styleToClass(item.children, str)
//     }
//   })
//   return str
// }

const styleToClass = (tree, s) => {
  let q = []
  let str = ''
  tree.forEach(item => {
    q.push(item)
  })
  // console.dir(q)
  while (q.length > 0) {
    let node = q.shift()
    str = `${str}.${node.id}{${node.style}}`
    if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        q.push(item)
      })
    }
  }
  return str
}

export { toStyleObj, toStyleString, styleToClass }
