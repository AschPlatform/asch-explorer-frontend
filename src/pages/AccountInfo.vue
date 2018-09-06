<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <breadcrumb class="xs:mt-5 sm:mt-20" />
    <div class="border border-solid border-tw-grey rounded-lg ">
      <div class="xs:px-10 xs:py-15 sm:px-25 sm:pt-30 sm:pb-10">
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest font-semibold sm:pl-15">
        {{this.$t('ACCOUNT_INFO')}}
      </div>
      <div class="xs:px-0 sm:px-15">
      <boundary-line class="xs:my-15 sm:my-30" />
      </div>
      <div class="flex justify-between">
        <info-panel v-if="account" :panelData="panelData" />
        <div v-else class="mt-2 mb-8 px-4 text-xs">{{$t('NO_DATA')}}</div>
        <div class="self-end w-auto xs:hidden sm:block pb-10 pr-15">
          <q-icon class="text-60 text-tw-grayish" name="icon-details" />
        </div>
      </div>
      <div class="xs:px-0 sm:px-15">
      <boundary-line class="xs:my-15 sm:my-15" />
      </div>
      <div class="btngroup xs:pl-0 sm:pl-15">
        <button :class="(this.type === 0 ? styleSelected : styleUnselected) + ' mr-20'" @click="changeType(0)">{{$t('TRANS_TABLE')}}</button>
        <button :class="this.type === 1 ? styleSelected : styleUnselected" @click="changeType(1)">{{$t('TRANSACTION_TABLE')}}</button>
      </div>
      <div class="xs:px-0 sm:px-15">
      <boundary-line class="mt-20" />
      </div>
      </div>
      <table-container class="xs:p-10 sm:p-0 custorm-tr-border" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.tid" key="tid" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.tid)">
              {{ props.props.tid | eclipse }}
              <q-tooltip>{{ props.props.tid }}</q-tooltip>
            </div>
          </q-td>
          <q-td key="height" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
              {{ props.props.height }}
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
              {{ props.props.senderId | eclipse }}
              <q-tooltip>{{ props.props.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.recipientId" key="recipientId" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.recipientId)">
              {{ props.props.recipientId | eclipse }}
              <q-tooltip>{{ props.props.recipientId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.amount" class="text-right" key="amount" >
            <span v-if="getAmount(props.props.transaction)">{{ getAmount(props.props.transaction) }}</span>
          </q-td>
          <q-td v-if="props.props.transferAmount" class="text-right" key="transferAmount">
            <span v-if="getTransAmount(props.props)">{{ getTransAmount(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.currency" class="text-right align-baseline custorm-chip" key="currency">
            <sub class="text-12 mt-10 mr-10">{{ props.props.currency !== 'XAS' ? props.props.currency.split('.')[0] : ''}}</sub>
            <q-chip color="blue" text-color="white" small>{{ props.props.currency.split('.')[1] || props.props.currency.split('.')[0]}}</q-chip>
          </q-td>
         <q-td v-if="props.props.args || props.props.args === null" key="args" >
           <div v-if="props.props.args && props.props.args.length > 0" >
            <span>{{ props.props.args.join(',') | eclipse }}</span>
              <q-tooltip>{{ props.props.args }}</q-tooltip>
           </div>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.props.fee || props.props.fee === 0" key="fee" >
            <span v-if="props.props.fee">{{ props.props.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.props.transaction && props.props.transaction.fee" key="transferFee" >
            <span>0.1</span>
          </q-td>
        </template>
        <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
          <table-item :data="getTableData(props.props)" :bgIcon="'icon-details'" :dataIcon="'icon-transaction'"/>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
import { QPage, QBtnGroup, QBtnToggle, QBtn, QTd, QTooltip, QIcon, QChip } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableItem from '../components/TableItem'
import PanelItem from '../components/PanelItem'
import TableContainer from '../components/TableContainer'
import { convertFee, toastError, fulltimestamp } from '../utils/util'
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
    QBtnGroup,
    QBtnToggle,
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
      btnGroup: [
        {
          label: this.$t('TRANS_TABLE'),
          value: 0
        },
        {
          label: this.$t('TRANSACTION_TABLE'),
          value: 1
        }
      ],
      styleSelected: 'inline px-0 font-semibold xs:text-16 sm:text-20 q-btn text-tw-blue border-b-2 border-tw-blue border-solid',
      styleUnselected: 'inline px-0 font-semibold text-tw-grey-darkest xs:text-16 sm:text-20 q-btn'
    }
  },
  async mounted() {
    this.init()
  },
  computed: {
    ...mapGetters(['getPrecision']),
    address() {
      return this.$route.params.address || ''
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
          let balanceItem = { value: balance }
          if (idx === 0) balanceItem.label = 'ACCOUNT_BALANCE'
          datas.push(balanceItem)
        })

        datas.push({
          label: 'ADDRESS',
          value: this.account.address,
          type: 'qr'
        })
        return datas
      }
    },
    params() {
      return this._.merge({ type: this.type }, this.$route.params)
    },
    columnsData() {
      if (this.type === 1) {
        return [
          {
            name: 'id',
            label: 'ID',
            field: 'ID',
            align: 'center'
          },
          {
            name: 'height',
            label: this.$t('HEIGHT'),
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
            label: this.$t('FEE'),
            field: 'fee',
            align: 'center'
          }
        ]
      } else {
        return [
          {
            name: 'tid',
            label: 'ID',
            field: 'tid',
            align: 'center'
          },
          {
            name: 'height',
            label: this.$t('HEIGHT'),
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
            label: this.$t('TRANS_TYPE'),
            field: 'currency',
            align: 'center'
          },
          {
            name: 'transferFee',
            label: this.$t('FEE'),
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
      if (res.success) {
        this.account = res.account
        this.balances = [convertFee(res.account.xas) + ' XAS'].concat(this.balances)
      } else {
        toastError(this.$t('ERR_INVALID_SEARCH'))
        this._.delay(() => this.$router.push('/'), 1000)
      }
    },
    async getAccountBalances() {
      let res = await this.getBalance(this.$route.params.address)
      if (res.success) {
        let balances = []
        res.balances.forEach(balance => {
          let { precision } = balance.asset
          if (balance.balance >= 1) {
            balances.push(
              convertFee(balance.balance, precision) + ' ' + balance.currency.split('.')[1]
            )
          }
        })
        this.balances = this.balances.concat(balances)
      }
    },
    init() {
      this.account = null
      this.balances = []
      this.getAccountInfo()
      this.getAccountBalances()
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
      if (this.type === 1) {
        // For transactions
        props.senderId = this.address
        res = await this.getTransactions(props)
        this.data = res.transactions
        this.count = res.count
      } else {
        // For transfers
        props.ownerId = this.address
        res = await this.getTransfers(props)
        this.data = res.transfers
        this.count = res.count
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
    // get data array for tableItem
    getTableData(data) {
      const { id = null, tid = null, recipientId, senderId, timestamp } = data

      let idField = {
        label: 'TRANSACTION_ID',
        value: id || tid,
        type: 'id'
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
        value: recipientId,
        type: 'address'
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
        this.type === 0
          ? [idField, timeField, typeField, senderField]
          : [idField, timeField, senderField, receiverField]

      return tablePanelData
    }
  },
  watch: {
    address(val) {
      if (val) this.init()
    }
  }
}
</script>

<style scoped>
</style>
