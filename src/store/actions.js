import api from '../utils/api'
import {
  convertFee,
  getCache
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
  }, params) => {
    return api.blockDetail(params)
  },
  // 获取交易列表
  getTransactions: ({
    commit,
    state
  }, params) => {
    return api.transactions(params)
  },
  // 获取转账列表‘
  getTransfers: ({
    commit,
    state
  }, params) => {
    return api.getTransfers(params)
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
  // 获取受托人详细信息
  getDelegateDetail: ({
    commit,
    state
  }, params) => {
    return api.delegateDetail(params)
  },
  // 获取资产列表 - 内置需要
  getAssets: async ({
    commit,
    state
  }, params) => {
    let assetMap = getCache('assetMap')
    if (assetMap && assetMap.length > 0) {
      commit('REFRESH_MAP', assetMap)
    } else {
      let result = await api.assets({
        limit: 999
      })
      commit('SET_ASSET_MAP', result.assets)
    }
  },
  // 获取资产数量
  getAssetNum: async ({
    commit,
    state
  }, params) => {
    let result = await api.assets({
      limit: 999
    })
    let count = result.count
    commit('SET_ASSET_NUMBER', count)
  },
  // 获取资产列表 - 获取需要
  getAssetsShow: ({
    commit,
    state
  }, params) => {
    return api.assets(params)
  },
  // 获取资产详情
  getAssetInfo: ({
    commit,
    state
  }, params) => {
    return api.uiaAsset(params)
  },
  // 获取侧链资产持币用户数
  getHolders: ({
    commit,
    state
  }, params) => {
    return api.holders(params)
  },
  // 获取XAS市值
  getXasPrice: async ({
    commit,
    state
  }, params) => {
    let result = await api.xasPrice(params)
    let info = result.marketInfo
    commit('SET_TOTALPRICE', info)
  },
  // 获取受托人产块信息
  getDelegateBlock: ({
    commit,
    state
  }, params) => {
    return api.getDelegateBlock(params)
  },
  setLoadingflag: ({
    commit,
    state
  }, result) => {
    commit('SET_LOADING_FLAG', result)
  }
}
