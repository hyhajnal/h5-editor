function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (`e-${S4() + S4()}`)
}

const getInit = type => {
  let attr
  switch (type) {
    case 'div':
      attr = {
        style: 'width:100px;height:50px;border:1px solid #000;'
      }
      break
    case 'span':
      attr = {
        style: 'color:#000;',
        config: [
          { name: 'text', title: '文字', type: 'input', data: '文字' }
        ]
      }
      break
  }
  return attr
}

export { guid, getInit }
