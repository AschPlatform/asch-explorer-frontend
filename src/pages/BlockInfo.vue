<template>
  <q-page padding class="">
    <breadcrumb />
    <table-container :type="'trans'" :params="params" />

    <div class=" rounded overflow-hidden">
      <div class="">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <info-panel  />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
  },
  computed: {
    params() {
      let height = this.$route.params.height
      let params = { height }
      // diffrent params in table list
      return params
    }
  }
}
</script>
