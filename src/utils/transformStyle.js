const toStyleString = (data) => {
  let styleStr = ''
  Object.keys(data).forEach(key => {
    const value = toStyleStrItem(key, data[key])
    styleStr = `${styleStr}${key}:${value};`
  })
  return styleStr
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
    case 'margin':
      result = `${value[0]}px ${value[1]}px ${value[2]}px ${value[3]}px`
      break
    case 'padding':
      result = `${value[0]}px ${value[1]}px ${value[2]}px ${value[3]}px`
      break
    case 'border':
      result = `${value[0]}px ${value[1]} ${value[2]}`
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
      result = parseInt(value.split('px')[0])
      break
    case 'height':
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
    default:
      result = value
  }
  return result
}

export { toStyleObj, toStyleString }
