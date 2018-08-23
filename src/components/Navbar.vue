<template>
  <q-toolbar class="bg-tw-black h-86 px-30 xs:px-15">
    <div class="xs:hidden sm:flex asch-logo h-30 mr-53 cursor-pointer" @click="jump('/')">
      <img class="h-full" :src="aschLogo" alt="">
    </div>
   <q-btn class="xs:flex sm:hidden" icon="menu" @click="toggle" /> 
    <div class="xs:hidden sm:flex">
      <q-btn class="text-16 text-tw-grey hover:text-tw-green px-11 mr-40" :label="$t('HOME')" flat @click="jump('/')" />
      <q-btn class="text-16 text-tw-grey hover:text-tw-green p-11 mr-40" flat :label="$t('DELEGATES')" @click="jump('/delegates')" />
      <q-btn class="text-16 text-tw-grey hover:text-tw-green p-11" flat :label="$t('ASSETS')" @click="jump('/assets')" />
    </div>
  
    <q-toolbar-title>
    </q-toolbar-title>
    <!--
          In a Toolbar, buttons are best
          configured as "flat, round, dense" and with an icon,
          but any button will do
        -->
    <div class="flex xs:w-5/6 sm:w-2/3 justify-end items-center">
      <q-input class="xs:w-full shadow appearance-none border h-30 border-solid border border-tw-grey-light px-11 rounded-15 text-tw-white leading-tight custorm-search-icon"
      :class="stretch?'sm:w-2/3 border-tw-green':'sm:w-2/5'"
       v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text" :placeholder="getPlaceholder" hide-underline	
       @focus="stretch=true" @blur="stretch=false"
      />
      <q-select class="xs:hidden sm:flex h-30 ml-30 border border-solid border-tw-grey-light pl-6 custorm-select rounded-15" v-model="lang" :options="getLangOpts" hide-underline />
    </div>
  
  </q-toolbar>
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn, QInput, QSelect } from 'quasar'
import aschLogo from '../assets/asch_logo1.png'

export default {
  name: 'Navbar',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QInput,
    QSelect
  },
  data() {
    return {
      aschLogo,
      searchStr: '',
      stretch: false,
      lang: ''
    }
  },
  mounted() {
    this.lang = this.$store.state.locale
  },
  methods: {
    jump(path = '/') {
      this.$router.push(path)
    },
    search() {
      this.$root.$emit('doSearch', this.searchStr)
      this.searchStr = ''
    },
    toggle() {}
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
    },
    getPlaceholder() {
      const t = this.$t
      return (
        t('BLOCK_HEIGHT') +
        '/' +
        t('TRANSACTION_ID') +
        '/' +
        t('ADDRESS') +
        '/' +
        t('BLOCK_ID') +
        '/' +
        t('NICKNAME')
      )
    },
    getLangOpts() {
      const langs = this.$store.state.locales
      return langs.map(lang => {
        return { label: lang, value: lang }
      })
    }
  },
  watch: {
    lang(val) {
      this.$i18n.locale = val
      this.$store.commit('SET_LANG', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>