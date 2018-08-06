<template>
  <q-page class="">
    <breadcrumb />
    <div class=" rounded overflow-hidden">
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
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'
import { transTypes } from '../utils/constants'

export default {
  name: 'TransactionsInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
  },
  data() {
    return {
      transSender: '',
      transReceiver: '',
      transID: 0,
      amount: 0,
      transFee: 0,
      blockHeight: 0,
      transTime: 0
    }
  },
  async mounted() {
    let result = await this.getTransactionInfo({
      tid: this.tid
    })
    if (result.success) {
      // TODO: change to reactive function
      // transDetail(result.transaction.type)
      console.log(result.transaction)
      this.transSender = result.transaction.senderId
      this.transReceiver = result.transaction.generatorPublicKey || '--'
      this.transNum = convertFee(result.transaction.args[0]) + ' XAS'
      this.transFee = convertFee(result.transaction.fee) + ' XAS'
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
          label: 'TRANS_TIME',
          value: this.transTime
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getTransactionInfo'])
  }
}
</script>
