<template>
  <q-page class="flex flex-center">
    <div class="">
      Delegates
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import { mapActions } from 'vuex'
import TableContainer from '../components/TableContainer'

export default {
  name: 'Delegates',
  components: {
    QPage,
    QTd,
    QTooltip
  }
}
</script>
