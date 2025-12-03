import { CButton, CForm } from '@coreui/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ConnectForm from '@/components/ConnectForm.vue'

describe('ConnectForm', () => {
  let wrapper

  const findForm = () => wrapper.findComponent(CForm)
  const findProjectInput = () => wrapper.find('input[placeholder="Your project full path"]')
  const findTokenInput = () => wrapper.find('input[placeholder="Your API token"]')
  const findSubmitBtn = () => wrapper.findComponent(CButton)

  const setConnectionFormData = async () => {
    await findProjectInput().setValue('gitlab-org/gitlab')
    await findTokenInput().setValue('glpat-xxxxx')
    await findForm().trigger('submit')
  }

  const createComponent = () => {
    wrapper = mount(ConnectForm)
  }

  beforeEach(() => {
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    }

    vi.stubGlobal('localStorage', localStorageMock)

    createComponent()
  })

  it('displays form inputs and button', () => {
    expect(findProjectInput().exists()).toBe(true)
    expect(findTokenInput().exists()).toBe(true)
    expect(findSubmitBtn().exists()).toBe(true)
  })

  it('emits connection data', async () => {
    await setConnectionFormData()

    expect(wrapper.emitted('analyze')).toEqual([
      [
        {
          project: 'gitlab-org/gitlab',
          token: 'glpat-xxxxx',
        },
      ],
    ])
  })

  it('sets localStorage values', async () => {
    await setConnectionFormData()

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'glpat-xxxxx')
    expect(localStorage.setItem).toHaveBeenCalledWith('project', 'gitlab-org/gitlab')
  })
})
