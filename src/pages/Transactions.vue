<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <table-container :data="data" :count="count" :params="height" :columnsData="columnsData" @getData="getData">
        <template slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.height" key="height">
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.height)">
              {{ props.props.height }}
              <q-tooltip>{{ props.props.height }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.timestamp" key="timestamp" >
              <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
          <q-td v-if="props.props.type" key="type" >
            <span>{{ getTransType(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.senderId" key="senderId" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.senderId)">
              {{ props.props.senderId | eclipse }}
              <q-tooltip>{{ props.props.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.args || props.props.args === null" key="args" >
           <div v-if="props.props.args && props.props.args.length > 0" >
            <span>{{ props.props.args.join(',') | eclipse }}</span>
              <q-tooltip>{{ props.props.args }}</q-tooltip>
           </div>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.props.fee" key="fee" >
            <span v-if="props.props.fee">{{ props.props.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import TableContainer from '../components/TableContainer'
import { fulltimestamp } from '../utils/util'
import { transTypes } from '../utils/constants'
import { mapActions } from 'vuex'

export default {
  name: 'Transactions',
  components: {
    QPage,
    Breadcrumb,
    TableContainer,
    QTd,
    QTooltip
  },
  data() {
    return {
      data: [],
      defaultProps: {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      },
      count: 0,
      columnsData: [
        {
          name: 'id',
          label: this.$t('TRANSACTION_ID'),
          field: 'id',
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
          label: this.$t('FEE'),
          field: 'fee',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getTransactions']),
    fulltimestamp,
    async getData(props = this.defaultProps) {
      let res
      // For transactions
      // TODO: BLOCKS API should accept address or publickey
      res = await this.getTransactions(props)
      this.data = res.transactions
      this.count = res.count
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
    }
  }
}
</script>
