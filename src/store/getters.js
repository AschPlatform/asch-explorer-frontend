export default {
  getRunState: state => {
    const runState = state.runState
    return [{
        icon: 'icon-token',
        value: Number(runState.totalSupply),
        label: 'TOTAL_SUPPLY'
      },
      {
        icon: 'icon-block-height',
        value: Number(runState.blockHeight),
        label: 'BLOCK_HEIGHT'
      },
      {
        icon: 'icon-totalmarket',
        value: Number(runState.totalPrice),
        after: 'BTC',
        label: 'TOTAL_PRICE'
      },
      {
        icon: 'icon-operating',
        value: Math.floor(
          Math.abs(Date.now() - new Date(2016, 8, 16, 0, 0, 0).getTime()) / (3600 * 24 * 1e3)
        ),
        label: 'RUNNING_DAYS'
      },
      {
        icon: 'icon-issue',
        value: Number(runState.assetCount),
        label: 'ISSUED_NUM'
      },
      {
        icon: 'icon-users',
        value: Number(runState.accountCount),
        label: 'USERS_NUMBER'
      }
    ]
  },
  blockHeight: state => {
    return state.runState.blockHeight
  },
  loadingBool: state => {
    return state.loadingFlag
  },
  // Assets getter
  getPrecision: state => (name) => {
    if (state.assetMap && state.assetMap.get(name)) {
      return state.assetMap.get(name).precision
    }
    return null
  },
  getHeight: state => {
    return state.runState.blockHeight
  },
  assetMap: state => {
    return state.assetMap
  }
}
