<template>
  <q-toolbar class="flex xs:flex-col sm:flex-row justify-between w-full bg-tw-black xs:h-auto sm:h-86 xs:px-0 xs:pb-11 sm:pb-0 sm:px-30">
    <div class="flex justify-between items-center">
      <div class="xs:w-full sm:w-auto asch-logo h-30 xs:my-10 sm:my-0 sm:mr-20 lg:mr-53 cursor-pointer" @click="jump('/')">
        <img class="h-full" :src="aschLogo" alt="">
      </div>
  
      <div class="xs:hidden sm:flex">
        <q-btn class="text-20 text-tw-white hover:text-tw-blue px-11 md:mr-20" :label="$t('HOME')" flat @click="jump('/')" />
        <q-btn class="text-20 text-tw-white hover:text-tw-blue px-11 md:mr-20" flat :label="$t('DELEGATES')" @click="jump('/delegates')" />
        <q-btn class="text-20 text-tw-white hover:text-tw-blue px-11" flat :label="$t('ASSETS')" @click="jump('/assets')" />
      </div>
    </div>
  
    <div class="xs:w-full sm:w-auto flex xs:content-start sm:justify-between xs:border-t-1 xs:border-b-0 xs:border-l-0 xs:border-r-0 sm:border-none  border-solid border-tw-black-dark xs:pt-10 xs:pr-15 sm:pr-0">
      <q-btn class="xs:flex sm:hidden w-1/6" icon="menu" @click="toggle" />
      <!-- <q-toolbar-title>
      </q-toolbar-title> -->
      <div class="flex items-center w-5/6">
        <q-input class="xs:w-290 shadow appearance-none xs:h-25 sm:h-30 border-solid border hover:border-tw-blue px-11 rounded-15 text-tw-white leading-tight custorm-search-icon" :class="stretch?'sm:w-720 border-tw-blue':'sm:w-290 border-tw-grey-light'" v-model="searchStr" @keyup.enter="search"
          :after="searchIcon" type="text" :placeholder="getPlaceholder" hide-underline @focus="stretch=true" @blur="stretch=false" />
        <q-select class="xs:hidden sm:flex h-30 ml-30 border border-solid border-tw-grey-light pl-6 custorm-select rounded-15" v-model="lang" :options="getLangOpts" hide-underline />
      </div>
    </div>
  
  
  </q-toolbar>
</template>

<script>
  import {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QInput,
    QSelect
  } from 'quasar'
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
        return [{
          icon: 'search',
          // required function to call when
          // icon is clicked/tapped
          handler: () => this.search(),
          // Optional. Show icon button
          // if model has a value
          content: true
        }]
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
          return {
            label: lang,
            value: lang
          }
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