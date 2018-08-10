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
      <table-container class="mt-4" :data="data" :count="count" :params="params" :isTransaction="this.type === 0 ? true : false" @getData="getData" @changeType="changeType"/>
    </div>
  </q-page>
</template>

<script>
import { QPage, QBtnGroup, QBtn } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { convertFee, toastError } from '../utils/util'
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
    QBtn
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
    }
  },
  methods: {
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
      this.getData()
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
