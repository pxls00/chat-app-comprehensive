import { describe, beforeAll, afterEach, expect, it  } from "vitest"
import {mount ,shallowMount} from "@vue/test-utils"
import type {VueWrapper} from "@vue/test-utils"
import AppButton from '../../app/app-button.vue'


describe('AppButton.vue', () => {
  let wrapper: VueWrapper;

  beforeAll(() => {
    const props = {
      loading: false,
      type: "button",
      color: "default",
      size: "small",
    } as any
    wrapper = shallowMount(AppButton, {props})
  })

  afterEach(() => {
    wrapper.vm.$forceUpdate()
  })


  it('renders correctly with default type', () => {
    // wrapper = mount(AppButton)
    
    // wrapper.setProps(props);
    const button = wrapper.find('[data-test-id="app-button"]')
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
  })
})
