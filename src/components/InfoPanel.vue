<template>
  <div v-if="panelData" class="flex w-full">
  
    <table class="q-table horizontal-separator highlight loose accountinfo-table margin-t-20 table-tr-td-p-0">
      <tbody class='info-tbody'>
        <tr v-for="(data, idx) in panelData" :key="idx">
          <td class="w-1/6">{{$t(data.label)}}</td>
          <td v-clipboard="' '" @success="info($t('TIPS_COPY_SUCCESS'))">
            <span :class="data.link?`text-secondary cursor-pointer`:''" @click="data.link?$router.push(data.link+data.value):null">
                    <ICountUp v-if="data.type==='number'" :startVal="data.value" :endVal="data.value" :duration="0" />
                    <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp}}</span>
            <span v-else> {{data.value}} </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <q-inner-loading>
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </transition>
  </div>
</template>

<script>
import { QInnerLoading, QSpinnerGears } from 'quasar'
import ICountUp from 'vue-countup-v2'
import { toast } from '../utils/util'

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
      isDisable: false
    }
  },
  methods: {
    info(msg) {
      if (this.isDisable === true) {
        return
      }
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 3000)
      toast(msg)
    }
  },
  computed: {
    // panelData() {
    //   return [
    //     {
    //       label: 'NAME',
    //       value: 1234,
    //       link: '/blocks_height/',
    //       type: 'number'
    //     },
    //     {
    //       label: 'NAME',
    //       value: 1234,
    //       type: 'number'
    //     },
    //     {
    //       label: 'NAME',
    //       value: 1234
    //     },
    //     {
    //       label: 'NAME',
    //       value: 1234
    //     },
    //     {
    //       label: 'NAME',
    //       value: 1234
    //     }
    //   ]
    // }
  }
}
</script>

<style lang="stylus" scoped>
</style>