<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="no-shadow table-top-border" :title="title" :data="data" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" @request="request" row-key="name">
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td v-if="props.row.id" key="id" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.id)">
              {{ props.row.id | eclipse }}
              <q-tooltip>{{ props.row.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.row.tid" key="tid" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.tid)">
              {{ props.row.tid | eclipse }}
              <q-tooltip>{{ props.row.tid }}</q-tooltip>
            </div>
          </q-td>
          <q-td class="" v-if="props.row.type" key="type" :props="props">
            <span class="">{{ getTransType(props.row) }}</span>
          </q-td>
          <q-td class="" v-if="props.row.currency" key="currency" :props="props">
            <span class="">{{ (props.row.currency) + $t('TRS_TYPE_TRANSFER') }}</span>
          </q-td>
          <q-td v-if="props.row.senderId" key="senderId" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.senderId)">
              {{ props.row.senderId | eclipse }}
              <q-tooltip>{{ props.row.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.row.recipientId" key="recipientId" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.recipientId)">
              {{ props.row.recipientId | eclipse }}
              <q-tooltip>{{ props.row.recipientId }}</q-tooltip>
            </div>
          </q-td>
          <q-td key="amount" :props="props">
            <span v-if="getAmount(props.row)">{{ getAmount(props.row) }}</span>
          </q-td>
          <q-td key="transferAmount" :props="props">
            <span v-if="getTransAmount(props.row)">{{ getTransAmount(props.row) }}</span>
          </q-td>
          <q-td key="fee" :props="props">
            <span v-if="props.row.fee">{{ props.row.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
          <q-td key="transferFee" :props="props">
            <span>0.1</span>
          </q-td>
          <q-td v-if="props.row.timestamp > -1" key="timestamp" :props="props">
            <span>{{ fulltimestamp(props.row.timestamp) }}</span>
          </q-td>
        </q-tr>
      </q-table>
      <q-inner-loading :visible="loadingBool">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { QTable, QTr, QTd, QTooltip, QBtnGroup, QBtn, QInnerLoading, QSpinnerGears } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import { transTypes } from '../utils/constants'
import { fulltimestamp, toast, convertFee } from '../utils/util'

export default {
  name: 'TableContaine',
  props: ['isTransaction', 'data', 'count', 'params'],
  components: {
    QTable,
    QTr,
    QTd,
    QTooltip,
    QInnerLoading,
    QSpinnerGears,
    QBtnGroup,
    QBtn
  },
  data() {
    return {
      // isTransaction: true,
      datas: [],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      isDisable: false
    }
  },
  mounted() {
    this.getData()
    this.showLoading()
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getTransactions', 'getTransfers', 'setLoadingflag']),
    showLoading() {
      if (this.datas) {
        this.setLoadingflag(true)
        setTimeout(() => {
          this.setLoadingflag(false)
        }, 2000)
      }
      this.setLoadingflag(true)
    },
    async getData(props = null) {
      let res = []
      let limit = props ? props.pagination.rowsPerPage : this.pagination.rowsPerPage
      let pageNo = props ? props.pagination.page : this.pagination.page
      let condition = {
        // TODO 参数 bug
        orderBy: 'timestamp:desc',
        limit: limit,
        offset: (pageNo - 1) * limit
      }
      if (props) {
        this.pagination = props.pagination
      }
      if (res.success) {
        this.showLoading()
      }
      this.$emit('getData', condition)
    },
    // get locale trans type
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
    getRecipient(trans) {
      const { args } = trans
      const len = args.length
      return args[len - 1]
    },
    getAmount(trans) {
      if (!trans.args) return '--'
      const filterTransType = [1, 103]
      const { args } = trans
      const len = args ? args.length : 0
      if (filterTransType.indexOf(trans.type) >= 0) {
        if (args && args.length === 3) return convertFee(args[1], this.getPrecision(args[0]))
        return convertFee(args[0])
        // return currencySymbol + ' ' + transType
      } else {
        return '--'
      }
      // return args[len - 2]
    },
    getTransAmount(trans) {
      return convertFee(trans.amount, this.getPrecision(trans.currency))
    },
    // toast with state control
    info(msg) {
      if (this.isDisable === true) {
        return
      }
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 3000)
      toast(msg)
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    request(props) {
      this.getData(props)
    },
    init() {
      this.pagination = {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    }
  },
  computed: {
    ...mapGetters(['getPrecision', 'loadingBool']),
    columns() {
      if (this.isTransaction) {
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
            name: 'amount',
            label: this.$t('AMOUNT'),
            field: 'amount'
          },
          {
            name: 'fee',
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
    },
    title() {
      let title = ''
      switch (this.type) {
        case 'trans':
          title = 'TRANS_TITLE'
          break
        case 'block':
          title = 'BLOCK_TITLE'
          break
      }
      return this.$t(title)
    },
    address() {
      return this.$route.params.address
    },
    height() {
      return this.$route.params.height
    },
    buttons() {
      return this.btnGroup
    }
  },
  watch: {
    params(val) {
      this.init()
      this.getData()
    },
    datas() {
      this.showLoading()
    },
    count(val) {
      this.pagination.rowsNumber = val
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>