<template>
  <q-table :title="title" :data="datas" :columns="columns" :pagination.sync="pagination" row-key="name">
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td v-if="props.row.id" key="id" :props="props" >
        <span class="text-italic">{{ props.row.id }}</span>
      </q-td>
      <q-td v-if="props.row.type" key="type" :props="props" >
        <span class="text-italic">{{ getTransType(props.row) }}</span>
      </q-td>
      <q-td v-if="props.row.senderId" key="senderId" :props="props" >
        <span class="text-italic">{{ props.row.senderId }}</span>
      </q-td>
      <q-td v-if="props.row.args" key="recipientId" :props="props" >
        <span class="text-italic">{{ getRecipient(props.row) }}</span>
      </q-td>
      <q-td v-if="props.row.amount" key="amount" :props="props" >
        <span class="text-italic">{{ props.row.amount }}</span>
      </q-td>
      <q-td v-if="props.row.fee" key="fee" :props="props" >
        <span class="text-italic">{{ props.row.fee }}</span>
      </q-td>
      <q-td v-if="props.row.timestamp" key="timestamp" :props="props" >
        <span class="text-italic">{{ props.row.timestamp | formatTimestamp }}</span>
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
  </q-table>

</template>

</template>
<script>
import { QTable, QTr, QTd } from 'quasar'
import { mapActions } from 'vuex'
import { transTypes } from '../utils/constants'

export default {
  name: 'TableContaine',
  props: ['type', 'params'],
  components: {
    QTable,
    QTr,
    QTd
  },
  data() {
    return {
      datas: [],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions(['getTransactions']),
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
        condition.senderId = this.params.address
      } else if (this.type === 'block') {
        // block table
        condition.height = this.params.height
      }
      res = await this.getTransactions(condition)
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
        if (args && args.length === 3) currencySymbol = args[1]
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
      const { args } = trans
      const len = args.length
      return args[len - 2]
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
          field: 'type'
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
  }
}
</script>

<style lang="stylus" scoped>
</style>