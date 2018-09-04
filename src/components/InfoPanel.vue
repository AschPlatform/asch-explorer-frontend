<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="flex relative-position">
      <table class="q-table horizontal-separator highlight loose accountinfo-table margin-t-20 table-tr-td-p-0">
        <tbody :class='tableTbodyMobile'>
          <tr v-show="data.value != null" v-for="(data, idx) in panelData" :key="idx">
            <td v-if="data.label" class="w-auto pl-0">{{$t(data.label)}} :</td>
            <td v-else class="w-auto pl-15">{{$t(data.label)}}</td>
            <td class="xs:w-5/6 sm:w-auto">
              <span :class="data.link?`text-tw-blue cursor-pointer hover:underline`:''" @click="data.link?$router.push(data.link+data.value):null">
                              <span v-if="data.type==='number'" >{{data.value | numSeparator}}</span>
              <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp}}</span>
              <span v-else-if="data.type==='address'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value)">
                <span v-if="data.nickname">
                  {{data.nickname}}({{data.value}})
                </span>
                <span v-else>
                  {{data.value}}
                </span>
              </span>
              <span v-else-if="data.type==='id'">{{data.value}}</span>
              <span v-else-if="data.type==='preBlock'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value, 'id')">{{data.value}}</span>
              <span v-else-if="data.type==='argStr'" class="text-tw-grey-darkest">{{data.value}}</span>
              <span v-else-if="data.type==='block'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value)">{{data.value}}</span>
              <span v-else-if="data.type==='qr'" class="text-tw-grey-darkest" @click="doSearch(data.value)">
                {{data.value}}
                <span class="qr-right-container" @click="showAddrQr(data.value)">
                 <q-icon class="text-18 text-tw-blue mr-10" name="icon-qr" />
                  <!-- <vue-qr class="add-qr-container text-tw-blue" :colorDark="qrDark" :colorLight="qrLight" autoColor :size="16" :text="data.value"></vue-qr> -->
                </span>
              </span>
              <span v-else>{{data.value}} </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <q-inner-loading :visible="loadingBool">
        <q-spinner-gears size="50px" color="tw-blue" />
      </q-inner-loading>
    </div>
  </transition>
</template>

<script>
import { QInnerLoading, QSpinnerGears, QIcon } from 'quasar'
import ICountUp from 'vue-countup-v2'
import { toast, isDesktop } from '../utils/util'
import { mapActions, mapGetters } from 'vuex'
import VueQr from 'vue-qr'

export default {
  name: 'InfoPanel',
  props: ['panelData'],
  components: {
    ICountUp,
    QInnerLoading,
    QSpinnerGears,
    VueQr,
    QIcon
  },
  data() {
    return {
      qrDark: '#2D98FC',
      qrLight: '#FFFFFF',
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
    },
    showAddrQr(str) {
      this.$root.$emit('showQRCodeModal', str)
    }
  },
  computed: {
    ...mapGetters(['loadingBool']),
    tableTbodyMobile() {
      return isDesktop() ? 'info-tbody table-desktop' : 'info-tbody table-mobile'
    }
  },
  watch: {
    panelData() {
      this.showLoading()
    }
  }
}
</script>

<style lang="stylus" scoped>
.qr-right-container {
  cursor: pointer;
}

.add-qr-container {
  display: inline-block;
  vertical-align: middle !important;
}
</style>