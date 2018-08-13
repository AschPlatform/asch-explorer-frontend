## 区块浏览器接口需求文档







### HASH 值查询（区块/交易记录）接口

用户输入的 hash 值，查询区块信息或交易信息，需要后端返回区块或交易数据结构



| 参数   | 类型   | 大小 | 备注                         |
| ------ | ------ | ---- | ---------------------------- |
| id     | String | 64   | 后端根据 hash 查询区块或交易 |
| height | number |      | 区块高度                     |



返回值：

- 区块详情

```javascript
{
  "success":true,
  "block":{
    "id":"7c03d7d8dc3ebc3701b5dc2f4353b70d3bd99a058448edfec747e285a0812c2f",
    "version":0,
    "timestamp":65543430,
    "height":17526,
    "payloadHash":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "previousBlock":"d753ac75ea506326c637f2ad5527b3c486f2146be4c9204fa6e1655f4d2dbcee",
    "numberOfTransactions":0,
    "totalFee":0,
    "generatorPublicKey":"992ba4a33527432dbe05b26c783ec72e151867c035c0e91194b812ab92703e0b",
    "blockSignature":"949a1c4c8c9fb2fb214411d505a55808acd20ab45c427043296f7f384a641ceb19418e1f3f653e9e3b788a21467deb933f8e62846b29d3a07f569b8661ec050c",
    "confirmations":19,
    "transactions":[
    ]
  }
}

```



- 交易详情

```javascript
{
    "success": true,
    "transaction": {
        "id": "689ff6f9606f7555438871e34334808ecb6f1febe45bdde6c0a7a0fad4d53986",
        "type": 2,
        "timestamp": 65528188,
        "senderId": "ACGb5mp3TaJx3sqaJTZyebjAR6w4SLYaX7",
        "senderPublicKey": "574dd81b27b99fcc8adbf3e9d68a974c5f5cd2342a2f0857011c5a89d9416831",
        "requestorId": null,
        "fee": 100000000,
        "signatures": [
            "7611817f2bea2118417ef38fa4556041497d1ea47dadd70a60fb496b3c80a9c82d4a36c9390731f2af7f50a13615e140c39f67a7cb9e053a167c54d8516f0507"
        ],
        "secondSignature": null,
        "args": [
            "whocansupport"
        ],
        "height": 16131,
        "message": null,
        "executed": 1,
        "_version_": 1
    }
}
```







### 区块列表

通过分页与过滤条件查询区块列表信息

`/api/blocks`



| 参数     | 类型   | 大小 | 备注           |
| -------- | ------ | ---- | -------------- |
| limit    | number | --   | 条数           |
| offset   | number | --   | 偏移量         |
| orderBy  | string | --   | 排序规则       |
| producer | string |      | 受托人产快信息 |
| height   | number |      | 区块高度       |



```javascript
{
    "success": true,
    "count": 17462,
    "blocks": [
        {
            "id": "148da01c074085898c36c8fc65f78379741f2d7a9f60692a989a1c154d65f5e3",
            "version": 0,
            "timestamp": 0,
            "height": 0,
            "payloadHash": "275d2b8f2c9cae345d535e76a0922d5ccca6668ab8d007135f0aa8a780b52896",
            "numberOfTransactions": 203,
            "totalFee": 0,
            "generatorPublicKey": "dcb28a3789c748b62aac1dfff81178d203aabdfd0516c547d5ce6c986d26b4fa",
            "blockSignature": "67254c9b69224e8d2269ca28af5e434fbfee47e6fd4b819e9c053b00af04da3664e17ec337a9b60fc5fc91f66b93743cd926d79c00fa367e55136cfb2933b007",
            "confirmations": 17461,
            "transactions": []
        },
        {
            "id": "0d2230c420d62292c56558a1113e911ca1f05b52e920524e6601e6469384d425",
            "version": 0,
            "timestamp": 65366890,
            "height": 1,
            "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "previousBlock": "148da01c074085898c36c8fc65f78379741f2d7a9f60692a989a1c154d65f5e3",
            "numberOfTransactions": 0,
            "totalFee": 0,
            "generatorPublicKey": "936346baf9de399224cea283e3e9976601aaf5ad44908a7f22a0e534f9d47006",
            "blockSignature": "8ed82401e7bad0b8656878d75afb41d1171d312ba563aa2fa69bd448d3218a824478191c38d7c31b17010fe4e950464280abd45a7b331aaf643ccb854496a700",
            "confirmations": 17460,
            "transactions": []
        }
     ]
 }
```





### 交易列表

通过分页查询交易列表

`/api/v2/transactions`



| 参数    | 类型   | 大小 | 备注     |
| ------- | ------ | ---- | -------- |
| limit   | number | --   | 条数     |
| offset  | number | --   | 偏移量   |
| orderBy | string | --   | 排序规则 |
| type    | number |      | 交易类型 |
| address | string | --   | 地址     |



返回值

