<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <state-banner :stateData="stateData" />
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
import { REGEX } from '../utils/constants'
import { toastError } from '../utils/util'

export default {
  name: 'MyLayout',
  components: {
    QLayout,
    QLayoutHeader,
    QPageContainer,
    QLayoutFooter,
    FooterBar,
    StateBanner
  },
  data() {
    return {
      searchForbidden: false
    }
  },
  methods: {
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
    }
  },
  created() {
    this.$root.$on('doSearch', this.doSearch)
  },
  beforeDestroy() {
    this.$root.$off('doSearch', this.doSearch)
  },
  computed: {
    stateData() {
      const t = this.$t
      return [
        {
          icon: 'insert_chart_outlined',
          value: 591936,
          label: t('BLOCK_HEIGHT')
        },
        {
          icon: 'bubble_chart',
          value: 591936,
          label: t('TOTAL_SUPPLY')
        },
        {
          icon: 'people_outline',
          value: 591936,
          label: t('USERS_NUMBER')
        },
        {
          icon: 'bar_chart',
          value: 591936,
          label: t('RUNNING_DAYS')
        }
      ]
    }
  }
}
</script>

<style>
</style>
