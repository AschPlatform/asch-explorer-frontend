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
    <q-layout-drawer v-model="drawer">
      <q-toolbar class="flex xs:flex-col sm:flex-row justify-between w-full bg-tw-black xs:h-auto sm:h-86 xs:px-0 xs:pb-11 sm:pb-0 sm:px-30">
        <div class="w-full flex justify-between items-center">
          <div class="xs:w-full sm:w-auto asch-logo h-30 xs:my-10 sm:my-0 sm:mr-20 lg:mr-53 cursor-pointer text-center">
            <img class="h-full" :src="aschLogo" alt="">
          </div>
          <div class="xs:w-full sm:w-auto flex xs:content-start sm:justify-between xs:border-t-1 xs:border-b-0 xs:border-l-0 xs:border-r-0 sm:border-none border-solid border-tw-black-dark xs:pt-10 xs:pr-15 sm:pr-0">
            <q-btn class="xs:flex sm:hidden w-1/6" icon="icon-delete" @click="switchDrawer(false)"/>
          </div>
        </div>
      </q-toolbar>
      <q-list class="py-0 mt-20" no-border link inset-delimiter>
        <div class="min-h-50 q-item q-item-division relative-position">
          <a class="w-full" :class="computedRoute('home')" @click="getRouterConf('/')">
            {{$t('HOME')}}
          </a>
        </div>
        <q-item-separator class="sep text-tw-grey" />
        <div class="min-h-50 q-item q-item-division relative-position">
          <a class="w-full" :class="computedRoute('delegates')" @click="getRouterConf('delegates')">
            {{$t('DELEGATES')}}
          </a>
        </div>
        <q-item-separator class="sep text-tw-grey" />
        <div class="min-h-50 q-item q-item-division relative-position">
          <a class="w-full" :class="computedRoute('assets')" @click="getRouterConf('assets')">
            {{$t('ASSETS')}}
          </a>
        </div>
        <q-item-separator class="sep text-tw-grey" />
        <div class="min-h-50 q-item q-item-division relative-position">
          <a class="w-full text-30" @click="changeLang('zh')">
            {{$t('LANGUAGE_ZH')}}
          </a>
        </div>
        <q-item-separator class="sep text-tw-grey" />
        <div class="min-h-50 q-item q-item-division relative-position">
          <a class="w-full text-30" @click="changeLang('en')">
            {{$t('LANGUAGE_EN')}}
          </a>
        </div>
      </q-list>
    </q-layout-drawer>
    <code-modal :show="QRCodeShow" @close="QRCodeShow = false" :text="QRCodeText"/>
  </q-layout>
</template>

<script>
/* eslint-disable */
import {
  openURL,
  QLayout,
  QLayoutHeader,
  QPageContainer,
  QLayoutFooter,
  QLayoutDrawer,
  QList,
  QItem,
  QItemMain,
  QListHeader,
  QToolbar,
  QBtn,
  QItemSeparator
} from 'quasar'
import FooterBar from '../components/FooterBar'
import StateBanner from '../components/StateBanner'
import SearchBanner from '../components/SearchBanner'
import { REGEX } from '../utils/constants'
import Navbar from '../components/Navbar'
import CodeModal from '../components/QRCodeModal'

import { getCache, setCache } from '../utils/util'
import { mapGetters, mapActions } from 'vuex'
import aschLogo from '../assets/asch_logo2.png'

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
    CodeModal,
    QLayoutDrawer,
    QList,
    QItem,
    QItemMain,
    QListHeader,
    QToolbar,
    QBtn,
    QItemSeparator
  },
  data() {
    return {
      aschLogo,
      searchForbidden: false,
      isHomeFlg: true,
      intervalStats: null,
      QRCodeShow: false,
      QRCodeText: '',
      drawer: false
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
      this.$router.push({ path: '/error', query: { errorStr: str } })
    },

    // switch the language
    changeLang(lan) {
      this.$i18n.locale = lan
      this.$store.commit('SET_LANG', this.$i18n.locale)
      if (window.localStorage) {
        setCache('lang', this.$i18n.locale)
      }
      this.switchDrawer()
    },

    // Set the language when you refresh
    setLang() {
      if (window.localStorage && getCache('lang')) {
        let lang = getCache('lang')
        this.$i18n.locale = lang
        this.$store.commit('SET_LANG', lang)
      }
    },
    showQRCodeModal(content) {
      this.QRCodeShow = true
      this.QRCodeText = content
    },
    switchDrawer(state) {
      this.drawer = state
    },
    getRouterConf(path = '/') {
      this.$router.push(path)
    },
    computedRoute(data) {
      let path = this.$route.name
      if (path && path === data) {
        return 'text-30 text-tw-blue'
      }
      return 'text-30'
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
    this.$root.$on('showDrawer', this.switchDrawer)
  },
  beforeDestroy() {
    clearInterval(this.intervalStats)
    this.$root.$off('doSearch', this.doSearch)
    this.$root.$off('showQRCodeModal', this.showQRCodeModal)
    this.$root.$off('showDrawer', this.switchDrawer)
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
.sep {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
