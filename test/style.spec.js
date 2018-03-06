import { expect } from 'chai'
import { toStyleString, toStyleObj } from '../src/utils/transformStyle'

const egStyleObj = {
  width: 20,
  padding: [10, 10, 20, 30],
  border: [1, 'solid', '#ccc']
}

const egStyleStr = 'width:20px;padding:10px 10px 20px 30px;border:1px solid #ccc;'

describe('样式转换', () => {
  it('string to obj', () => {
    expect(toStyleObj(egStyleStr)).to.be.equal(egStyleObj)
  })

  it('obj to string', () => {
    // console.log(toStyleString(egStyleObj))
    expect(toStyleString(egStyleObj))
      .to.be.equal(egStyleStr)
  })
})
