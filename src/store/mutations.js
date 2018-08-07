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
  SET_ASSET_MAP(state, assets) {
    let assetMap = new Map()
    assets.forEach(e => {
      assetMap.set(e.name, e)
    })
    state.assetMap = assetMap
  }
}
