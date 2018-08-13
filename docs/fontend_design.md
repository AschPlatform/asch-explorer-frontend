# 客户端



### 路由结构

 |--- main						布局入口

​    |    |— home					首页		

​    |    |--- accountInfo				账户信息

​    |    |--- blocks					区块列表

​    |    |--- blockInfo				区块信息

​    |    |--- transactions				交易列表

​    |    |--- transactionInfo			交易详情

​    |    |— delegates				受托人列表	

​    |    |— delegateInfo			受托人详情

​    |    |— assets					资产列表		

​    |    |— assetInfo				受托人列表		









### Component结构



#### main

- Navbar
- Footer
- Breadcrumb

#### home

- StateBanner 
- PanelItem

#### transactions

- TableContainer
  - TransType

#### transactionInfo

- InfoPanel

#### accountInfo

- InfoPanel
- TransTable

#### blocks

- TableContainer

#### blockInfo

- InfoPanel
- TableContainer

#### delegates

- TableContainer

#### delegateInfo

- InfoPanel
- TableContainer

#### assets

- TableContainer

#### assetInfo

- InfoPanel

#### others

- qrcode





### Components

#### components/Navbar.vue 

1. 描述：顶部组件 Logo 导航与搜索框 

   

#### components/Footer.vue

1. 描述：底部导航




#### components/Breadcrumb.vue

1. 描述：面包屑 ，按照 routerPath 显示导航的内容

   


#### components/StateBanner.vue

1. 描述：公链统计信息 

   

#### components/TransactiosPanel.vue

1. 描述：PanelItem 的容器组件，用来组装业务数据

   


#### components/BlockPanel.vue

1. 描述：PanelItem 的容器组件，用来组装业务数据

   

#### components/PanelItem.vue

1. 描述：会员基本信息展示编辑组件

2. data:

   | 名称 | 类型 | 默认值 | 说明 |
   | ---- | ---- | ------ | ---- |
   | --   |      |        |      |

3. event

   | 事件名称 | 参数类型 | 说明                         |
   | -------- | -------- | ---------------------------- |
   | @open    | type     | 点击 item 中的跳转项触发事件 |

4. props

   | 属性名称 | 类型   | 默认值 | 说明                        |
   | -------- | ------ | ------ | --------------------------- |
   | type     | string |        | 显示的数据类型，block/trans |

####  

#### components/TableContainer.vue

1. 描述：信息列表，封装 table 组件，根据不同类型来处理不同的显示业务，分为 `transaction`、`block`、`asset`、`delegate` 四种类型

2. data:

   | 名称       | 类型   | 默认值 | 说明               |
   | ---------- | ------ | ------ | ------------------ |
   | data       | array  | []     | 列表数据           |
   | type       | string | ''     | 显示的业务数据类型 |
   | params     | object | null   | 过滤参数           |
   | pagination | object | {}     | 分页信息           |

3. event

   | 事件名称 | 参数类型 | 说明                     |
   | -------- | -------- | ------------------------ |
   | @open    | params   | 全局事件处理路由跳转函数 |

4. props

   | 属性名称 | 类型  | 默认值 | 说明     |
   | -------- | ----- | ------ | -------- |
   | itemList | Array | []     | item列表 |

####  

#### components/TransType.vue

1. 描述：交易类型显示组件，同来标识不同的交易类型显示

   

#### components/InfoPanel.vue

1. 描述：信息列表面板

2. data:

   | 名称 | 类型  | 默认值 | 说明     |
   | ---- | ----- | ------ | -------- |
   | data | array | []     | 列表数据 |

3. event

   | 事件名称 | 参数类型 | 说明 |
   | -------- | -------- | ---- |
   | --       |          |      |

4. props

   | 属性名称 | 类型    | 默认值 | 说明                    |
   | -------- | ------- | ------ | ----------------------- |
   | slot     | tips    |        | 作为提示用的组件        |
   | slot     | address |        | 作为地址插槽传入 qrcode |
   | formData | array   |        | 表单显示项              |







### Stores

#### state

| 属性名称 | 类型   | 默认值 | 说明         | 备注                                       |
| -------- | ------ | ------ | ------------ | ------------------------------------------ |
| lang     | string | 'zh'   | 语言类型     |                                            |
| assetMap | object | {}     | 线上资产列表 | 存放资产详细信息（总量，精度等等）用于显示 |
|          | array  | []     | 积分变更记录 |                                            |

#### mutations

| 名称          | payload | 修改的state    | 说明         | 备注 |
| ------------- | ------- | -------------- | ------------ | ---- |
| SET_LANG      | {}      | state.lang     | 更新语言设置 |      |
| SET_ASSET_MAP | {}      | state.assetMap | 设置资产内容 |      |
|               |         |                |              |      |

#### getters

| 名称      | 依赖的state    | 依赖的getter | 说明                   | 备注 |
| --------- | -------------- | ------------ | ---------------------- | ---- |
| GET_LANG  | state.lang     | 无           | 获取语言设置           |      |
| GET_ASSET | state.assetMap |              | 获取指定资产的详细信息 |      |

#### actions

| 名称             | payload                                  | 请求路径 | 说明         | 备注 |
| ---------------- | ---------------------------------------- | -------- | ------------ | ---- |
| loadBlocks       | { store_id : string, merchant_id:string} | --       | 获取区块信息 |      |
| loadTransactions |                                          | --       | 获取交易列表 |      |
| loadAssets       |                                          | --       | 获取资产信息 |      |
| getAccountInfo   | name \| address                          | --       | 获取用户信息 |      |
| getAssetInfo     | name                                     | --       | 获取资产详情 |      |
|                  |                                          |          |              |      |
|                  |                                          |          |              |      |
|                  |                                          |          |              |      |


