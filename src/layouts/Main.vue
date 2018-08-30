<template>
  <q-layout view="lHh Lpr lff">
    <q-layout-header>
      <navbar  />
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer class="bg-tw-black">
      <footer-bar />
    </q-layout-footer>
    <code-modal :show="QRCodeShow" @close="QRCodeShow = false" :text="QRCodeText" />
  </q-layout>
</template>

<script>
import { openURL, QLayout, QLayoutHeader, QPageContainer, QLayoutFooter } from 'quasar'
import FooterBar from '../components/FooterBar'
import StateBanner from '../components/StateBanner'
import SearchBanner from '../components/SearchBanner'
import { REGEX } from '../utils/constants'
import Navbar from '../components/Navbar'
import CodeModal from '../components/QRCodeModal'

import { toastError, getCache } from '../utils/util'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  components: {
    QLayout,
    QLayoutHeader,
    QPageContainer,
    QLayoutFooter,
    FooterBar,
    StateBanner,
    SearchBanner,
    Navbar,
    CodeModal
  },
  data() {
    return {
      searchForbidden: false,
      isHomeFlg: true,
      intervalStats: null,
      QRCodeShow: false,
      QRCodeText: ''
    }
  },
  methods: {
    ...mapActions(['getHeight', 'getUsers', 'getXas', 'getAssets', 'getAssetNum', 'getXasPrice']),
    openURL,
    doSearch(str, type) {
      if (this.searchForbidden) return
      const { hash, address, height } = REGEX
      const router = this.$router
      this.searchForbidden = true
      this._.delay(() => (this.searchForbidden = false), 2000)
      // TODO: add public key reg
      if (type === 'delegate') {
        router.push(`/delegate/${str}`)
        return
      }
      if (type === 'id') {
        router.push(`/blocks_id/${str}`)
        return
      }
      if (type === 'asset') {
        str = str.replace('.', '-')
        router.push(`/asset/${str}`)
        return
      }
      if (hash.test(str) || type === 'trans') {
        router.push(`/transaction/${str}`)
        return
      }
      if (address.test(str) || type === 'account') {
        router.push(`/address/${str}`)
        return
      }
      if (height.test(str) || type === 'block') {
        if (Number(str) <= this.$store.state.runState.blockHeight) {
          router.push(`/blocks_height/${str}`)
          return
        }
      }
      toastError(this.$t('ERR_INVALID_SEARCH'))
    },
    // Set the language when you refresh
    setLang() {
      if (window.localStorage && getCache('lang')) {
        let lang = getCache('lang')
        this.$i18n.locale = lang
        this.$store.commit('SET_LANG', lang)
        // moment.locale(lang === 'zh' ? 'zh-cn' : 'en-us')
      }
    },
    showQRCodeModal(content) {
      this.QRCodeShow = true
      this.QRCodeText = content
    }
  },
  mounted() {
    // init state
    this.getUsers()
    this.getXasPrice()
    this.getAssetNum()
    this.getXas()
    this.getHeight()
    this.setLang()
    this.assetMap.size === 0 && this.getAssets()
    // Intervel functions
    this.intervalStats = setInterval(() => this.getHeight(), 10000)
  },
  created() {
    this.$root.$on('doSearch', this.doSearch)
    this.$root.$on('showQRCodeModal', this.showQRCodeModal)
  },
  beforeDestroy() {
    clearInterval(this.intervalStats)
    this.$root.$off('doSearch', this.doSearch)
    this.$root.$off('showQRCodeModal', this.showQRCodeModal)
  },
  computed: {
    ...mapGetters(['getRunState', 'assetMap']),
    isHome() {
      return this.$route.name === 'home' ? this.isHomeFlg : !this.isHomeFlg
    }
  }
}
</script>

<style>
</style>
