<template>
  <q-page padding class="flex items-center">
    <div class="block w-full mb-32">
      <div class="flex justify-center mb-10">
        <!-- LOGO -->
        <div class="w-64">
          <img class="w-full"  :src="aschLogo" alt="">
        </div>
      </div>
      <div class="flex mb-4 justify-center">
        <q-input class="shadow appearance-none border rounded xs:w-4/5 sm:w-1/2 h-12 border-solid border-1 border-black pt-2 pb-2 px-3 text-grey-darker leading-tight"
        v-model="searchStr" @keyup.enter="search" :after="searchIcon"
        type="text" :placeholder="$t('HOME_PLACEHOLDER')" hide-underline	/>
      </div>
      <div class="flex items-center justify-center mt-8">
          <span class="text-13 text-black-dark">{{$t('LANGUAGE_CONTEXT')}}</span>
          <button class="border-none bg-transparent text-blue-dark hover:text-blue text-13 cursor-pointer ml-8 mr-8" @click="changeLang('zh')">{{$t('LANGUAGE_ZH')}}</button>
          <button class="border-none bg-transparent text-blue-dark hover:text-blue text-13 cursor-pointer" @click="changeLang('en')">{{$t('LANGUAGE_EN')}}</button>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QInput } from 'quasar'
import { mapActions } from 'vuex'
import aschLogo from '../assets/asch_logo.png'

export default {
  name: 'Home',
  components: {
    QPage,
    QInput
    // aschLogo
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
    changeLang(lan) {
      this.$i18n.locale = lan
      this.$store.commit('SET_LANG', this.$i18n.locale)
      if (window.localStorage) {
        window.localStorage.setItem('lang', this.$i18n.locale)
      }
    }
  },
  computed: {
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
