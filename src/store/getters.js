export default {
  getRunState: state => {
    const runState = state.runState
    return [{
        icon: 'icon-icon_block-height',
        value: Number(runState.blockHeight),
        label: 'BLOCK_HEIGHT'
      },
      {
        icon: 'icon-icon_Token',
        value: Number(runState.totalSupply),
        label: 'TOTAL_SUPPLY'
      },
      {
        icon: 'icon-icon_Numberof-users',
        value: Number(runState.accountCount),
        label: 'USERS_NUMBER'
      },
      {
        icon: 'icon-icon_Operating-days',
        value: Math.floor(
          Math.abs(Date.now() - new Date(2016, 8, 16, 0, 0, 0).getTime()) / (3600 * 24 * 1e3)
        ),
        label: 'RUNNING_DAYS'
      },
      {
        icon: 'icon-icon_issue',
        value: Number(runState.assetCount),
        label: 'ISSUED_NUM'
      },
      {
        icon: 'icon-icon_Totalmarket-value',
        value: Number(runState.totalPrice),
        label: 'TOTAL_PRICE'
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
