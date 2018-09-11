import {
  SessionStorage,
  LocalStorage,
  Notify,
  Dialog,
  Platform
} from 'quasar'
import moment from 'moment'
import AschJs from 'asch-js'
import {
  BigNumber
} from 'bignumber'
import {
  transTypes
} from '../utils/constants'

// confirm compontent
export const confirm = (conf, cancel = () => {}, confirm = () => {}) => {
  Dialog.create({
      title: conf.title || 'Confirm',
      message: conf.message,
      ok: conf.confirm || 'Agree',
      cancel: conf.cancel || 'Disagree'
    })
    .then(() => {
      confirm()
    })
    .catch(() => {
      cancel()
    })
}
export const prompt = (config, cb = () => {}, cbCancel = () => {}) => {
  Dialog.create({
      title: config.title || 'Prompt',
      message: config.message || '',
      prompt: config.prompt,
      cancel: config.cancel || true,
      color: config.color || 'primary'
    })
    .then(data => {
      cb(data)
    })
    .catch(e => {
      cbCancel(e)
    })
}
// toast components
export const toast = (message, timeout = 1500) => {
  const type = 'positive'
  const color = 'positive'
  const position = 'bottom'
  Notify.create({
    message,
    type,
    color,
    position,
    timeout
  })
}

export const toastError = (message, timeout = 1500) => {
  const type = 'negative'
  const color = 'negative'
  const position = 'bottom'

  Notify.create({
    message,
    type,
    color,
    position,
    timeout
  })
}

export const toastWarn = (message, timeout = 1500) => {
  const type = 'warning'
  const color = 'warning'
  const position = 'bottom'
  Notify.create({
    message,
    type,
    color,
    timeout,
    position
  })
}

export const deCompileContent = value => {
  return JSON.parse(value)
}

export const countDown = (timestamp) => {
  moment.locale('zh-cn')
  return moment(timestamp).endOf('hour').fromNow()
}
// server error message translator
export const translateErrMsg = (t, input) => {
  if (typeof input === 'string') {
    input = input.split(':')
    input = input[input.length - 1]
    var translateMap = [{
        error: 'Failed to verify second signature',
        key: 'ERR_TOAST_SECONDKEY_WRONG'
      },
      {
        error: 'Invalid transaction amount',
        key: 'ERR_TOAST_SECONDKEY_WRONG'
      },
      {
        error: 'Asset not exists',
        key: 'ERR_TOAST_ASSET_NOTEXIST'
      },
      {
        error: 'Insufficient balance',
        key: 'ERR_TOAST_ASSET_INSUFFICIENT'
      },
      {
        error: 'Voting limit exceeded. Maximum is 33 votes per transaction',
        key: 'ERR_TOAST_VOTE_LIMIT'
      },
      {
        error: 'Account is locked',
        key: 'ERR_TOAST_ACCOUNT_ALREADY_LOCKED'
      },
      {
        error: 'Invalid recipient',
        key: 'ERR_TOAST_ACCOUNT_INVALID_RECIPIENT'
      },
      {
        error: 'timestamp',
        key: 'ERR_TOAST_ACCOUNT_INVALID_TIMESTAMP'
      },
      {
        error: 'Have no valid shares of correct choice in this marke',
        key: 'ERR_TOAST_CHOICE_NOT_VALID'
      },
      {
        error: 'Already had been settled',
        key: 'ERR_TOAST_CHOICE_ALREADY_SETTLED'
      },
      {
        error: 'Invalid lock height',
        key: 'Invalid lock height'
      }
    ]

    for (var idx = 0; idx < translateMap.length; idx++) {
      if (input.indexOf(translateMap[idx].error) > -1) {
        toastError(t(translateMap[idx].key))
        return
      }
    }
    toastError(input)
  }
}

export const setLocal = (key, value) => {
  return LocalStorage.set(key, value)
}
export const getLocal = key => {
  return getCache(key)
}

// get storage (session/local) with different device
export const getStorage = () => {
  return isDesktop() ? SessionStorage : LocalStorage
  // return SessionStorage
}
// sessionstorage functions
export const setCache = (key, value) => {
  return getStorage().set(key, value)
}
export const getCache = key => {
  return getStorage().get.item(key)
}
export const removeCache = key => {
  return getStorage().remove(key)
}
// get device is desktop or not
export const isDesktop = () => {
  return Platform.is.desktop
}
export const isCordova = () => {
  return Platform.is.cordova
}

export const convertFee = (fee, precision = 8) => {
  if (precision === null || precision === undefined) {
    precision = 8
  }
  if (!fee) {
    return 0
  }
  fee = fee.toString()
  var clearView = false
  while (fee.length < (precision + 1)) {
    fee = '0'.concat(fee)
  }
  if (precision !== 0) {
    fee = fee.slice(0, -precision).concat('.', fee.slice(-precision))
    while (!clearView) {
      if (fee[fee.length - 1] === '0') {
        fee = fee.slice(0, fee.length - 1)
      } else {
        clearView = true
      }
    }
  }

  if (fee[fee.length - 1] === '.') {
    fee = fee.slice(0, fee.length - 1)
  }
  return fee
}
export const dealBigNumber = num => {
  let dealNumB = new BigNumber(num)
  let dealNum = dealNumB.toFormat(0).toString()
  return dealNum.replace(/,/g, '')
}
export const dealGiantNumber = (num, precision) => {
  let bunch = ''
  let tail = (function () {
    for (let i = 0; i < precision; i++) {
      bunch = bunch + '0'
    }
    return bunch
  })()
  return num + tail
}

// Non-aschJS support really time computed
export const fulltimestamp = (timeStamp, short = false) => {
  let timestamp1 = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0))
  timestamp1 = timestamp1 / 1000
  timeStamp += timestamp1
  var date = new Date()
  date.setTime(timeStamp * 1000)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  if (short) return y + '-' + m + '-' + d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

// get translated type by transaction arg
export const getTransType = (trans, t) => {
  let {
    type,
    args
  } = trans
  let typeFilters = [1, 103, 204, 205]
  let symbol
  if (typeFilters.indexOf(type)) {
    switch (type) {
      case 1:
        return 'XAS' + t(transTypes[type])
      case 103:
        symbol = args[0]
        return symbol + t(transTypes[type])
      case 204:
        symbol = args[1]
        return symbol + t(transTypes[type])
      case 205:
        return t(transTypes[type])
    }
  }
  return t(transTypes[type])
}

export const getAddress = (pubKey) => {
  return AschJs.crypto.getAddress(pubKey)
}

export const getSecFromNow = (timestamp) => {
  let time = moment(fulltimestamp(timestamp))
  // return time.startOf('seconds').fromNow()
  return moment().diff(time, 's')
}

export const getTimeFromNow = (timestamp) => {
  // return time.startOf('seconds').fromNow()
  return moment(fulltimestamp(timestamp)).fromNow()
}

export const rewardCount = (blockHeight) => {
  if (blockHeight) {
    if (blockHeight < 3464500 && blockHeight >= 464500) {
      return '3.5 XAS'
    } else if (blockHeight < 6464500 && blockHeight >= 3464500) {
      return '3.0 XAS'
    } else if (blockHeight < 9464500 && blockHeight >= 6464500) {
      return '2.5 XAS'
    } else if (blockHeight < 12464500 && blockHeight >= 9464500) {
      return '2 XAS'
    } else if (blockHeight < 15464500 && blockHeight >= 12464500) {
      return '1 XAS'
    } else if (blockHeight >= 15464500) {
      return '0.5 XAS'
    } else {
      return '0 XAS'
    }
  } else {
    return ''
  }
}
