function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (`e-${S4() + S4()}`)
}

const getInitStyle = type => {
  let style
  switch (type) {
    case 'div':
      style = 'width:100px;height:50px;border:1px solid #000;'
      break
    case 'span':
      style = 'color:#000;'
      break
  }
  return style
}

export { guid, getInitStyle }
