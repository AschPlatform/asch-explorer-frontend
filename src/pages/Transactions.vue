<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <q-btn-group class="mt-8" outline>
        <q-btn outline v-for="(item, idx) in btnGroup" :label="item.label" @click="changeType(item.value)" :key="idx"></q-btn>
      </q-btn-group>
      <table-container :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
        <!-- <template slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id">
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
          <q-td v-if="props.props.height" key="height" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.height)">
              {{ props.props.height }}
            </div>
          </q-td>
          <q-td v-if="props.props.timestamp > -1" key="timestamp" >
            <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
          <q-td v-if="props.props.type" key="type" >
            <span class="">{{ getTransType(props.props) }}</span>
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
            <span v-if="getAmount(props.props.transaction)">{{ getAmount(props.props.transaction) }}</span>
          </q-td>
          <q-td v-if="props.props.transferAmount" key="transferAmount">
            <span v-if="getTransAmount(props.props)">{{ getTransAmount(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.currency" key="currency" >
            <span class="">{{ (props.props.currency) + $t('TRS_TYPE_TRANSFER') }}</span>
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
          <q-td v-if="props.props.transaction && props.props.transaction.fee" key="transferFee" >
            <span>0.1</span>
          </q-td>
        </template> -->
        <template slot="items" slot-scope="props" v-if="props.props">
          <table-item  :data="getTableData(props.props)" />
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip, QBtnGroup, QBtn } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import TableContainer from '../components/TableContainer'
import { fulltimestamp, convertFee } from '../utils/util'
import { transTypes } from '../utils/constants'
import { mapActions, mapGetters } from 'vuex'
import TableItem from '../components/TableItem'

export default {
  name: 'Transactions',
  components: {
    QPage,
    Breadcrumb,
    TableContainer,
    QTd,
    QTooltip,
    QBtnGroup,
    QBtn,
    TableItem
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
      type: 0,
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
  methods: {
    ...mapActions(['getTransactions', 'getTransfers']),
    fulltimestamp,
    async getData(props = this.defaultProps) {
      this.data = []
      let res
      // For transactions
      if (this.type === 0) {
        // For transactions
        res = await this.getTransactions(props)
        this.data = res.transactions
        this.count = res.count
      } else {
        // For transfers
        res = await this.getTransfers(props)
        this.data = res.transfers
        this.count = res.count
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
    changeType(val) {
      this.reset()
      this.type = val
      // this.getData(this.defaultProps)
    },
    reset() {
      this.defaultProps = {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
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
    getTableData(data) {
      const { id = null, tid = null, height, recipientId, senderId, currency, args = [], fee, timestamp } = data

      let idField = {
        label: 'TRANSACTION_ID',
        value: id || tid,
        type: 'id'
      }

      let heightField = {
        label: 'HEIGHT',
        value: height,
        type: 'number'
      }

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

      let argsField = {
        label: 'ARGUMENTS',
        // value: args && args.join(' ')
        value: args && args.join('').substring(0, 5)
      }

      let feeField = {
        label: 'FEE',
        value: convertFee(fee)
      }

      let receiverField = {
        label: 'TRANS_RECRIVER',
        value: recipientId,
        type: 'address'
      }

      let currencyField = {
        label: 'ASSET',
        value: currency
      }

      let amountField = {
        label: 'AMOUNT',
        value: this.getAmount(data)
      }

      let tablePanelData =
        this.type === 0
          ? [idField, heightField, timeField, typeField, senderField, argsField, feeField]
          : [
              idField,
              heightField,
              timeField,
              senderField,
              receiverField,
              amountField,
              currencyField,
              feeField
            ]

      return tablePanelData
    }
  },
  computed: {
    ...mapGetters(['getPrecision']),
    params() {
      return this._.merge({ type: this.type }, {})
    },
    columnsData() {
      if (this.type === 0) {
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
  }
}
</script>
