<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="no-shadow table-top-border" :title="title" :data="datas" :columns="columns" :pagination.sync="pagination" @request="request" row-key="name">
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td v-if="props.row.id" key="id" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.id)">
              {{ props.row.id | eclipse }}
              <q-tooltip>{{ props.row.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.row.type" key="type" class="custom-border-td" :props="props">
            <span class="">{{ getTransType(props.row) }}</span>
          </q-td>
          <q-td v-if="props.row.senderId" key="senderId" :props="props">
            <div class="text-primary cursor-pointer" @click="doSearch(props.row.senderId)">
              {{ props.row.senderId | eclipse }}
              <q-tooltip>{{ props.row.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td key="recipientId" :props="props">
            <div v-if="props.row.args" class="text-primary cursor-pointer" @click="doSearch(getRecipient(props.row))">
              {{getRecipient(props.row) | eclipse }}
              <q-tooltip>{{ getRecipient(props.row) }}</q-tooltip>
            </div>
            <span v-else>--</span>
          </q-td>
          <q-td key="amount" :props="props">
            <span v-if="getAmount(props.row)" class="text-italic">{{ getAmount(props.row) }}</span>
            <span v-else>--</span>
          </q-td>
          <q-td key="fee" :props="props">
            <span v-if="props.row.fee">{{ props.row.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.row.timestamp > -1" key="timestamp" :props="props">
            <span>{{ fulltimestamp(props.row.timestamp) }}</span>
          </q-td>
        </q-tr>
      </q-table>
      <q-inner-loading :visible="loadingFlg">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </div>
  </transition>
</template>

</template>

<script>
import { QTable, QTr, QTd, QTooltip, QInnerLoading, QSpinnerGears } from 'quasar'
import { mapActions } from 'vuex'
import { transTypes } from '../utils/constants'
import { fulltimestamp, toast } from '../utils/util'

export default {
  name: 'TableContaine',
  props: ['type', 'params'],
  components: {
    QTable,
    QTr,
    QTd,
    QTooltip,
    QInnerLoading,
    QSpinnerGears
  },
  data() {
    return {
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
    this.dataShow()
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getTransactions']),
    dataShow() {
      if (this.datas) {
        this.showLoading()
      } else {
        this.$store.state.loadingFlag = true
      }
    },
    showLoading() {
      this.$store.state.loadingFlag = true
      setTimeout(() => {
        this.$store.state.loadingFlag = false
      }, 2000)
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
      if (this.type === 'trans') {
        // trans type with address
        // TODO nickname support
        condition.senderId = this.params.address
      } else if (this.type === 'block') {
        // block table
        condition.height = this.params.height
      }
      res = await this.getTransactions(condition)

      if (res.success) {
        this.dataShow()
      }
      this.datas = res.transactions
      this.pagination.rowsNumber = res.count
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
      if (!trans.arg) return false
      const { args } = trans
      const len = args ? args.length : 0
      return args[len - 2]
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
    }
  },
  computed: {
    columns() {
      return [
        {
          name: 'id',
          label: 'ID',
          field: 'ID'
        },
        {
          name: 'type',
          label: this.$t('TRANS_TYPE'),
          field: 'type',
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
    loadingFlg() {
      return this.$store.state.loadingFlag
    }
  },
  watch: {
    params(val) {
      this.getData()
    },
    datas() {
      this.dataShow()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>