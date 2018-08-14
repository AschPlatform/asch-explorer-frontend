<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
  
    <div class="border border-solid border-ash-light overflow-hidden xs:overflow-scroll sm:overflow-hidden mb-4">
      <div class="text-20 text-blue-light pl-30 pt-30">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="my-30" />
      <info-panel class="px-30" :panelData="panelData" />
      <boundary-line class="my-30" />
      <table-container :data="data" :count="count" isTransaction="true" @getData="getData" />
    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp, getAddress } from '../utils/util'

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    BoundaryLine,
    Breadcrumb,
    InfoPanel,
    TableContainer
  },
  data() {
    return {
      block: '',
      producer: '',
      transNum: 0,
      transFee: '',
      preBlock: '',
      produceTime: '',
      data: [],
      defaultProps: {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      },
      count: 0
    }
  },
  async mounted() {
    this.envalueData()
  },
  computed: {
    blockHeight() {
      return Number(this.$route.params.height) || 0
    },
    rewardCount() {
      let blockHeight = this.blockHeight
      if (blockHeight) {
        switch (true) {
          case (blockHeight < 3464500 && blockHeight > 464500):
            return '3.5 XAS'
          case (blockHeight < 6464500 && blockHeight > 3464500):
            return '3.0 XAS'
          case (blockHeight < 9464500 && blockHeight > 6464500):
            return '2.5 XAS'
          case (blockHeight < 12464500 && blockHeight > 9464500):
            return '2 XAS'
          case (blockHeight < 15464500 && blockHeight > 12464500):
            return '1 XAS'
          case (blockHeight > 15464500):
            return '0.5 XAS'
          default:
            return '0 XAS'
        }
      }
      return this.$t('LOADING')
    },
    height() {
      return this.$route.params.height
    },
    // params() {
    //   return {
    //     height: this.height
    //   }
    // },

    panelData() {
      return [
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
        },
        {
          label: 'BLOCK_ID',
          value: this.block,
          type: 'id'
        },
        {
          label: 'PRODUCER',
          value: this.producer,
          type: 'address'
        },
        {
          label: 'FORGE_REWARD',
          value: this.rewardCount
        },
        {
          label: 'TRANS_NUM',
          value: this.transNum,
          type: 'number'
        },
        {
          label: 'TRANS_FEE',
          value: this.transFee
        },
        {
          label: 'PRE_BLOCK',
          value: this.preBlock,
          type: 'preBlock'
        },
        {
          label: 'PRODUCER_TIME',
          value: this.produceTime
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getBlockInfo', 'getTransactions']),
    async envalueData() {
      let result = await this.getBlockInfo({
        height: this.blockHeight
      })
      if (result.success) {
        let trans = result.block
        this.block = trans.id
        this.producer = getAddress(trans.generatorPublicKey)
        this.transNum = trans.numberOfTransactions
        this.transFee = convertFee(trans.totalFee) + ' XAS'
        this.preBlock = trans.previousBlock
        this.produceTime = fulltimestamp(trans.timestamp)
      }
    },
    async getData(props = this.defaultProps) {
      let res
      // For transactions
      props.height = this.height
      res = await this.getTransactions(props)
      this.data = res.transactions
      this.count = res.count
    }
  },
  watch: {
    height() {
      this.envalueData()
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
