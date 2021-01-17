import { Utils } from '../../src/utils/utils'
describe('utils.js', () => {
  it('isEmpty function with text', () => {
    const result = Utils.isEmpty('Example')
    expect(result).toBe(false)
  })
  it('isEmpty function without text', () => {
    const result = Utils.isEmpty('')
    expect(result).toBe(true)
  })
  it('isEmail function with email valid', () => {
    const result = Utils.isEmail('test@test.com')
    expect(result).toBe(true)
  })
  it('isEmail function with email invalid', () => {
    let result = Utils.isEmail('test@test')
    expect(result).toBe(false)
    result = Utils.isEmpty('test@')
    expect(result).toBe(false)
    result = Utils.isEmpty('test')
    expect(result).toBe(false)
  })
  it('dateFormat function', () => {
    const result = Utils.dateFormat('10/10/2021')
    expect(result).toBe('2021/10/10')
  })
})
