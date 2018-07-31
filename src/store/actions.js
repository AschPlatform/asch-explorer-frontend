import api from '../utils/api'
// import _ from 'lodash'
// import { getCache } from '../utils/util'

export default {
  // 获取账户详情
  getAccount: ({
    commit,
    state
  }, address) => {
    return api.accounts(address)
  },
  // HASH 值查询
  getTransactionInfo: ({commit, state}, tid) => {
    return api.transaction(tid)
  },
  // 获取区块列表
  getBlocks: ({commit, state}, params) => {
    return api.blocks(params)
  },
  // 获取交易列表
  getTransactions: ({commit, state}, params) => {
    return api.transactions(params)
  },
  // 获取受托人列表
  getDelegates: ({commit, state}, params) => {
    return api.delegates(params)
  },
  // 获取资产列表
  getAssets: ({commit, state}, params) => {
    return api.assets(params)
  },
  // 获取资产详情
  getAssetInfo: ({commit, state}, params) => {
    return api.uiaAsset(params)
  }
}
