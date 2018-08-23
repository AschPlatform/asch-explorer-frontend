<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="flex w-full relative-position">
      <table class="q-table horizontal-separator highlight loose accountinfo-table margin-t-20 table-tr-td-p-0">
        <tbody class='info-tbody'>
          <tr v-show="data.value != null" v-for="(data, idx) in panelData" :key="idx">
            <td class="w-1/6">{{$t(data.label)}}</td>
            <td class="w-2/3 text-xs">
              <span :class="data.link?`text-primary cursor-pointer`:''" @click="data.link?$router.push(data.link+data.value):null">
                              <span v-if="data.type==='number'" >{{data.value | numSeparator}}</span>
              <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp}}</span>
              <span v-else-if="data.type==='address'" class="text-primary cursor-pointer" @click="doSearch(data.value)">
                <span v-if="data.nickname">
                  {{data.nickname}}({{data.value}})
                </span>
                <span v-else>
                  {{data.value}}
                </span>
              </span>
              <pre v-else-if="data.type==='id'" class="custom-pre-wrap">{{data.value}}</pre>
              <pre v-else-if="data.type==='preBlock'" class="text-primary cursor-pointer" @click="doSearch(data.value, 'id')">{{data.value}}</pre>
              <pre v-else-if="data.type==='argStr'" class="custom-pre-wrap">{{data.value}}</pre>
              <span v-else-if="data.type==='block'" class="text-primary cursor-pointer" @click="doSearch(data.value)">{{data.value}}</span>
              <span v-else> {{data.value}} </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <q-inner-loading :visible="loadingBool">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </div>
  </transition>
</template>

<script>
import { QInnerLoading, QSpinnerGears } from 'quasar'
import ICountUp from 'vue-countup-v2'
import { toast } from '../utils/util'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'InfoPanel',
  props: ['panelData'],
  components: {
    ICountUp,
    QInnerLoading,
    QSpinnerGears
  },
  data() {
    return {
      visible: true,
      isDisable: false
    }
  },
  mounted() {
    this.showLoading()
  },
  methods: {
    ...mapActions(['setLoadingflag']),
    showLoading() {
      if (this.panelData) {
        this.setLoadingflag(true)
        setTimeout(() => {
          this.setLoadingflag(false)
        }, 2000)
      }
      this.setLoadingflag(true)
    },
    info(msg) {
      if (this.isDisable === true) {
        return
      }
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 3000)
      toast(msg)
    },
    doSearch(str, type) {
      this.$root.$emit('doSearch', str, type)
    }
  },
  computed: {
    ...mapGetters(['loadingBool'])
    // loadingFlg() {
    //   return this.loadingBool
    // }
  },
  watch: {
    panelData() {
      this.showLoading()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>