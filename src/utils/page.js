import { toList } from '@/utils/transformTree'

const DATA = [{
  id: 'e1',
  label: '容器-e1',
  type: 'div',
  style: 'width:100px;height:100px;background:red;',
  pid: 'root',
  children: [{
    id: 'e2',
    label: '文字-e2',
    type: 'span',
    text: 'hhhh',
    style: 'width:50px;height:50px;background:pink;',
    pid: 'e1'
  }, {
    id: 'e6',
    label: '文字-e6',
    type: 'span',
    text: 'hhhh',
    style: 'width:50px;height:50px;background: #555;',
    pid: 'e1'
  }]
}, {
  id: 'e4',
  label: '容器-e4',
  type: 'div',
  style: 'width:100px;height:50px;background:orange;',
  pid: 'root',
  children: [{
    id: 'e5',
    label: '文字-e5',
    type: 'span',
    text: 'jkbjkb',
    style: 'color: #000;',
    pid: 'e4'
  }]
}, {
  id: 'e7',
  label: '容器-e7',
  type: 'div',
  style: 'width:100px;height:100px;background:blue;',
  children: [],
  pid: 'e4'
}]

const LIST = toList(DATA)

export { LIST, DATA }

// export default DATA
