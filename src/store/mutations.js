import {
  setCache,
  convertFee
} from '../utils/util'

export default {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_HEIGHT(state, height) {
    state.runState.blockHeight = height
  },
  SET_SUPPLY(state, amount) {
    state.runState.totalSupply = amount
  },
  SET_USERS(state, amount) {
    state.runState.accountCount = amount
  },
  SET_TOTALPRICE(state, info) {
    let count = info.priceBtc * convertFee(info.totalSupply)
    state.runState.totalPrice = count
  },
  SET_ASSET_NUMBER(state, amount) {
    state.runState.assetCount = amount
  },
  SET_ASSET_MAP(state, assets) {
    let assetMap = new Map()
    assets.forEach(e => {
      assetMap.set(e.name, e)
    })
    setCache('assetMap', assetMap)
    state.assetMap = assetMap
  },
  REFRESH_MAP(state, assetMap) {
    state.assetMap = assetMap
  },
  SET_LOADING_FLAG(state, result) {
    state.loadingFlag = result
  }
}
