<template>
  <div class="">
    <div class="flex justify-between items-center mb-30">
      <div class="flex items-center">
        <i class="material-icons text-24 text-tw-green mr-10">{{isTrans}}</i>
        <span class="text-24 text-tw-grey">{{panelName}}</span>
      </div>
      <div class="flex justify-end">
        <!-- <div class=""></div> -->
        <div class="text-14 text-tw-grey hover:text-tw-green border border-solid border-tw-grey hover:border-tw-green px-11 py-6 cursor-pointer" @click="open">
          {{$t('MORE')}}
        </div>
      </div>
    </div>
    <panel-item v-for="(data, idx) in datas" :key="idx" :type="type" :data="data" />
  </div>
</template>

<script>
import PanelItem from './PanelItem'
import { mapActions, mapGetters } from 'vuex'
import { toastError } from '../utils/util'

export default {
  name: 'PanelContainer',
  props: ['type'],
  components: {
    PanelItem
  },
  data() {
    return {
      // isTrans: true,
      datas: null
    }
  },
  async mounted() {
    this.assetMap.size === 0 && (await this.getAssets())
    this.getData()
  },
  methods: {
    ...mapActions(['getBlocks', 'getTransactions', 'getAssets']),

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
    },
    open() {
      this.$router.push(this.type === 'trans' ? 'transactions' : 'blocks')
    }
  },
  computed: {
    ...mapGetters(['getHeight', 'assetMap']),
    isTrans() {
      return this.type === 'trans' ? 'swap_horiz' : 'gavel'
    },
    panelName() {
      const t = this.$t
      return t(this.type === 'trans' ? 'TRANS' : 'FORGE')
    }
  },
  watch: {
    getHeight(val) {
      if (val) this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>