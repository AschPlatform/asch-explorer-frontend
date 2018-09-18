<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <breadcrumb class="xs:mt-5 sm:mt-20" />
    <div class="border border-solid border-tw-grey rounded-lg ">
      <div class="xs:px-5 xs:pt-15 xs:pb-0 sm:px-25 sm:pt-30 sm:pb-10">
        <div class="xs:text-16 sm:text-20 text-tw-grey-darkest font-normal xs:pl-5 sm:pl-15">
          {{this.$t('ACCOUNT_INFO')}}
        </div>
        <div class="xs:px-5 sm:px-15">
          <boundary-line class="xs:my-15 sm:my-30" />
        </div>
        <div class="flex justify-between">
          <info-panel v-if="account" :panelData="panelData" />
          <div v-else class="mt-2 mb-8 px-4 text-tw-grey-darkest xs:pl-5 sm:pl-15">{{$t('NO_DATA')}}</div>
          <div class="self-end w-auto xs:hidden sm:block pb-10 pr-15">
            <q-icon class="text-60 text-tw-grayish" name="icon-details" />
          </div>
        </div>
        <div class="xs:px-5 sm:px-15">
          <boundary-line class="xs:my-15 sm:my-15" />
        </div>
        <div class="btngroup xs:pl-5 sm:pl-15">
          <button :class="(this.type === 0 ? styleSelected : styleUnselected) + ' mr-20'" @click="changeType(0)" >{{$t('TRS_TYPE_TRANSFER_RECORD')}}</button>
          <button :class="this.type === 1 ? styleSelected : styleUnselected" @click="changeType(1)" >{{$t('TRANS_TITLE')}}</button>
        </div>
        <div class="xs:px-5 sm:px-15">
          <boundary-line class="mt-20" />
        </div>
      </div>
      <table-container class="xs:p-10 xs:pt-15 sm:p-0 custom-tr-border" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
            <q-td v-if="props.props.id" key="id">
              <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.id)">
               <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{ props.props.id }}</a></span>
                <q-tooltip>{{ props.props.id }}</q-tooltip>
              </div>
            </q-td>
            <q-td v-if="props.props.tid" key="tid" >
              <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.tid)">
                <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{ props.props.tid }}</a></span>
                <q-tooltip>{{ props.props.tid }}</q-tooltip>
              </div>
            </q-td>
            <q-td key="height" >
              <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
                {{ props.props.height | numSeparator}}
              </div>
            </q-td>
            <q-td v-if="props.props.timestamp > -1" key="timestamp">
              <span>{{ fulltimestamp(props.props.timestamp) }}</span>
            </q-td>
            <q-td v-if="props.props.type" key="type" >
              <span class="">{{ getTransType(props.props) }}</span>
            </q-td>
            <q-td v-if="props.props.senderId" key="senderId" >
              <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.senderId)">
                 <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{ props.props.senderId }}</a></span>
                <q-tooltip>{{ props.props.senderId }}</q-tooltip>
              </div>
            </q-td>
            <q-td v-if="props.props.recipientId" key="recipientId" >
              <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.recipientId)">
                <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">
                  {{getRecipientId(props.props)}}
                  </a></span>
                <q-tooltip>{{getRecipientId(props.props)}}</q-tooltip>
              </div>
            </q-td>
            <q-td v-if="props.props.amount" class="text-right" key="amount" >
              <span v-if="getAmount(props.props.transaction)">{{ getresult(getAmount(props.props.transaction),5) }}</span>
              <q-tooltip>{{ getAmount(props.props.transaction) }}</q-tooltip>
            </q-td>
            <q-td v-if="props.props.transferAmount" class="text-right" key="transferAmount">
              <span v-if="getTransAmount(props.props)">{{ getTransAmount(props.props) }}</span>
            </q-td>
            <q-td v-if="props.props.currency" class="text-right align-baseline custom-chip" key="currency">
              <sub class="text-12 text-tw-grey-darkest mt-10 mr-10">{{ props.props.currency !== 'XAS' ? props.props.currency.split('.')[0] : ''}}</sub>
              <q-chip color="blue" text-color="white" small>{{ props.props.currency.split('.')[1] || props.props.currency.split('.')[0]}}</q-chip>
            </q-td>
           <q-td v-if="props.props.args || props.props.args === null" key="args" >
             <div v-if="props.props.args && props.props.args.length > 0" >
              <span>{{ props.props.args.join(',') | eclipse }}</span>
                <q-tooltip>{{ props.props.args }}</q-tooltip>
             </div>
              <span v-else>--</span>
            </q-td>
            <q-td v-if="props.props.fee || props.props.fee === 0" key="fee" class="text-right">
              <span v-if="props.props.fee">{{ props.props.fee | fee }}</span>
              <span v-else>0</span>
            </q-td>
            <q-td v-if="props.props.transaction && props.props.transaction.fee" key="transferFee" class="text-right" >
              <span>0.1</span>
            </q-td>
