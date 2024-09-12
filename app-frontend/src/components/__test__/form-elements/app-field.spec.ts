import {describe, it, beforeAll, expect} from "vitest";
import { mount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import AppField from "@/components/form-elements/app-field.vue"

describe('AppField.vue', () => {
  let wrapper: VueWrapper
  const fieldTitle = "Field title"
  const fieldErrorMessage = "Some error Text"
  const fieldDefaultSlot = "Field default slot"
  
  beforeAll(() => {
    const props = {
      title: fieldTitle,
      errorMessage: fieldErrorMessage,
    } as any
    const slots = {
      default: fieldDefaultSlot
    }
    wrapper = mount(AppField, {props, slots})
  })

  it("check for title and error message", () => {
    const fieldTitleEl = wrapper.find('[data-test-id="app-field-title"]')
    const fieldTitleErrorMessage = wrapper.find('[data-test-id="app-field-message"]')

    expect(fieldTitleEl.text()).toBe(fieldTitle);
    expect(fieldTitleErrorMessage.text()).toBe(fieldErrorMessage)
  })
  
  it("check for slots", () => {
    const field = wrapper.find('[data-test-id="app-field"]')
    
    expect(field.html().includes(fieldDefaultSlot)).toBe(true);
  })
})