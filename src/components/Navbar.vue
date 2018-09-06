<template>
  <q-toolbar class="flex xs:flex-col sm:flex-row justify-between w-full bg-tw-black xs:h-auto sm:h-86 xs:px-0 xs:pb-11 sm:pb-0 sm:px-10 md:px-20 xl:px-25 xll:px-30">
    <div class="flex justify-between items-center flex-no-wrap sm:w-auto">
      <div class="xs:w-full sm:w-auto asch-logo xs:h-20 sm:h-20 md:h-26 xl:h-28 xll:h-30 xs:my-10 sm:my-0 sm:mr-20 lg:mr-30 cursor-pointer" @click="jump('/')">
        <img class="h-full" :src="logoTop" alt="">
      </div>
  
      <div class="xs:hidden sm:flex w-auto">
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0 sm:mr-10 md:mr-15 xl:mr-30 xll:mr-53 bg-tw-transparent border-0 cursor-pointer" flat @click="jump('/')">
        {{$t('HOME')}}
        </button>
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0 sm:mr-10 md:mr-15 xl:mr-30 xll:mr-53  bg-tw-transparent border-0 cursor-pointer"  @click="jump('/delegates')" >
        {{$t('DELEGATES')}}
        </button>
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0  bg-tw-transparent border-0 cursor-pointer" @click="jump('/assets')" >
        {{$t('ASSETS')}}
        </button>
      </div>
    </div>
  
    <div class="xs:w-full sm:w-2/3 flex justify-between xs:border-t-1 xs:border-b-0 xs:border-l-0 xs:border-r-0 sm:border-none  border-solid border-tw-black-dark xs:pt-10 sm:pt-0 xs:pr-15 sm:pr-0">
      <q-btn class="xs:w-1/6 sm:hidden w-auto" icon="menu" @click="toggle" />
      <!-- <q-toolbar-title>
      </q-toolbar-title> -->
      <div class="flex items-center xs:justify-start sm:justify-end sm:w-full" :class="stretch?'xs:w-5/6':'w-2/3'">
        <q-input class="xs:w-full trans shadow appearance-none xs:h-25 sm:h-30 border-solid border sm:hover:border-tw-blue px-11 rounded-15 text-tw-white leading-tight custorm-search-icon" :class="stretch?'sm:w-2/3 border-tw-blue trans':'sm:w-1/3 border-tw-grey-light trans'" v-model="searchStr" @keyup.enter="search"
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
  import logoTop from '../assets/logo_top.png'
  
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
        logoTop,
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
      toggle() {
        this.$root.$emit('showDrawer', true)
      }
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
.trans {
  transition: all ease .1s;
}
</style>