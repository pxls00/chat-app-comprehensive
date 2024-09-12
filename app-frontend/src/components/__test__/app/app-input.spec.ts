import {describe, beforeAll, afterEach, it, expect} from "vitest"
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import AppInput from '@/components/app/app-input.vue'

describe('AppInput.vue', () => {
  let wrapper: VueWrapper;

  beforeAll(() => {
    wrapper = mount(AppInput, {
      props: {
        loading: false,
        size: "small",
        modelValue: "",
        'onUpdate:modelValue': (e:string) => wrapper.setProps({ modelValue: e })
      },
    })
  })

  afterEach(() => {
    wrapper.vm.$forceUpdate()
  })

  it('v-model updating correctly', async () => {
    await wrapper.find('input').setValue('test')
    expect(wrapper.props("modelValue" as never)).toBe('test')
  })

  it('check for input size class', async () => {
    const inputEl = wrapper.find('input');
    expect(inputEl.classes()).toContain('py-[10px]')
    expect(inputEl.classes()).toContain('px-[8px]')
  })
})