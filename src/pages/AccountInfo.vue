<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('ACCOUNT_INFO')}}
      </div>
      <boundary-line class="mt-2 mb-8" />
      <info-panel v-if="account" :panelData="panelData" />
      <div v-else class="mt-2 mb-8 px-4 text-xs">{{$t('NO_DATA')}}</div>
      <q-btn-group class="mt-8" outline>
        <q-btn outline v-for="(item, idx) in btnGroup" :label="item.label" @click="changeType(item.value)" :key="idx"></q-btn>
      </q-btn-group>
      <boundary-line class="mt-4 mb-4" />
      <table-container class="mt-4" :data="data" :count="count" :params="params" :columnsData="columnsData" :isTransaction="this.type === 0 ? true : false" @getData="getData" @changeType="changeType">
        <template slot="content" slot-scope="props" v-if="props.props">
          <q-td key="id">
            <!-- {{props.props}} -->
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.tid" key="tid" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.tid)">
              {{ props.props.tid | eclipse }}
              <q-tooltip>{{ props.props.tid }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.type" key="type" >
            <span class="">{{ getTransType(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.currency" key="currency" >
            <span class="">{{ (props.props.currency) + $t('TRS_TYPE_TRANSFER') }}</span>
          </q-td>
          <q-td v-if="props.props.senderId" key="senderId" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.senderId)">
              {{ props.props.senderId | eclipse }}
              <q-tooltip>{{ props.props.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.recipientId" key="recipientId" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.recipientId)">
              {{ props.props.recipientId | eclipse }}
              <q-tooltip>{{ props.props.recipientId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.amount" key="amount" >
            <span v-if="getAmount(props.props)">{{ getAmount(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.transferAmount" key="transferAmount" >
            <span v-if="getTransAmount(props.props)">{{ getTransAmount(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.fee" key="fee" >
            <span v-if="props.props.fee">{{ props.props.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
         <q-td v-if="props.props.args" key="args" >
           <div v-if="props.props.args.length > 0" >
            <span>{{ props.props.args.join(',') | eclipse }}</span>
              <q-tooltip>{{ props.props.args }}</q-tooltip>
           </div>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.props.transferFee" key="transferFee" >
            <span>0.1</span>
          </q-td>
          <q-td v-if="props.props.timestamp > -1" key="timestamp" >
            <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
import { QPage, QBtnGroup, QBtn, QTd, QTooltip } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { convertFee, toastError, fulltimestamp } from '../utils/util'
import { transTypes } from '../utils/constants'
import { mapActions } from 'vuex'

export default {
  name: 'AccountInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel,
    TableContainer,
    BoundaryLine,
    QBtnGroup,
    QBtn,
    QTd,
    QTooltip
  },
  data() {
    return {
      account: null,
      balances: [],
      type: 0,
      data: [],
      defaultProps: {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      },
      count: 0,
      btnGroup: [
        {
          label: this.$t('TRANSACTION_TABLE'),
          value: 0
        },
        {
          label: this.$t('TRANS_TABLE'),
          value: 1
        }
      ]
    }
  },
  async mounted() {
    this.init()
  },
  computed: {
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
          type: 'address'
        })
        return datas
      }
    },
    params() {
      return this.$route.params
    },
    columnsData() {
      if (this.type === 0) {
        return [
          {
            name: 'id',
            label: 'ID',
            field: 'ID'
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
            field: 'senderId'
          },
          {
            name: 'fee',
            label: this.$t('FEE'),
            field: 'fee'
          },
          {
            name: 'args',
            label: this.$t('ARGUMENTS'),
            field: 'args'
          },
          {
            name: 'timestamp',
            label: this.$t('TRANS_TIME'),
            field: 'timestamp'
          }
        ]
      } else {
        return [
          {
            name: 'tid',
            label: 'ID',
            field: 'tid'
          },
          {
            name: 'currency',
            label: this.$t('TRANS_TYPE'),
            field: 'currency',
            align: 'center'
          },
          {
            name: 'senderId',
            label: this.$t('TRANS_SENDER'),
            field: 'senderId'
          },
          {
            name: 'recipientId',
            label: this.$t('TRANS_RECRIVER'),
            field: 'recipientId'
          },
          {
            name: 'transferAmount',
            label: this.$t('AMOUNT'),
            field: 'amount'
          },
          {
            name: 'transferFee',
            label: this.$t('FEE'),
            field: 'fee'
          },
          {
            name: 'timestamp',
            label: this.$t('TRANS_TIME'),
            field: 'timestamp'
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
      this.getData(this.defaultProps)
    },
    async getData(props = this.defaultProps) {
      this.data = []
      let res
      if (this.type === 0) {
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
