const toStyleString = (data) => {
  let styleStr = 'position: relative;'
  Object.keys(data).forEach(key => {
    if (('width|height'.indexOf(key) > -1) && data[key] === 0) {
      return
    }
    if (('border|borderRadius'.indexOf(key) > -1) && data[key][0] === 0) {
      return
    }
    if (('top|bottom|left|right'.indexOf(key) > -1) && data[key] === undefined) {
      return
    }
    if (('margin|padding'.indexOf(key) > -1) && data[key].toString() === '0,0,0,0') {
      return
    }
    const value = toStyleStrItem(key, data[key])
    styleStr = `${styleStr}${key}:${value};`
  })
  return styleStr
}

// 处理 padding,margin 的格式
function fourValue (v1, v2, v3, v4) {
  if (v1 === v3 && v2 === v4) {
    return `${v1}px ${v2}px`
  } else if ((v1 === v3 && v2 === v4 && v1 === v2)) {
    return `${v1}px`
  } else {
    return `${v1}px ${v2}px ${v3}px ${v4}px`
  }
}

function toStyleStrItem (key, value) {
  let result = ''
  switch (key) {
    case 'width':
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
      result = fourValue(value[0], value[1], value[2], value[3])
      break
    case 'padding':
      result = fourValue(value[0], value[1], value[2], value[3])
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
    case 'zIndex':
      result = parseInt(value)
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

const htmlRenderEle = (item) => {
  let str = ''
  str += `<${item.type} class="${item.className || item.id}">`
  if (item.children && item.children.length > 0) {
    item.children.forEach(child => {
      str += `${htmlRenderEle(child)}`
    })
  }
  str += `</${item.type}>`
  return str
}

const htmlRender = (tree, s) => {
  let str = s || ''
  tree.forEach((item, idx) => {
    str += htmlRenderEle(item)
  })
  return str
}

const styleToClass = (tree, s) => {
  let q = []
  let str = ''
  tree.forEach(item => {
    q.push(item)
  })
  // console.dir(q)
  while (q.length > 0) {
    let node = q.shift()
    if (node.style) {
      let classStr = `.${node.className || node.id}`
      str = `${str}${classStr}{${node.style}}`
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(item => {
        q.push(item)
      })
    }
  }
  return str
}

export { toStyleObj, toStyleString, styleToClass, htmlRender }
