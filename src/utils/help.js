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
        style: 'height:100px;border:1px solid #ccc;',
        config: [
          { name: 'p', label: '父元素', type: 'bool', data: false },
          { name: 'dir', label: '主轴方向', type: 'select', options: ['top', 'right', 'bottom', 'left'], data: 'left', show: 1 },
          { name: 'main', label: '主轴对齐方式', type: 'select', options: ['right', 'left', 'justify', 'center'], data: 'left', show: 1 },
          { name: 'cross', label: '交叉轴对齐方式', type: 'select', options: ['top', 'bottom', 'baseline', 'center', 'stretch'], data: 'top', show: 1 },
          { name: 'box', label: '子元素设置', type: 'select', options: ['', 'mean', 'first', 'last', 'justify'], data: '', show: 1 },
          { name: 'c', label: '子元素', type: 'bool', data: false },
          { name: 'flex-box', label: '子元素', type: 'number', data: 0, show: 6 }
        ]
      }
      break
    case 'span':
      attr = {
        style: 'display:inline-block;color:#000;',
        config: [
          { name: 'text', label: '文字', type: 'input', data: '文字' }
        ]
      }
      break
    case 'h1':
      attr = {
        style: 'color:#555;fontSize:16px;',
        config: [
          { name: 'text', label: '文字', type: 'input', data: '标题' }
        ]
      }
      break
    case 'p':
      attr = {
        style: 'color:#888;fontSize:14px;',
        config: [
          { name: 'text', label: '文字', type: 'input', data: '这是一段描述文字' }
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
