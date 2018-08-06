<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2" />
      <info-panel :panelData="panelData" />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
/* eslint-disable */
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'
import { transTypes } from '../utils/constants'

export default {
  name: 'TransactionsInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel,
    BoundaryLine
  },
  data() {
    return {
      transSender: null,
      transReceiver: null,
      transID: null,
      amount: null,
      transFee: null,
      blockHeight: 0,
      transTime: null,
      argStr: null
    }
  },
  async mounted() {
    let result = await this.getTransactionInfo({
      tid: this.tid
    })
    if (result.success) {
      // TODO: change to reactive function
      this.transDetail(result.transaction)
      // this.transSender = result.transaction.senderId
      // this.transReceiver = result.transaction.generatorPublicKey || '--'
      // this.transNum = convertFee(result.transaction.args[0]) + ' XAS'
      // this.transFee = convertFee(result.transaction.fee) + ' XAS'
      this.transTime = fulltimestamp(result.transaction.timestamp)
      this.transID = result.transaction.type
      this.blockHeight = result.transaction.height
    }
  },
  computed: {
    tid() {
      return this.$route.params.id || 0
    },
    transType() {
      return transTypes[this.transID]
    },
    panelData() {
      return [
        {
          label: 'TRANS_SENDER',
          value: this.transSender
        },
        {
          label: 'TRANS_RECRIVER',
          value: this.transReceiver
        },
        {
          label: 'TRANS_TYPE',
          value: this.$t(this.transType)
        },
        {
          label: 'AMOUNT',
          value: this.transNum
        },
        {
          label: 'TRANS_FEE',
          value: this.transFee
        },
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
        },
        {
          label: 'ARGUMENTS',
          value: this.argStr
        },
        {
          label: 'TRANS_TIME',
          value: this.transTime
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getTransactionInfo']),
    transDetail(trans) {
      switch (trans.type) {
        case 1:
            this.transSender = trans.senderId
            this.transReceiver = trans.args[1] || '--'
            this.transNum = convertFee(trans.args[0]) + ' XAS'
            this.transFee = convertFee(trans.fee) + ' XAS'
          break;
        case 103:
            // TODO: set global precision map
            // let precision = 
            this.transSender = trans.senderId
            this.transReceiver = trans.args[2] || '--'
            this.transNum = convertFee(trans.args[0]) + trans.args[0]
        // case 
        default:
            this.transSender = trans.senderId
            this.argStr = trans.args.join(', ')
          break;
      }
    }
  }
}
</script>
