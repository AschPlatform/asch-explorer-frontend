<template>
  <q-page padding class="flex items-center">
    <div class="block w-full mb-32 xs:mb-0 sm:mb-32">
      <div class="flex justify-center xs:mb-20 sm:mb-60">
        <div class="xs:w-2/3 sm:max-w-388">
          <img class="w-full"  :src="aschLogo" alt="ASCH logo">
        </div>
      </div>
      <div class="flex mb-4 justify-center">
        <q-input class="flex justify-center items-center xs:pl-11 sm:pl-30 pr-38 shadow appearance-none border xs:w-5/6 sm:w-1/2 max-w-780 xs:h-36 sm:h-60 border-solid border-grey-darkest hover:border-blue-light  border-1 border-black rounded-30 text-grey-darker leading-tight" :class="custormSearchIcon" v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text" :placeholder="$t('HOME_PLACEHOLDER')" hide-underline	/>
      </div>
      <div class="flex items-center justify-center mt-26">
          <span class="text-18 text-grey-darkest">{{$t('LANGUAGE_CONTEXT')}}</span>
          <button class="border-none bg-transparent text-grey-darkest hover:text-blue-light hover:underline text-18 cursor-pointer mx-24" @click="changeLang('zh')">{{$t('LANGUAGE_ZH')}}</button>
          <button class="border-none bg-transparent text-grey-darkest hover:text-blue-light hover:underline  text-18 cursor-pointer" @click="changeLang('en')">{{$t('LANGUAGE_EN')}}</button>
      </div>
    </div>
    <state-banner class="flex xs:flex sm:hidden mb-8" :stateData="getRunState" />
  </q-page>
</template>

<script>
import { QPage, QInput } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import aschLogo from '../assets/asch_logo.png'
import StateBanner from '../components/StateBanner.vue'
import Breadcrumb from '../components/Breadcrumb'
import { setCache, isDesktop } from '../utils/util'

export default {
  name: 'Home',
  components: {
    QPage,
    QInput,
    StateBanner,
    Breadcrumb
  },
  data() {
    return {
      searchStr: '',
      aschLogo
    }
  },
  mounted() {
    // this.custormSearchIcon()
  },
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
    custormSearchIcon() {
      return this.isDesktop ? 'custorm-search-icon' : 'custorm-search-icon-mobile'
    },
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
@media screen and (max-width: 678px) {
  .custorm-search-icon i.q-icon {
    border-left: none !important;
  }
}
</style>
