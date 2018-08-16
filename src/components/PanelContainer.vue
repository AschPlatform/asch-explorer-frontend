<template>
<div class="">
  <div>{{panelName}}</div>
  <panel-item v-for="(data, idx) in datas" :key="idx" :type="type" :data="data" />
</div>
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
    return { datas: null }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions(['getBlocks', 'getTransactions']),
    async getData() {
      let res
      const conditions = {
        limit: 5,
        orderBy: 'height:desc'
      }
      if (this.type === 'trans') {
        res = await this.getTransactions(conditions)
      } else {
        res = await this.getBlocks(conditions)
      }

      if (res.success) {
        this.datas = this.type === 'trans' ? res.transactions : res.blocks
      } else {
        toastError(this.$t('NO_DATA'))
      }
    }
  },
  computed: {
    panelName() {
      const t = this.$t
      return t(this.type === 'trans' ? 'TRANS' : 'FORGE')
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>