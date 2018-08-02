export default {
  getRunState: state => {
    const runState = state.runState
    return [{
        icon: 'insert_chart_outlined',
        value: runState.blockHeight,
        label: 'BLOCK_HEIGHT'
      },
      {
        icon: 'bubble_chart',
        value: runState.totalSupply,
        label: 'TOTAL_SUPPLY'
      },
      {
        icon: 'people_outline',
        value: runState.accountCount,
        label: 'USERS_NUMBER'
      },
      {
        icon: 'bar_chart',
        value: Math.floor(
          Math.abs(Date.now() - new Date(2016, 8, 16, 0, 0, 0).getTime()) / (3600 * 24 * 1e3)
        ),
        label: 'RUNNING_DAYS'
      }
    ]
  }
}
