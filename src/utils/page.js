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
    config: [
      { name: 'text', lable: '文字', type: 'input', data: '监控设备' }
    ],
    style: 'width:50px;height:50px;background:pink;',
    pid: 'e1',
    children: []
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
    config: [
      { name: 'text', label: '文字', type: 'input', data: 'sajfg' }
    ],
    style: 'color: #000;',
    pid: 'e4',
    children: []
  }]
}, {
  id: 'e7',
  label: '容器-e7',
  type: 'div',
  style: 'width:100px;height:100px;background:blue;',
  children: [],
  pid: 'root'
}, {
  id: 'e6',
  label: '文字-e6',
  type: 'span',
  config: [
    { name: 'text', label: '文字', type: 'input', data: '数据库表' }
  ],
  style: 'width:50px;height:50px;background: #555;',
  pid: 'root',
  children: []
}]

const LIST = toList(DATA)

export { LIST, DATA }

// export default DATA
