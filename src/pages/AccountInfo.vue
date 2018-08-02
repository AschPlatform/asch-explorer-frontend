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
  name: 'AccountInfo',
  components: {
    QPage,
    Breadcrumb,
    InfoPanel
  },
  data() {
    return {
      panelData: [
        {
          label: 'NICK',
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
  async mounted() {
    // let result = await this.getAccount(this.address)
    // TODO: due with result
    // console.log(result)
  },
  computed: {
    address() {
      // console.log(this.$route.params)
      return this.$route.params.address || 0
    }
  },
  methods: {
    ...mapActions(['getAccount'])
  }
}
</script>

<style scoped>

</style>
