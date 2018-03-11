import { expect } from 'chai'
import { toTree, toList } from '../src/utils/transformTree'
import egTree from '../src/utils/page'

const egList = [{
  id: 'e1',
  label: '容器',
  type: 'div',
  style: 'width:100px;height:100px;background:red;',
  pid: 'root',
  idx: 0
}, {
  id: 'e2',
  label: '文字',
  type: 'span',
  text: 'hhhh',
  style: 'width:50px;height:50px;background:pink;',
  pid: 'e1',
  idx: 0
}, {
  id: 'e3',
  label: '容器',
  type: 'div',
  style: 'width:100px;height:100px;background:blue;',
  idx: 1,
  pid: 'root'
}]

describe('树形结构转换', () => {
  it('tree to list', () => {
    console.log(toList(egTree))
    // expect(toList(egTree)).to.be.equal(egList)
  })

  it('list to tree', () => {
    console.log(toTree(egList))
    // expect(toTree(egList))
    //   .to.be.equal(egTree)
  })
})
