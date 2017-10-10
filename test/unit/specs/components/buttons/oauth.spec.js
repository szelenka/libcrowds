import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import 'vue-awesome/icons/facebook'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/twitter'

import { mount, createLocalVue } from 'vue-test-utils'
import Oauth from '~/components/buttons/Oauth'

describe('Oauth buttons', () => {
  const localVue = createLocalVue()
  localVue.use(BootstrapVue)
  localVue.component('icon', Icon)

  it('renders all buttons', () => {
    const renderer = require('vue-server-renderer').createRenderer()
    const wrapper = mount(Oauth, {
      localVue,
      propsData: {
        facebook: true,
        google: true,
        twitter: true
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})
