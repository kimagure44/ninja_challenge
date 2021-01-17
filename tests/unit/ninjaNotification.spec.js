import { mount } from '@vue/test-utils'
import NinjaNotification from '@/components/ninjaNotification.vue'

describe('NinjaNotification.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = mount(NinjaNotification)
  })
  it('Checked if notification component it is render', () => {
    expect(wrapper.findComponent({ name: 'NinjaNotification' }).exists()).toBe(true)
  })

  it('Checked if the class update when the "typeNotification" property changed to "success"', async () => {
    await wrapper.setProps({ typeNotification: 'success' });
    expect(wrapper.vm.updateClass).toEqual(expect.arrayContaining(['is-success']));
  })

  it('Checked if the class update when the "typeNotification" property changed to "danger"', async () => {
    await wrapper.setProps({ typeNotification: 'danger' });
    expect(wrapper.vm.updateClass).toEqual(expect.arrayContaining(['is-danger']));
  })

  it('Checked if the class update when the "showNotification" property changed to "true"', async () => {
    await wrapper.setProps({ showNotification: true });
    expect(wrapper.vm.updateClass).toEqual(expect.arrayContaining(['show-notification']));
  })

  it('Checked if the class update when the "showNotification" property changed to "false"', async () => {
    await wrapper.setProps({ showNotification: false });
    expect(wrapper.vm.updateClass).toEqual(expect.arrayContaining(['hide-notification']));
  })

/*
  it('Check if modal component is displayed', async () => {
    await wrapper.setProps({ showModal: true })
    expect(wrapper.classes('is-active')).toBe(true)
  })

  it('check if modal component is displayed with the property showModal equals true', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.classes('is-active')).toBe(false)
  })

  it('check if modal component is not displayed with the property showModal equals false', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.classes('is-active')).toBe(false)
  })

  it('Check if modal component closes', async () => {
    await wrapper.vm.closeModal()
    expect(wrapper.vm.show).toBe(false)
  })
  */
})
