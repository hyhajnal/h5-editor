import { expect } from 'chai'
import { toTree, toList } from '../src/utils/transformTree'
import egTree from '../src/utils/page'

const egList = [{
  id: 'e1',
  label: '容器',
  type: 'div',
  style: 'width:100px;height:100px;background:red;',
  pid: 0
}, {
  id: 'e2',
  label: '文字',
  type: 'span',
  text: 'hhhh',
  style: 'width:50px;height:50px;background:pink;',
  pid: 'e1'
}, {
  id: 'e3',
  label: '容器',
  type: 'div',
  style: 'width:100px;height:100px;background:blue;',
  pid: 0
}]

describe('树形结构转换', () => {
  it('tree to list', () => {
    expect(toList(egTree, 0, [])).to.be.equal(egList)
  })

  it('list to tree', () => {
    expect(toTree(egList))
      .to.be.equal(egTree)
  })
})
