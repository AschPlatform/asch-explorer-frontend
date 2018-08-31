<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <breadcrumb class="xs:mt-5 sm:mt-40" />
    <div class="border border-solid border-tw-grey rounded-lg xs:px-10 xs:py-15 sm:px-40 sm:py-30">
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest">
        {{this.$t('TRANSACTION_INFO')}}
      </div>
      <boundary-line class="xs:my-15 sm:my-30" />
      <div class="flex justify-between">
        <info-panel :panelData="panelData" />
        <div class="self-end w-auto xs:hidden sm:block pb-10">
          <q-icon class="text-60 text-tw-grayish" name="icon-turn" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QIcon } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import { convertFee, fulltimestamp, toast } from '../utils/util'
import { transTypes } from '../utils/constants'
import { mapGetters, mapActions } from 'vuex'
import infoImge from '../assets/asch_logo.png'

export default {
  name: 'TransactionsInfo',
  components: {
    QPage,
    QIcon,
    Breadcrumb,
    InfoPanel,
    BoundaryLine
    // infoImge
  },
  data() {
    return {
      infoImge,
      transSender: null,
      transReceiver: null,
      transID: null,
      amount: null,
      transFee: null,
      blockHeight: 0,
      transTime: null,
      argStr: null,
      finalType: null
    }
  },
  async mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['getPrecision']),
    tid() {
      return this.$route.params.id || 0
    },
    transType() {
      return transTypes[this.transID]
    },
    panelData() {
      return [
        {
          label: 'TRANSACTION',
          value: this.tid
        },
        {
          label: 'TRANS_SENDER',
          value: this.transSender,
          type: 'address'
        },
        {
          label: 'TRANS_RECRIVER',
          value: this.transReceiver,
          type: 'address'
        },
        {
          label: 'TRANS_TYPE',
          value: this.finalType
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
          type: 'block'
        },
        {
          label: 'ARGUMENTS',
          value: this.argStr,
          type: 'argStr'
        },
        {
          label: 'TRANS_TIME',
          value: this.transTime
        }
      ]
    },
    params() {
      let address = this.$route.params.address
      let params = {}
      if (address) params.address = address
      return params
    }
  },
  methods: {
    ...mapActions(['getTransactionInfo']),
    transDetail(trans) {
      switch (trans.type) {
        case 1:
          this.transSender = trans.senderId
          this.transReceiver = trans.args[1] || '--'
          this.transNum = convertFee(trans.args[0])
          this.transFee = convertFee(trans.fee) + ' XAS'
          break
        case 103:
          // TODO: set global precision map
          let precision = this.getPrecision(trans.args[0])
          this.transSender = trans.senderId
          this.transReceiver = trans.args[2] || '--'
          this.transNum = convertFee(trans.args[1], precision)
          break
        // case
        default:
          this.transSender = trans.senderId
          this.transFee = convertFee(trans.fee) + ' XAS'
          if (trans.args) {
            this.argStr = trans.args.join(', ')
          }
          break
      }
    },
    async getData(trans) {
      this.reset()
      try {
        let result = await this.getTransactionInfo({
          tid: this.tid
        })
        if (result.success) {
          this.transDetail(result.transaction)
          this.transTime = fulltimestamp(result.transaction.timestamp)
          this.getTransType(result.transaction)
          this.transID = result.transaction.type
          this.blockHeight = result.transaction.height
        } else {
          toast(this.$t('ERR_INVALID_SEARCH'))
          this.$router.push('/')
        }
      } catch (e) {
        toast(this.$t('ERR_INVALID_SEARCH'))
        this._.delay(() => this.$router.push('/'), 1000)
      }
    },
    getTransType(trans) {
      if (trans.args) {
        const { type, args } = trans
        let currencySymbol = 'XAS'
        let transType = this.$t(transTypes[type])
        // type that need fill with currency symbol
        const filterTransType = [1, 103]
        if (filterTransType.indexOf(type) >= 0) {
          if (args && args.length === 3) currencySymbol = args[0]
          this.finalType = currencySymbol + ' ' + transType
        } else {
          this.finalType = transType
        }
      } else {
        this.finalType = this.$t(transTypes[trans.type])
      }
    },
    reset() {
      this.transSender = null
      this.transReceiver = null
      this.transID = null
      this.amount = null
      this.transFee = null
      this.blockHeight = 0
      this.transTime = null
      this.argStr = null
    }
  },
  watch: {
    params() {
      this.getData()
    }
  }
}
</script>
