<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
  
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2" />
      <info-panel :panelData="panelData" />
      <table-container :type="'trans'" :params="params" />
    </div>
    <!-- <boundary-line /> -->
    <!-- <table-container :type="'trans'" :params="params" /> -->
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'

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
      produceTime: ''
    }
  },
  async mounted() {
    let result = await this.getBlockInfo({
      height: this.blockHeight
    })
    if (result.success) {
      this.block = result.block.id
      this.producer = result.block.generatorPublicKey
      this.transNum = result.block.numberOfTransactions
      this.transFee = convertFee(result.block.totalFee) + ' XAS'
      this.preBlock = result.block.previousBlock
      this.produceTime = fulltimestamp(result.block.timestamp)
    }
  },
  computed: {
    blockHeight() {
      return Number(this.$route.params.height) || 0
    },
    rewardCount() {
      return '3.5 XAS'
    },
    params() {
      let height = this.$route.params.height
      let params = {
        height
      }
      // diffrent params in table list
      return params
    },
    panelData() {
      return [
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
          // link: '/blocks_height/'
        },
        {
          label: 'BLOCK_ID',
          value: this.block,
          link: '/blocks_id/'
        },
        {
          label: 'PRODUCER',
          value: this.producer
        },
        // {
        //   label: 'FORGE_REWARD',
        //   value: this.rewardCount
        // },
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
          link: '/blocks_id/'
        },
        {
          label: 'PRODUCER_TIME',
          value: this.produceTime
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getBlockInfo'])
  }
}
</script>

<style scoped>
</style>
