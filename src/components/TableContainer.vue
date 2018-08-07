<template>
  <div>
    <q-btn-group>
      <q-btn :label="$t('TRANSACTION_TABLE')" @click="isTransaction = true"></q-btn>
      <q-btn :label="$t('TRANS_TABLE')" @click="isTransaction = false"></q-btn>
    </q-btn-group>
    <q-table class="no-shadow table-top-border" :title="title" :data="datas" :columns="columns" :pagination.sync="pagination" row-key="name">
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td v-if="props.row.id" key="id" :props="props" >
          <div class="text-italic text-primary cursor-pointer" @click="doSearch(props.row.id)">
            {{ props.row.id | eclipse }}
            <q-tooltip>{{ props.row.id }}</q-tooltip>
          </div>
        </q-td>
        <!-- Transfer Type -->
        <q-td v-if="props.row.type" key="type" :props="props" >
          <span class="">{{ getTransType(props.row) }}</span>
        </q-td>
        <q-td v-if="props.row.senderId" key="senderId" :props="props" >
          <div class="text-italic text-primary cursor-pointer" @click="doSearch(props.row.senderId)">
            {{ props.row.senderId | eclipse }}
            <q-tooltip>{{ props.row.senderId }}</q-tooltip>
          </div>
        </q-td>
        <q-td key="recipientId" :props="props" >
          <div v-if="props.row.args" class="text-italic text-primary cursor-pointer" @click="doSearch(getRecipient(props.row))" >
            {{getRecipient(props.row) | eclipse}}
            <q-tooltip>{{ getRecipient(props.row) }}</q-tooltip>
          </div>
        </q-td>
        <q-td key="amount" :props="props" >
          <span v-if="getAmount(props.row)" class="text-italic">{{ getAmount(props.row) }}</span>
        </q-td>
        <q-td key="fee" :props="props" >
          <span v-if="props.row.fee" class="text-italic">{{ props.row.fee | fee }}</span>
          <span v-else>--</span>
        </q-td>
        <q-td v-if="props.row.timestamp > -1" key="timestamp" :props="props" >
          <span class="text-italic">{{ fulltimestamp(props.row.timestamp) }}</span>
        </q-td>
        <!-- <q-td key="calories" :props="props">
          <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="props.row.calories--" class="q-mr-xs" />
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="props.row.calories++" class="q-mr-sm" />
            <div>{{ props.row.calories }}</div>
          </div>
        </q-td>
        <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
        <q-td key="carbs" :props="props">
          <q-chip small square color="amber">{{ props.row.carbs }}</q-chip>
        </q-td>
        <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
        <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
        <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
        <q-td key="iron" :props="props">
          {{ props.row.iron }}
        </q-td> -->
      </q-tr>
      <!-- Transaction Type -->
      <q-tr slot="body" slot-scope="props" :props="props">

      </q-tr>
    </q-table>
  </div>

</template>

<script>
import { QTable, QTr, QTd, QTooltip, QBtnGroup, QBtn } from 'quasar'
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
    QBtnGroup,
    QBtn
  },
  data() {
    return {
      isTransaction: true,
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
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getTransactions', 'getTransfers']),
    async getData() {
      let res = []
      let limit = this.pagination.rowsPerPage
      let pageNo = this.pagination.page
      let condition = {
        // TODO 参数 bug
        orderBy: 'timestamp:desc',
        limit: limit,
        offset: (pageNo - 1) * limit
      }
      if (this.type === 'trans') {
        // trans type with address
        // TODO nickname support
        // ownerID for transfers
        condition.senderId = this.params.address
      } else if (this.type === 'block') {
        // block table
        condition.height = this.params.height
      }
      if (this.isTransaction) {
        res = await this.getTransactions(condition)
      } else {
        // TODO: what it need for query?
        res = await this.getTransfers(condition)
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
    }
  },
  computed: {
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
    }
  },
  watch: {
    params(val) {
      this.getData()
    },
    isTransaction() {
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>