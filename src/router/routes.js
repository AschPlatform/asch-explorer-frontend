function load(component, path = false) {
  let comp = path ? () =>
    import(`src/layouts/${component}.vue`) : () =>
    import(`src/pages/${component}.vue`)
  return comp
}

export default [{
    path: '/',
    component: load('Main', true),
    name: 'main',
    // redirect: 'overall',
    children: [{
        path: '/',
        name: 'home',
        component: load('Home')
      },
      {
        path: 'address/:address',
        name: 'address',
        component: load('AccountInfo')
      },
      {
        path: 'account/:nickname',
        name: 'nickname',
        component: load('AccountInfo')
      },
      {
        path: 'blocks',
        name: 'blocks',
        component: load('Blocks')
      },
      {
        path: 'blocks_id/:id',
        name: 'blockId',
        component: load('BlockInfo')
      },
      {
        path: 'blocks_height/:height',
        name: 'blockHeight',
        component: load('BlockInfo')
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: load('Transactions')
      },
      {
        path: 'transaction/:id',
        name: 'transaction',
        component: load('TransactionInfo')
      },
      {
        path: 'delegates',
        name: 'delegates',
        component: load('Delegates')
      },
      {
        path: 'delegate/:name',
        name: 'delegate',
        component: load('DelegateInfo')
      },
      {
        path: 'assets',
        name: 'assets',
        component: load('Assets')
      },
      {
        path: 'asset/:name',
        name: 'asset',
        component: load('AssetInfo')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    name: '404',
    component: load('404')
  }
]
