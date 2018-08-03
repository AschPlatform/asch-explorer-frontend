<template>
  <q-page padding class="">
    <breadcrumb />
    <div class=" rounded overflow-hidden">
      <info-panel :panelData="panelData" />
          <table-container :type="'trans'" :params="params" />

    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'

import { mapActions } from 'vuex'

export default {
  name: 'AccountInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel,
    TableContainer
  },
  data() {
    return {
      panelData: [
        {
          label: 'NICKNAME',
          value: ''
        },
        {
          label: 'ACCOUNT_LEFT',
          value: []
        },
        {
          label: 'ACCOUNT_ADDRESS',
          value: ''
        }
      ]
    }
  },
  async mounted() {},
  computed: {
    address() {
      return this.$route.params.address || 0
    },
    params() {
      let address = this.$route.params.address
      let nickname = this.$route.params.nickname
      let params = {}
      // diffrent params in table list
      if (address) params.address = address
      if (nickname) params.nickname = nickname
      return params
    }
  },
  methods: {
    ...mapActions(['getAccount'])
  }
}
</script>

<style scoped>
</style>
