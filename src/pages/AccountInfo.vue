<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2" />
      <info-panel :panelData="panelData" />
      <q-btn-group>
        <q-btn v-for="(item, idx) in btnGroup" :label="item.label" @click="changeType(item.value)" :key="idx"></q-btn>
      </q-btn-group>
      <table-container class="mt-8" :data="data" :count="count" :isTransaction="this.type === 0 ? true : false" @getData="getData" @changeType="changeType"/>
    </div>
  </q-page>
</template>

<script>
import { QPage, QBtnGroup, QBtn } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { convertFee } from '../utils/util'
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
    params() {
      let address = this.$route.params.address
      let nickname = this.$route.params.nickname
      let params = {}
      // diffrent params in table list
      if (address) params.address = address
      if (nickname) params.nickname = nickname
      return params
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
          label: 'address',
          value: this.account.address,
        type: 'address'
        })
        return datas
      }
    }
  },
  methods: {
    ...mapActions(['getAccount', 'getBalance', 'getTransactions', 'getTransfers']),
    async getAccountInfo() {
      let res = await this.getAccount(this.$route.params.address || this.$route.params.nickname)
      if (res.success && res.account) {
        this.account = res.account
        this.balances = [convertFee(res.account.xas) + ' XAS'].concat(this.balances)
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
