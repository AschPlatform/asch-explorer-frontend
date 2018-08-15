<template>
  <panel-item v-if="data" :type="type" :data="data" />
</template>
<script>
import PanelItem from './PanelItem'
import { mapActions } from 'vuex'
import { toastError } from '../utils/util'

export default {
  name: 'PanelContainer',
  props: ['type'],
  components: { PanelItem },
  data() {
    return { data: null }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions(['getBlocks', 'getTransactions']),
    async getData() {
      let res
      const conditions = {
        limit: 5
      }
      if (this.type === 'trans') {
        res = await this.getBlocks(conditions)
      } else {
        res = await this.getTransactions(conditions)
      }

      if (res.success) {
        this.data = this.type === 'trans' ? res.transactions : res.blocks
      } else {
        toastError(this.$t('NO_DATA'))
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>