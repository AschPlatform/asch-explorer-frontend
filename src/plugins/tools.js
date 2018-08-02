import lodash from 'lodash'
import VueClipboards from 'vue-clipboards'

export default ({
  Vue
}) => {
  Vue.use(VueClipboards)
  Vue.prototype._ = lodash
}
