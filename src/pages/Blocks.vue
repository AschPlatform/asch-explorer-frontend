<template>
  <q-page class="flex flex-center">
    <breadcrumb />
    <div class="">
      Blocks
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'Blocks',
  components: {
    QPage,
    Breadcrumb
  }
}
</script>
