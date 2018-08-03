<template>
  <q-page padding class="">
    <breadcrumb />

    <div class=" rounded overflow-hidden">
      <div class="">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <info-panel :panelData="panelData" />
    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
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
    panelData() {
      return [
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
        },
        {
          label: 'BLOCK_ID',
          value: this.block
        },
        {
          label: 'PRODUCER',
          value: this.producer
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
          value: this.preBlock
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
