<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <state-banner v-show="isHome" class="desktop-only"  :stateData="getRunState" />
      <search-banner v-show="!isHome"/>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <footer-bar />
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL, QLayout, QLayoutHeader, QPageContainer, QLayoutFooter } from 'quasar'
import FooterBar from '../components/FooterBar'
import StateBanner from '../components/StateBanner.vue'
import SearchBanner from '../components/SearchBanner.vue'
import { REGEX } from '../utils/constants'
import { toastError } from '../utils/util'
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
    SearchBanner
  },
  data() {
    return {
      searchForbidden: false,
      isHomeFlg: true,
      intervalStats: null
    }
  },
  methods: {
    ...mapActions(['getHeight', 'getUsers', 'getXas']),
    openURL,
    doSearch(str) {
      if (this.searchForbidden) return
      const { hash, address, height } = REGEX
      const router = this.$router
      this.searchForbidden = true
      this._.delay(() => (this.searchForbidden = false), 2000)
      if (hash.test(str)) {
        router.push(`/transaction/${str}`)
        return
      }
      if (address.test(str)) {
        router.push(`/address/${str}`)
        return
      }
      if (height.test(str)) {
        router.push(`/blocks_height/${str}`)
        return
      }
      toastError(this.$t('ERR_INVALID_SEARCH'))
    },
    setLang() {
      if (window.localStorage && window.localStorage.getItem('lang')) {
        let lang = window.localStorage.getItem('lang')
        this.$i18n.locale = lang
        this.$store.commit('SET_LANG', lang)
      }
    }
  },
  mounted() {
    // init state
    this.getUsers()
    this.getXas()
    this.getHeight()
    this.setLang()

    // Intervel functions
    this.intervalStats = setInterval(() => this.getHeight(), 10000)
  },
  created() {
    this.$root.$on('doSearch', this.doSearch)
  },
  beforeDestroy() {
    clearInterval(this.intervalStats)
    this.$root.$off('doSearch', this.doSearch)
  },
  computed: {
    ...mapGetters(['getRunState']),
    isHome() {
      return this.$route.name === 'home' ? this.isHomeFlg : !this.isHomeFlg
    }
  }
}
</script>

<style>
</style>
