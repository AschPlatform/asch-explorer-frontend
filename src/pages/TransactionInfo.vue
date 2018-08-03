<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="text-14 text-black-dark">
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
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'

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
      panelData: [
        {
          label: 'SENDER',
          value: ''
        },
        {
          label: 'RECEIVER',
          value: ''
        },
        {
          label: 'TRANS_TYPE',
          value: ''
        },
        {
          label: 'AMOUNT',
          value: ''
        },
        {
          label: 'TRANS_FEE',
          value: ''
        },
        {
          label: 'BLOCK_HEIGHT',
          value: '',
          type: 'number'
        },
        {
          label: 'TRANS_TIME',
          value: ''
        }
      ]
    }
  },
  async mounted() {
  },
  computed: {
    tid() {
      return this.$route.params.id || 0
    }
  },
  methods: {
    ...mapActions(['getTransactionInfo'])
  }
}
</script>
