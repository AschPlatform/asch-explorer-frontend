<template>
  <q-page class="flex justify-center min-h-0 home-container">
    <state-banner class="mt-20" :stateData="getRunState" />
    <div class="flex xs:w-full sm:w-4/5 my-60 xs:px-15 sm:px-0 max-w-1200">
      <panel-container class="xs:w-full sm:w-1/2 xs:pr-0 sm:pr-20" type="blocks" />
      <panel-container class="xs:w-full sm:w-1/2 xs:pr-0 sm:pl-20" type="trans" />
    </div>
  </q-page>
</template>

<script>
import { QPage, QInput } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import aschLogo from '../assets/asch_logo.png'
import StateBanner from '../components/StateBanner.vue'
import Breadcrumb from '../components/Breadcrumb'
import PanelContainer from '../components/PanelContainer'
import { setCache } from '../utils/util'

export default {
  name: 'Home',
  components: {
    QPage,
    QInput,
    StateBanner,
    Breadcrumb,
    PanelContainer
  },
  data() {
    return {
      searchStr: '',
      aschLogo
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['getMoreAssets', 'getAsset']),
    search() {
      this.$root.$emit('doSearch', this.searchStr)
    },
    // switch the language
    changeLang(lan) {
      this.$i18n.locale = lan
      this.$store.commit('SET_LANG', this.$i18n.locale)
      if (window.localStorage) {
        setCache('lang', this.$i18n.locale)
      }
    }
  },
  computed: {
    ...mapGetters(['getRunState']),
    searchIcon() {
      return [
        {
          icon: 'search',
          // required function to call when
          // icon is clicked/tapped
          handler: () => this.$root.$emit('doSearch', this.searchStr),
          // Optional. Show icon button
          // if model has a value
          content: true
        }
      ]
    }
  }
}
</script>


<style lang="stylus" scoped>
.home-container {
  min-height: 0 !important;
}
</style>