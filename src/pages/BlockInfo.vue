<template>
  <q-page padding class="">
    <breadcrumb />
    <div class=" rounded overflow-hidden">
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

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
  }
}
</script>