```javascript
{
    "success": true,
    "transactions": [
        {
            "id": "689ff6f9606f7555438871e34334808ecb6f1febe45bdde6c0a7a0fad4d53986",
            "type": 2,
            "timestamp": 65528188,
            "senderId": "ACGb5mp3TaJx3sqaJTZyebjAR6w4SLYaX7",
            "senderPublicKey": "574dd81b27b99fcc8adbf3e9d68a974c5f5cd2342a2f0857011c5a89d9416831",
            "requestorId": null,
            "fee": 100000000,
            "signatures": [
                "7611817f2bea2118417ef38fa4556041497d1ea47dadd70a60fb496b3c80a9c82d4a36c9390731f2af7f50a13615e140c39f67a7cb9e053a167c54d8516f0507"
            ],
            "secondSignature": null,
            "args": [
                "whocansupport"
            ],
            "height": 16131,
            "message": null,
            "executed": 1,
            "_version_": 1
        }
    ],
    "count": 118
}
```



### 获取受托人列表

查询受托人列表

`/api/delegates`



| 参数    | 类型   | 大小 | 备注     |
| ------- | ------ | ---- | -------- |
| limit   | number | --   | 条数     |
| offset  | number | --   | 偏移量   |
| orderBy | string | --   | 排序规则 |





```javascript
{
"success": true,
"totalCount": 103,
"delegates": [
{
    "address": "A8kGAHs334rF2NoxXersRqtV7G13Lm1hps",
    "tid": "cdbd270395ef57d350320c0c01e7f61e88891f94f3aa97240e5b2474f0a140f5",
    "name": "asch_g65",
    "publicKey": "f0348c30929ab6545805457fc63f35f4453486ad52d3e3bab4d3aa9de38c590a",
    "votes": 100000000000000,
    "producedBlocks": 175,
    "missedBlocks": 0,
    "fees": 0,
    "rewards": 0,
    "_version_": 181,
    "rate": 1,
    "approval": "1.00",
    "productivity": "100.00",
    "vote": 100000000000000,
    "missedblocks": 0,
    "producedblocks": 175
    }
  ]
    
}
```





### 资产列表



查询资产信息

`api/uia/assets`



| 参数    | 类型   | 大小 | 备注     |
| ------- | ------ | ---- | -------- |
| limit   | number | --   | 条数     |
| offset  | number | --   | 偏移量   |
| orderBy | string | --   | 排序规则 |



返回



```javascript
{
	[
		{
            "name": "DDL.DDS",
            "desc": "DD链资产，价值固定",
            "maximum": "1000000000000000000",
            "precision": 8,
            "strategy": "",
            "quantity": "100000000000000",
            "height": 5950452,
            "issuerId": "AJT8e3rjpUuaEGKbQYJv5LP9Nkmppek2wC",
            "acl": 0,
            "writeoff": 0,
            "allowWriteoff": 0,
            "allowWhitelist": 0,
            "allowBlacklist": 0,
            "maximumShow": "10000000000",
            "quantityShow": "1000000"
        }
    ],
    "count": 39
}
```





### 资产详情

查询资产详情

`/api/uia/assets/:name`



返回值



```javascript
{
    "success": true,
    "asset": {
        "name": "tea.YTEA",
        "desc": "优良资产，值得拥有",
        "maximum": "1000000000000000",
        "precision": 8,
        "strategy": "",
        "quantity": "10000000000000",
        "height": 1700230,
        "issuerId": "1038895743869791470",
        "acl": 0,
        "writeoff": 0,
        "allowWriteoff": 1,
        "allowWhitelist": 1,
        "allowBlacklist": 1,
        "maximumShow": "10000000",
        "quantityShow": "100000"
    }
}
```







### 账户详情

查询账户详情

`/api/v2/accounts/:address`

返回值

> 需要显示地址内的 UIA 资产余额

```javascript
{
    "success": true,
    "account": {
        "address": "AM5ntHM1ncF2TRT2Fif7QD1zpt3xtzdyBG",
        "name": "test11111111",
        "xas": 154948269285,
        "publicKey": null,
        "secondPublicKey": null,
        "isLocked": 0,
        "isAgent": 0,
        "isDelegate": 0,
        "role": 3,
        "lockHeight": 0,
        "agent": null,
        "weight": 0,
        "agentWeight": 0,
        "_version_": 24
    },
    "unconfirmedAccount": {
        "address": "AM5ntHM1ncF2TRT2Fif7QD1zpt3xtzdyBG",
        "name": "test11111111",
        "xas": 154948269285,
        "publicKey": null,
        "secondPublicKey": null,
        "isLocked": 0,
        "isAgent": 0,
        "isDelegate": 0,
        "role": 3,
        "lockHeight": 0,
        "agent": null,
        "weight": 0,
        "agentWeight": 0,
        "_version_": 24
    },
    "latestBlock": {
        "height": 17847,
        "timestamp": 65546700
    },
    "version": {
        "version": "1.4.0-beta",
        "build": "DEFAULT_BUILD_TIME",
        "net": "testnet"
    }
}
```





### 市值抓取

按照频率抓取当前 XAS 市值



### 资产持有人用户数量

查询某个资产的持币用户数







