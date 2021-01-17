import { mount } from '@vue/test-utils'
import NinjaTable from '@/components/ninjaTAble.vue'

describe('NinjaTable.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = mount(NinjaTable)
  })
  it('Checked if modal component it is render', () => {
    expect(wrapper.findComponent({ name: 'NinjaTable' }).exists()).toBe(true)
  })

  /*
  it('Checked if modal component is displayed', async () => {
    await wrapper.setProps({ showModal: true })
    expect(wrapper.classes('is-active')).toBe(true)
  })

  it('checked if modal component is displayed with the property showModal equals true', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.classes('is-active')).toBe(false)
  })

  it('checked if modal component is not displayed with the property showModal equals false', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.classes('is-active')).toBe(false)
  })

  it('Checked if modal component closes', async () => {
    await wrapper.vm.closeModal()
    expect(wrapper.vm.show).toBe(false)
  })
  */
})
