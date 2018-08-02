import api from '../utils/api'
// import _ from 'lodash'
// import { getCache } from '../utils/util'

export default {
  getAccount: ({
    commit,
    state
  }, address) => {
    return api.account(address)
  },
  getRunState: ({
    commit,
    state
  }) => {
    return api.account()
  }
}