</template>

<template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
  <table-item :data="getTableData(props.props)" :bgIcon="'icon-details'" :dataIcon="'icon-transaction'" />
</template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
/* disable-eslint */
import { QPage, QBtn, QTd, QTooltip, QIcon, QChip } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableItem from '../components/TableItem'
import PanelItem from '../components/PanelItem'
import TableContainer from '../components/TableContainer'
import { convertFee, fulltimestamp } from '../utils/util'
import { transTypes } from '../utils/constants'
import { mapActions, mapGetters } from 'vuex'
import infoImge from '../assets/asch_logo.png'

export default {
  name: 'AccountInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel,
    TableContainer,
    BoundaryLine,
    TableItem,
    PanelItem,
    QBtn,
    QTd,
    QIcon,
    QTooltip,
    QChip
  },
  data() {
    return {
      infoImge,
      model: 0,
      account: null,
      balances: [],
      type: 0, // trans: 0 , transfer:1
      data: [],
      defaultProps: {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      },
      count: 0,
      styleSelected:
        'inline px-0 font-semibold xs:text-16 sm:text-20 q-btn text-tw-blue border-b-2 border-tw-blue border-solid bg-tw-transparent shadow-none',
      styleUnselected:
        'inline px-0 font-semibold text-tw-grey-darkest xs:text-16 sm:text-20 q-btn bg-tw-transparent shadow-none'
    }
  },
  async mounted() {
    this.init()
  },
  computed: {
    ...mapGetters(['getPrecision']),
    address() {
      if (this.$route.params.address) {
        return this.$route.params.address
      }
    },
    alia() {
      if (this.$route.params) {
        return this.$route.params
      }
    },
    panelData() {
      let datas = []
      if (this.account) {
        if (this.account.name) {
          datas.push({
            label: 'NICKNAME',
            value: this.account.name
          })
        }
        this.balances.map((balance, idx) => {
          let balanceItem = {
            value: balance
          }
          if (idx === 0) balanceItem.label = 'ACCOUNT_BALANCE'
          datas.push(balanceItem)
        })

        datas.push({
          label: 'ACCOUNT_ADDRESS',
          value: this.account.address,
          type: 'qr'
        })
        return datas
      }
    },
    params() {
      return this._.merge(
        {
          type: this.type
        },
        this.$route.params
      )
    },
    columnsData() {
      if (this.type === 1) {
        return [
          {
            name: 'id',
            label: this.$t('TRANSACTION_ID'),
            field: 'ID',
            align: 'center'
          },
          {
            name: 'height',
            label: this.$t('BLOCK_HEIGHT'),
            field: 'height',
            align: 'center'
          },
          {
            name: 'timestamp',
            label: this.$t('TRANS_TIME'),
            field: 'timestamp',
            align: 'center'
          },
          {
            name: 'type',
            label: this.$t('TRANSACTION_TYPE'),
            field: 'type',
            align: 'center'
          },
          {
            name: 'senderId',
            label: this.$t('TRANS_SENDER'),
            field: 'senderId',
            align: 'center'
          },
          {
            name: 'args',
            label: this.$t('ARGUMENTS'),
            field: 'args',
            align: 'center'
          },
          {
            name: 'fee',
            label: this.$t('TRANS_FEE'),
            field: 'fee',
            align: 'center'
          }
        ]
      } else {
        return [
          {
            name: 'tid',
            label: this.$t('TRANSACTION_ID'),
            field: 'tid',
            align: 'center'
          },
          {
            name: 'height',
            label: this.$t('BLOCK_HEIGHT'),
            field: 'height',
            align: 'center'
          },
          {
            name: 'timestamp',
            label: this.$t('TRANS_TIME'),
            field: 'timestamp',
            align: 'center'
          },

          {
            name: 'senderId',
            label: this.$t('TRANS_SENDER'),
            field: 'senderId',
            align: 'center'
          },
          {
            name: 'recipientId',
            label: this.$t('TRANS_RECRIVER'),
            field: 'recipientId',
            align: 'center'
          },
          {
            name: 'transferAmount',
            label: this.$t('AMOUNT'),
            field: 'amount',
            align: 'center'
          },
          {
            name: 'currency',
            label: this.$t('ASSET_TYPE'),
            field: 'currency',
            align: 'center'
          },
          {
            name: 'transferFee',
            label: this.$t('TRANS_FEE'),
            field: 'fee',
            align: 'center'
          }
        ]
      }
    }
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getAccount', 'getBalance', 'getTransactions', 'getTransfers']),
    async getAccountInfo() {
      let res = await this.getAccount(this.$route.params.address || this.$route.params.nickname)
      if (res.success && res.account) {
        this.account = res.account
        const weight = res.account.weight
        let xasBalance = weight > 0 ? weight + res.account.xas : res.account.xas
        let lockedWeight =
          weight > 0 ? '( ' + this.$t('LOCKED') + convertFee(weight) + ' XAS )' : ''
        this.balances = [convertFee(xasBalance) + ' XAS ' + lockedWeight].concat(this.balances)
      } else {
        this.$router.push({
          path: '/error',
          query: { errorStr: this.$route.params.address || this.$route.params.nickname }
        })
      }
    },
    async getAccountBalances() {
      let res = await this.getBalance(this.$route.params.address || this.account.address)
      if (res.success) {
        let balances = []
        res.balances.forEach(balance => {
          let { precision } = balance.asset
          if (balance.balance >= 1) {
            balances.push(convertFee(balance.balance, precision) + ' ' + balance.currency)
          }
        })
        this.balances = this.balances.concat(balances)
      }
    },
    async init() {
      this.account = null
      this.balances = []
      await this.getAccountInfo()
      await this.getAccountBalances()
    },
    changeType(val) {
      this.type = val
      this.reset()
      // this.leftIconName()
      // this.getData(this.defaultProps)
    },
    async getData(props = this.defaultProps) {
      this.data = []
      let res
      if (this.account) {
        if (this.type === 1) {
          // For transactions
          props.senderId = this.account.address
          res = await this.getTransactions(props)
          this.data = res.transactions
          this.count = res.count
        } else {
          // For transfers
          props.ownerId = this.account.address
          res = await this.getTransfers(props)
          this.data = res.transfers
          this.count = res.count
        }
      } else {
        setTimeout(() => {
          this.getData(props)
        }, 0)
      }
    },
    reset() {
      this.defaultProps = {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      }
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    getTransType(trans) {
      const { type, args } = trans
      let currencySymbol = 'XAS'
      let transType = this.$t(transTypes[type])
      // type that need fill with currency symbol
      const filterTransType = [1, 103]
      if (filterTransType.indexOf(type) >= 0) {
        if (args && args.length === 3) currencySymbol = args[0].split('.')[1]
        return currencySymbol + ' ' + transType
      } else {
        return transType
      }
    },
    getAmount(trans) {
      if (!trans.args) return '--'
      const filterTransType = [1, 103]
      const { args } = trans
      // const len = args ? args.length : 0
      if (filterTransType.indexOf(trans.type) >= 0) {
        if (args && args.length === 3) return convertFee(args[1], this.getPrecision(args[0]))
        return convertFee(args[0])
        // return currencySymbol + ' ' + transType
      } else {
        return '--'
      }
      // return args[len - 2]
    },
    getRecipientId(trans) {
      if (trans.transaction) {
        return trans.transaction.args[trans.transaction.args.length - 1]
      } else {
        return trans.recipientId
      }
    },
    getresult(str, n) {
      return str.replace(new RegExp('^(\\-?\\d*\\.?\\d{0,' + n + '})(\\d*)$'), '$1')
    },
    // get data array for tableItem
    getTableData(data) {
      const { id = null, tid = null, senderId, timestamp } = data

      let idField = {
        label: 'TRANSACTION_ID',
        value: id || tid,
        type: 'transactionId'
      }

      // let heightField = {
      //   label: 'HEIGHT',
      //   value: height,
      //   type: 'number'
      // }

      let timeField = {
        label: 'TIME',
        value: fulltimestamp(timestamp)
      }
      let senderField = {
        label: 'TRANS_SENDER',
        value: senderId,
        type: 'address'
      }

      let typeField = {
        label: 'TYPE',
        value: this.getTransType(data)
      }

      // let argsField = {
      //   label: 'ARGUMENTS',
      //   // value: args && args.join(' ')
      //   value: args && args.join('').substring(0, 5)
      // }

      // let feeField = {
      //   label: 'FEE',
      //   value: convertFee(fee)
      // }

      let receiverField = {
        label: 'TRANS_RECRIVER',
        value: this.getRecipientId(data),
        type: 'nick'
      }

      // let currencyField = {
      //   label: 'ASSET',
      //   value: currency
      // }

      // let amountField = {
      //   label: 'AMOUNT',
      //   value: this.getAmount(data)
      // }

      let tablePanelData =
        this.type === 1
          ? [idField, timeField, typeField, senderField]
          : [idField, timeField, senderField, receiverField]

      return tablePanelData
    }
  },
  watch: {
    alia(val) {
      if (val) this.init()
    }
  }
}
</script>

<style scoped>
</style>
