import api from '../utils/api'
import {
  convertFee
} from '../utils/util'
// import _ from 'lodash'
// import { getCache } from '../utils/util'

export default {
  // 获取账户详情
  getAccount: ({
    commit,
    state
  }, address) => {
    return api.accounts({
      address
    })
  },
  // 获取账户侧链资产
  getBalance: ({
    commit,
    state
  }, address) => {
    return api.balances({
      address
    })
  },
  // HASH 值查询
  getTransactionInfo: ({
    commit,
    state
  }, tid) => {
    return api.transaction(tid)
  },
  // 获取区块列表
  getBlocks: ({
    commit,
    state
  }, params) => {
    return api.blocks(params)
  },
  // 获取区块详情
  getBlockInfo: ({
    commit,
    state
  }, height) => {
    return api.blockDetail(height)
  },
  // 获取交易列表
  getTransactions: ({
    commit,
    state
  }, params) => {
    return api.transactions(params)
  },
  // 获取区块高度
  getHeight: async ({
    commit,
    state
  }) => {
    let result = await api.blockHeight()
    if (result.success) {
      commit('SET_HEIGHT', result.height)
    }
  },
  // 获取总用户数
  getUsers: async ({
    commit,
    state
  }) => {
    let result = await api.users()
    if (result.success) {
      commit('SET_USERS', result.count)
    }
  },
  // 获取总TOKENS
  getXas: async ({
    commit,
    state
  }) => {
    let result = await api.tokens()
    if (result.success) {
      commit('SET_SUPPLY', convertFee(result.supply))
    }
  },
  // 获取受托人列表
  getDelegates: ({
    commit,
    state
  }, params) => {
    return api.delegates(params)
  },
  // 获取资产列表
  getAssets: async ({
    commit,
    state
  }, params) => {
    let result = await api.assets()
    commit('SET_ASSET_MAP', result.assets)
  },
  // 获取资产详情
  getAssetInfo: ({
    commit,
    state
  }, params) => {
    return api.uiaAsset(params)
  },
  // 获取服务器信息
  getRunState: ({
    commit,
    state
  }) => {
    return api.account()
  }
}
