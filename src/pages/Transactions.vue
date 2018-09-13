<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
     <breadcrumb class="xs:mt-5 sm:mt-20" />
    <div class="xs:border-0 sm:border-0 border-solid border-tw-grey rounded-lg xs:px-0 xs:pt-0 xs:pb-15 sm:pb-30">
      <div class="mobile-only my-20">
        <button class="px-12 py-6 border-0 text-white text-16" :class="this.type === 1 ? 'bg-tw-blue' : 'bg-tw-grey-darkest'" @click="changeType(1)">
          {{$t('TRANS_TABLE')}}
        </button>
        <button class="px-12 py-6 border-0 text-white text-16" :class="this.type === 0 ? 'bg-tw-blue' : 'bg-tw-grey-darkest'" @click="changeType(0)">
          {{$t('TRANSACTION_TABLE')}}
        </button>
      </div>
      <div class="relative desktop-only w-full border-1 border-solid border-tw-grey">
        <button :class="this.type === 1 ? styleSelected : styleUnselected" @click="changeType(1)">
          {{$t('TRANS_TABLE')}}
        </button>
        <button :class="this.type === 0 ? styleSelected : styleUnselected" @click="changeType(0)">
          {{$t('TRANSACTION_TABLE')}}
        </button>
      </div>
      <table-container class="table-thead-border-top" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.tid" key="tid">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.tid)">
              {{ props.props.tid | eclipse }}
              <q-tooltip>{{ props.props.tid }}</q-tooltip>
            </div>
          </q-td>
          <q-td key="height" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
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
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.senderId)">
              {{ props.props.senderId | eclipse }}
              <q-tooltip>{{ props.props.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.recipientId" key="recipientId" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.recipientId)">
              {{ props.props.transaction.args[props.props.transaction.args.length - 1] | eclipse }}
              <q-tooltip>{{ props.props.recipientId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.amount" class="text-right" key="amount" >
            <span v-if="getAmount(props.props.transaction)">{{ getAmount(props.props.transaction) }}</span>
          </q-td>
          <q-td v-if="props.props.transferAmount" class="text-right" key="transferAmount">
            <span v-if="getTransAmount(props.props)">{{ getTransAmount(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.currency" class="text-right align-baseline custom-chip" key="currency">
            <span class="text-12 tw-grey-darkest mt-10 mr-10">{{ props.props.currency !== 'XAS' ? props.props.currency.split('.')[0] : ''}}</span>
            <q-chip class="text-12" color="blue" text-color="white">{{ props.props.currency.split('.')[1] || props.props.currency.split('.')[0]}}</q-chip>
          </q-td>
         <q-td v-if="props.props.args || props.props.args === null" key="args" >
           <div v-if="props.props.args && props.props.args.length > 0" >
            <span>{{ props.props.args.join(',') | eclipse }}</span>
              <q-tooltip><pre>{{ props.props.args }}</pre></q-tooltip>
           </div>
            <span v-else>--</span>
          </q-td>
          <q-td v-if="props.props.fee || props.props.fee === 0" key="fee" class="text-right">
            <span>{{ props.props.fee | fee }}</span>
          </q-td>
          <q-td v-if="props.props.transaction && props.props.transaction.fee" key="transferFee" class="text-right">
            <span>0.1</span>
          </q-td>
        </template>
        <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
          <table-item :data="getTableData(props.props)" :bgIcon="'icon-accounts'" :dataIcon="'icon-transaction'"/>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<style scoped>
.w-188 {
  width: 188px;
}
.btn {
  border-top: none;
  border-left: none;
  border-right: 1px solid #E0E1E5;
  border-bottom: 1px solid #ffffff;
}
.selected {
  bottom: -1px;
}
motivi:hover {
  transform: scale(1.1);
}
</style>

<script>
import { QPage, QTd, QTooltip, QBtn, QChip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import TableContainer from '../components/TableContainer'
import { fulltimestamp, convertFee, isDesktop } from '../utils/util'
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
    QBtn,
    TableItem,
    QChip
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
      ],
      styleSelected: 'bg-transparent relative absulote h-57 w-188 text-20 text-tw-blue px-12 py-6 cursor-pointer btn selected',
      styleUnselected: 'bg-transparent relative h-57 w-188 text-20 text-tw-grey-darkest px-12 py-6 cursor-pointer btn'
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
      const { id = null, tid = null, recipientId, senderId, timestamp } = data

      let idField = {
        label: 'TRANSACTION_ID',
        value: id || tid,
        type: 'transactionId'
      }

      // let heightField = {
      //   label: 'HEIGHT',
      //   value: height,
      //   type: 'number'
      // }

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

      // let argsField = {
      //   label: 'ARGUMENTS',
      //   // value: args && args.join(' ')
      //   value: args && args.join('').substring(0, 5)
      // }

      // let feeField = {
      //   label: 'FEE',
      //   value: convertFee(fee)
      // }

      let receiverField = {
        label: 'TRANS_RECRIVER',
        value: recipientId,
        type: 'address'
      }

      // let currencyField = {
      //   label: 'ASSET',
      //   value: currency
      // }

      // let amountField = {
      //   label: 'AMOUNT',
      //   value: this.getAmount(data)
      // }

      let tablePanelData =
        this.type === 0
          ? [idField, typeField, senderField, timeField]
          : [
              idField,
              senderField,
              receiverField,
              timeField
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
            label: this.$t('TRANSACTION_ID'),
            field: 'ID',
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
            label: this.$t('TRANS_FEE'),
            field: 'fee',
            align: 'center'
          }
        ]
      } else {
        return [
          {
            name: 'tid',
            label: this.$t('TRANSACTION_ID'),
            field: 'tid',
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
            label: this.$t('TRANSACTION_TYPE'),
            field: 'currency',
            align: 'center'
          },
          {
            name: 'transferFee',
            label: this.$t('TRANS_FEE'),
            field: 'fee',
            align: 'center'
          }
        ]
      }
    },
    iconName() {
      return this.type === 0 ? 'icon-accounts' : 'icon-turn'
    },
    isDesktop() {
      return isDesktop()
    }
  }
}
</script>
