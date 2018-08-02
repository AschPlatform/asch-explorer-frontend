<template>
  <q-page padding class="">
    <breadcrumb />
    <div class=" rounded overflow-hidden">
      <info-panel :panelData="panelData" />
    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
  },
  data() {
    return {
      panelData: [
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
        },
        {
          label: 'BLOCK',
          value: ''
        },
        {
          label: 'PRODUCER',
          value: ''
        },
        {
          label: 'FORGE_REWARD',
          value: ''
        },
        {
          label: 'TRANS_NUM',
          value: '',
          type: 'number'
        },
        {
          label: 'TRANS_FEE',
          value: ''
        },
        {
          label: 'PRE_BLOCK',
          value: '',
          type: 'number'
        },
        {
          label: 'PRODUCER_TIME',
          value: ''
        }
      ]
    }
  },
  async mounted() {
    // let result = await this.getBlockInfo(this.blockHeight)
    // TODO: due with result
    // console.log(result, 'result')
  },
  computed: {
    blockHeight() {
      // console.log(this.$route.params)
      return this.$route.params.height || 0
    }
  },
  methods: {
    ...mapActions(['getBlockInfo'])
  }
}
</script>

<style scoped>

</style>
