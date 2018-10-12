import axios from './axiosWrap'
import {
  urls
} from './constants'
// import {
//   createInTransfer
// } from '../utils/asch'

const json2url = json => {
  var arr = []
  var str = ''
  for (var i in json) {
    str = i + '=' + json[i]
    arr.push(str)
  }
  return arr.join('&')
}

const fetch = (url, data, method, postHeaders) => {
  // TODO test api
  url = url.url
  for (let k in data) {
    if (url.indexOf(':' + k) !== -1) {
      url = url.replace(':' + k, data[k])
      delete data[k]
    }
  }

  // let realUrl = urls.server.caos + url
  let realUrl = urls.serverHost + url
  let type = method.toLowerCase()
  let res = {}
  if (type === 'get') {
    res = axios.get(realUrl + '?' + json2url(data))
  } else if (type === 'post') {
    res = axios.post(realUrl, data, postHeaders)
  } else if (type === 'put') {
    res = axios.put(realUrl, data, postHeaders)
  }
  return res
}

const api = {}

// 账户查询
api.accounts = params => {
  return fetch(urls.accounts, params, 'get')
}

// 获取最新区块 params => generatorPublicKey
api.blocks = params => {
  return fetch(urls.blocks, params, 'get')
}
api.blockDetail = params => {
  return fetch(urls.blocksDetail, params, 'get')
}

// 获取交易列表
api.transactions = params => {
  return fetch(urls.transactions, params, 'get')
}

// 根据 tid 获取交易详情
api.transaction = params => {
  return fetch(urls.hashObject, params, 'get')
}

// 获取账户余额
api.balances = params => {
  return fetch(urls.balances, params, 'get')
}

// //////////////////////////// 以下是频繁调用
// 获取区块高度
api.blockHeight = () => {
  return fetch(urls.getHeight, null, 'get')
}

// 获取总用户数
api.users = () => {
  return fetch(urls.getUsers, null, 'get')
}

// 获取总token数
api.tokens = () => {
  return fetch(urls.getXas, null, 'get')
}
// ////////////////////////////
// 获取区块高度
// ↑以上为简化版API
// 获取指定币种账户余额
api.balance = params => {
  return fetch(urls.balance, params, 'get')
}
// 获取所有发行商
api.issuers = params => {
  return fetch(urls.issuers, params, 'get')
}
// 获取指定发行商
api.issuer = params => {
  return fetch(urls.issuer, params, 'get')
}
// 获取用户发行资产
api.addressAssets = params => {
  return fetch(urls.addressAssets, params, 'get')
}

// 获取所有资产
api.assets = params => {
  return fetch(urls.assets, params, 'get')
}

// 获取指定资产的持币用户数
api.holders = params => {
  return fetch(urls.holders, params, 'get')
}

// 获取转账记录
api.getTransfers = params => {
  return fetch(urls.transfers, params, 'get')
}
// 获取指定账户发行的资产
// api.addressAsset = params => {
//   return fetch(urls.addressAsset, params, 'get')
// }

// 受托人列表
api.delegates = params => {
  return fetch(urls.delegates, params, 'get')
}

// 受托人详情
api.delegateDetail = params => {
  return fetch(urls.delegateDetail, params, 'get')
}

// api.uiaAssetList = params => {
//   return fetch(urls.uiaAssetList, params, 'get')
// }

//  获取资产account
api.uiaAsset = params => {
  return fetch(urls.uiaAssetApi, params, 'get')
}

// 获取XAS市值
api.xasPrice = params => {
  return fetch(urls.price, params, 'get')
}

// 获取受托人产块信息
api.getDelegateBlock = params => {
  return fetch(urls.delegateBlock, params, 'get')
}
// 获取 hash 查询结果
api.getHashResult = params => {
  return fetch(urls.hashObject, params, 'get')
}
// api.deposit = params => {
//   return createInTransfer(urls.dappId[process.env.NODE_ENV], 'koumei.KMC', params.amount, params.secret, params.secondPassword || '')
// }

export default api
