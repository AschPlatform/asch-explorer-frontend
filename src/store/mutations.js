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
  }
}
