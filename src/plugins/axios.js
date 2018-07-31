import axios from '../utils/axiosWrap'
import lodash from 'lodash'

export default ({
  Vue
}) => {
  Vue.prototype.$axios = axios
  Vue.prototype._ = lodash
}
