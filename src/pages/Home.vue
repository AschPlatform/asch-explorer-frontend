<template>
  <q-page class="">
    <state-banner :stateData="stateData" />
    <div class="flex">
      
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import { QPage } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    QPage
  },
  mounted() {},
  methods: {
    ...mapActions(['getMoreAssets', 'getAsset'])
  }
}
</script>
