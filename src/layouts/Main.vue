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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
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
