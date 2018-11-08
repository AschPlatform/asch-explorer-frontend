<template>
  <div class="">
    <div class="flex justify-between items-center xs:mb-15 sm:mb-30" :data-aos="panelContainerClass" data-aos-delay="0" data-aos-easing="ease-in-sine" data-aos-duration="800" data-aos-offset="0">
      <div class="flex items-center">
        <q-icon class="xs:text-18 sm:text-26 text-tw-grey-darkest mr-10" :name="panelIcon" />
        <span class="xs:text-16 sm:text-24 text-tw-grey-darkest font-medium">{{panelName}}</span>
      </div>
      <div class="text-14 text-tw-white bg-tw-black-lighter hover:bg-tw-blue px-12 py-6 cursor-pointer" @click="open">
        {{$t('MORE')}}
      </div>
    </div>
    <panel-item v-for="(data, idx) in datas" :key="idx" :type="type" :data="data" />
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import PanelItem from './PanelItem'
import { mapActions, mapGetters } from 'vuex'
import { toastError, isDesktop } from '../utils/util'

export default {
  name: 'PanelContainer',
  props: ['type'],
  components: {
    QIcon,
    PanelItem
  },
  data() {
    return {
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
    panelContainerClass() {
      return isDesktop() ? (this.type === 'trans' ? 'fade-left' : 'fade-right') : 'fade-up'
    },
    panelIcon() {
      return this.type === 'trans' ? 'icon-transfer' : 'icon-forging'
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