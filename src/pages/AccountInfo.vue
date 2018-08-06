<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2" />
      <info-panel :panelData="panelData" />
      <table-container class="mt-8" :type="'trans'" :params="params" />
    </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import BoundaryLine from '../components/BoundaryLine'
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
    TableContainer,
    BoundaryLine
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
