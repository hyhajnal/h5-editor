function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (`e-${S4() + S4()}`)
}

function getInit (type) {
  let attr
  switch (type) {
    case 'div':
      attr = {
        style: 'width:100%;height:100px;border:1px solid #ccc;'
      }
      break
    case 'span':
      attr = {
        style: 'color:#000;',
        config: [
          { name: 'text', label: '文字', type: 'input', data: '文字' }
        ]
      }
      break
    case 'img':
      attr = {
        style: 'display:inline-block;width:100px;height:80px;',
        config: [
          { name: 'url', label: 'url', type: 'input', data: '' }
        ]
      }
      break
    case 'icon':
      attr = {
        style: 'display:inline;',
        config: [
          { name: 'name', label: '图标名', type: 'input', data: 'icon-info' }
        ]
      }
      break
    default:
      attr = {}
  }
  return attr
}

const mobiles = [
  {
    label: 'iPhone7',
    width: 375,
    height: 667
  }, {
    label: 'iPhone7Plus',
    width: 414,
    height: 736
  }, {
    label: 'iPhone5s',
    width: 320,
    height: 568
  }, {
    label: 'iPhoneX',
    width: 375,
    height: 812
  }
]

function px2rem (value) {
  if (value) {
    value = value / 75
    value = parseFloat(value).toFixed(6)
    return (value + 'rem')
  }
  return null
}

function createModule ({elements, pid, developer, name}) {
  let mod = {
    id: `m/${guid()}`,
    name,
    elements,
    pid,
    developer,
    classId: {},
    components: {}
  }
  return mod
}

function createTempl ({elements, name}) {
  let templ = {
    id: `t/${guid()}`,
    name,
    elements
  }
  return templ
}

export { guid, getInit, mobiles, px2rem, createModule, createTempl }
