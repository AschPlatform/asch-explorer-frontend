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
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'

export default {
  name: 'TransactionsInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
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
