// model alike
const I18N_OPT = [{
    label: '中文简体',
    value: 'zh'
  },
  {
    label: 'English',
    value: 'en'
  }
]

const REGEX = {
  hash: /([a-fA-F0-9]{64})/,
  height: /^\+?[1-9][0-9]*$/,
  address: /^A[\w]{32,34}$/
}
// const STATE_MAP = {
//   1: 'CHARGE',
//   2: 'WITHDRAW',
//   3: 'TRANSFER',
//   4: 'SETNICK',
//   1000: 'LAUNCH_MARKET',
//   1001: 'DEAL',
//   1002: 'CLEAR_DEAL',
//   1003: 'REVEAL',
//   1004: 'APPEAL',
//   1005: 'VERDICT',
//   1006: 'COMMENT',
//   1007: 'STATE_CHANGE'
// }

const host = {
  development: 'http://192.168.1.78:7800',
  production: 'http://47.75.26.200:8192'
}
// const dappId = {
//   development: '91a9aeeaa6609ebd73afc7c542eec02e7510c23a65d2e1db2840c46f74f67ceb',
//   production: '91a9aeeaa6609ebd73afc7c542eec02e7510c23a65d2e1db2840c46f74f67ceb'
// }

const urls = {
  host,
  // dappId,
  // server: {
  //   development: `${host.development}/api/dapps/${dappId.development}`,
  //   production: `${host.production}/api/dapps/${dappId.production}`
  // },

  mainUserBalance: {
    url: '/api/uia/balances/'
  },
  // 账户查询(xas left) ps: name params is avaliable now
  // 获取账户余额(所有侧脸资产))
  balances: {
    url: '/api/v2/balances/:address'
  },
  accounts: {
    url: '/api/v2/accounts/:address'
  },
  // 获取交易列表
  transactions: {
    url: '/api/v2/transactions'
  },
  // 区块基本信息（height）
  blocksDetail: {
    mock: '/data/blockDetail/getblocks.json',
    url: '/api/blocks/get'
  },
  // 根据 tid 获取交易详情
  transaction: {
    url: '/api/v2/transactions/:tid'
  },
  uiaAssetApi: {
    mock: '',
    url: '/api/uia/assets/:name'
  },
  uiaAssetList: {
    mock: '',
    url: '/api/uia/assets'
  },
  delegates: {
    mock: '/data/vote/delegates.json',
    url: '/api/delegates'
  },
  // 获取转账记录
  transfers: {
    url: '/api/v2/transfers'
  },
  // 获取区块高度
  getHeight: {
    url: '/api/blocks/getheight'
  },
  // 获取总用户数
  getUsers: {
    url: '/api/accounts/count'
  },
  // 获取总token数
  getXas: {
    url: '/api/blocks/getsupply'
  },
  // 获取所有发行商
  issuers: {
    url: '/api/v2/uia/issuers'
  },
  // 获取指定发行商
  issuer: {
    url: '/api/v2/uia/issuers/:address'
  },
  // 获取所有资产
  assets: {
    url: '/api/v2/uia/assets'
  },
  // 获取指定账户发行的资产
  addressAssets: {
    url: '/api/v2/uia/issuers/:address/assets'
  },
  // 获取指定币种账户余额
  balance: {
    url: '/api/v2/balances/:address/:currency'
  }

  // 区分 local 与 mainnet 的请求头参数
  // magics: {
  //   development: '5f5b3cf5',
  //   production: '5f5b3cf5'
  // }
}

export {
  I18N_OPT,
  urls,
  REGEX,
  host
  // MARKET_STATE,
  // SELECTION_MAP,
}
