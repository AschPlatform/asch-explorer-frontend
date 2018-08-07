<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg p-4 mb-4">
      <div class="text-14 text-black-dark">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2" />
      <info-panel :panelData="panelData" />
      <table-container class="mt-8" :type="'trans'" :params="params" />
    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
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
    BoundaryLine
  },
  data() {
    return {
      account: null,
      balances: []
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
          value: this.account.address
        })
        return datas
      }
    }
  },
  methods: {
    ...mapActions(['getAccount', 'getBalance']),
    async getAccountInfo() {
      let res = await this.getAccount(this.$route.params.address || this.$route.params.nickname)
      if (res.success && res.account) {
        this.account = res.account
        this.balances = [convertFee(res.account.xas) + ' XAS']
      }
    },
    async getAccountBalances() {
      let res = await this.getBalance(this.$route.params.address)
      if (res.success) {
        let balances = res.balances.map(balance => {
          let { precision } = balance.asset
          return convertFee(balance.balance, precision) + ' ' + balance.currency.split('.')[1]
        })
        this.balances = this.balances.concat(balances)
      }
    },
    init() {
      this.getAccountInfo()
      this.getAccountBalances()
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
