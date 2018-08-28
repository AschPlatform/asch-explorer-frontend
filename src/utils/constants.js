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
  address: /^[A|G|C][\w]{32,34}$/
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
  development: 'http://mainnet.asch.cn',
  production: 'http://mainnet.asch.cn'
  // production: 'https://webnode.asch.io:443'
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
  blocks: {
    url: '/api/v2/blocks'
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
    url: '/api/v2/uia/assets/:name'
  },
  // uiaAssetList: {
  //   mock: '',
  //   url: '/api/uia/assets'
  // },
  delegates: {
    mock: '/data/vote/delegates.json',
    url: '/api/delegates'
  },
  delegateDetail: {
    mock: '',
    url: '/api/delegates/get'
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
  },
  // 获取指定币种账户数
  holders: {
    url: '/api/v2/uia/assets/:name'
  }

  // 区分 local 与 mainnet 的请求头参数
  // magics: {
  //   development: '5f5b3cf5',
  //   production: '5f5b3cf5'
  // }
}

const transTypes = {
  1: 'TRS_TYPE_TRANSFER',
  2: 'TRS_TYPE_NICKNAME',
  3: 'TRS_TYPE_SECOND_PASSWORD',
  4: 'TRS_TYPE_LOCK',
  5: 'TRS_TYPE_UNLOCK',
  6: 'TRS_TYPE_MULTI_ACCOUNT',
  7: 'TRS_TYPE_REGISTER_AGENT',
  8: 'TRS_TYPE_SET_AGENT',
  9: 'TRS_TYPE_REPEAL_AGENT',
  10: 'TRS_TYPE_DELEGATE',
  11: 'TRS_TYPE_VOTE',
  12: 'TRS_TYPE_REPEAL_VOTE',

  100: 'TRS_TYPE_UIA_ISSUER',
  101: 'TRS_TYPE_UIA_ASSET',
  102: 'TRS_TYPE_UIA_ISSUE',
  103: 'TRS_TYPE_UIA_TRANSFER',
  200: 'TRS_TYPE_DAPP',
  201: 'TRS_TYPE_UPDATE_DAPP_DELEGATE',
  202: 'TRS_TYPE_ADD_DAPP_DELEGATE',
  203: 'TRS_TYPE_DEL_DAPP_DELEGATE',
  204: 'TRS_TYPE_DEPOSIT',
  205: 'TRS_TYPE_WITHDRAWAL',

  300: 'TRS_TYPE_LAUNCH_PROPOSAL',
  301: 'TRS_TYPE_VOTE_PROPOSAL',
  302: 'TRS_TYPE_ACTIVATE_PROPOSAL',

  400: 'TRS_TYPE_REGISTER_GATEWAY',
  401: 'TRS_TYPE_OPEN_GATEWAY_ACCOUNT',
  402: 'TRS_TYPE_GATEWAY_DEPOSIT',
  403: 'TRS_TYPE_GATEWAY_WITHDRAW',
  404: 'TRS_TYPE_GATEWAY_WITHDRAW_CONFIRM',

  500: 'TRS_TYPE_GROUP_VOTE',
  501: 'TRS_TYPE_GROUP_ACTIVE',
  502: 'TRS_TYPE_GROUP_ADDMEMBER',
  503: 'TRS_TYPE_GROUP_REMOVEMEMBER',
  504: 'TRS_TYPE_GROUP_REPLACEMEMBER'
}

export {
  I18N_OPT,
  urls,
  REGEX,
  host,
  transTypes
  // MARKET_STATE,
  // SELECTION_MAP,
}
