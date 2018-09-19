<template>
  <q-toolbar class="flex xs:flex-col overflow-visible sm:flex-row justify-between w-full bg-tw-black xs:h-auto sm:h-86 xs:px-0 xs:pb-11 sm:pb-0 sm:px-10 md:px-20 xl:px-25 xll:px-30">
    <div class="flex justify-between items-center flex-no-wrap sm:w-auto">
      <div v-if="setLogo()" class="flex justify-center xs:w-100 xs:h-25 sm:w-144 sm:h-30 cursor-pointer xs:mr-0 sm:mr-20 lg:mr-30 xs:my-15 sm:my-0" @click="jump('/')">
        <q-icon class="text-140 text-tw-white" name="icon-logo" />
      </div>
      <div v-else class="flex justify-center xs:w-100 xs:h-25 sm:w-144 sm:h-30 cursor-pointer xs:mr-0 sm:mr-20 lg:mr-30 xs:my-15 sm:my-0" @click="jump('/')">
        <img class="xs:1/2 sm:w-full" :src="logoTop" alt="">
      </div>
      <div class="xs:hidden sm:flex w-auto">
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0 sm:mr-10 md:mr-15 xl:mr-30 xll:mr-53 bg-tw-transparent border-0 cursor-pointer" flat @click="jump('/')">
          {{$t('HOME')}}
          </button>
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0 sm:mr-10 md:mr-15 xl:mr-30 xll:mr-53  bg-tw-transparent border-0 cursor-pointer" @click="jump('/delegates')">
          {{$t('DELEGATES')}}
          </button>
        <button class="sm:text-14 md:text-16 xl:text-18 xll:text-20 text-tw-white hover:text-tw-blue px-0  bg-tw-transparent border-0 cursor-pointer" @click="jump('/assets')">
          {{$t('ASSETS')}}
          </button>
      </div>
    </div>
  
    <div class="xs:w-full sm:w-2/3 flex justify-between xs:border-t-1 xs:border-b-0 xs:border-l-0 xs:border-r-0 sm:border-none  border-solid border-tw-black-dark xs:pt-10 sm:pt-0 xs:pr-15 sm:pr-0">
      <button class="bg-tw-transparent border-0 p-0 ml-15" @click="toggle">
          <q-icon class="text-16 text-tw-white sm:hidden" name="icon-more" />
        </button>
      <div class="flex items-center xs:justify-start sm:justify-end sm:w-full" :class="(stretch?'xs:w-5/6':'w-2/3') +' '+ inputClass">
        <q-input ref="search" class="xs:w-full relative trans shadow appearance-none xs:h-25 sm:h-30 border-solid border sm:hover:border-tw-blue px-11 rounded-15 text-tw-white leading-tight " :class="stretch?'sm:w-2/3 border-tw-blue trans':'sm:w-1/3 border-tw-grey-light trans'"
          v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text" :placeholder="getPlaceholder" hide-underline @focus="searchExpand()" @blur="searchSeize()" @clear="resetSearch()">
          <q-list class="absolute pin-t xs:w-full border border-solid border-tw-grey-light bg-black text-tw-white rounded-3 top-30" :class="searchList.length > 0 && stretch ? 'visible' : 'invisible'">
            <!-- <q-item class="hover:text-tw-blue hover:bg-tw-grey cursor-pointer" v-for="(item, index) in this.searchList" :key="index" @click="searchSelect(item)">
                <q-item-main :label="item.title"/>
                <q-item-side right>{{item.label}}</q-item-side>
              </q-item> -->
            <div class="q-item q-item-division relative-position hover:text-tw-blue hover:bg-tw-grey cursor-pointer" v-for="(item, index) in this.searchList" :key="index" @click="searchSelect(item)">
              <div class="q-item-main q-item-section">
                <div class="q-item-label" style="overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical;">
                  {{item.title}}
                </div>
              </div>
              <div class="q-item-side q-item-section q-item-side-right">
                {{item.label}}
              </div>
            </div>
          </q-list>
        </q-input>
        <q-select class="xs:hidden sm:flex h-30 ml-30 border border-solid border-tw-grey-light pl-6 custom-select rounded-15" v-model="lang" :options="getLangOpts" hide-underline />
      </div>
    </div>
  
  </q-toolbar>
</template>

<script>
/* eslint-disable */
import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QInput,
  QSelect,
  QIcon,
  QList,
  QItem,
  QItemMain,
  QItemSide
} from 'quasar'
import { isDesktop, setCache, getCache } from '../utils/util'
import { REGEX } from '../utils/constants'
import logoTop from '../assets/logo_top.png'

export default {
  name: 'Navbar',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QInput,
    QSelect,
    QIcon,
    QList,
    QItem,
    QItemMain,
    QItemSide
  },
  data() {
    return {
      logoTop,
      searchStr: '',
      stretch: false,
      lang: '',
      isFirefox: true
    }
  },
  mounted() {
    this.getLang()
  },
  methods: {
    setLogo() {
      return navigator.userAgent.indexOf('Firefox') != -1 ? !this.isFirefox : this.isFirefox
      // if (navigator.userAgent.indexOf('Firefox') != -1) {
      //   return isFirefox
      // } else {
      //   return isFirefox
      // }
    },
    getLang() {
      if (window.localStorage && getCache('lang')) {
        let lang = getCache('lang')
        this.lang = lang
        this.$store.commit('SET_LANG', lang)
      } else {
        var defaultLanguage = navigator.language || navigator.userLanguage
        if (defaultLanguage.toUpperCase().indexOf('ZH') != -1) {
          this.lang = 'zh'
          this.$store.commit('SET_LANG', 'zh')
        } else {
          this.lang = 'en'
          this.$store.commit('SET_LANG', 'en')
        }
      }
    },
    jump(path = '/') {
      this.$router.push(path)
    },
    search() {
      if (this.searchList.length > 0) {
        this.searchSelect(this.searchList[0])
        return
      }
      this.$root.$emit('doSearch', this.searchStr)
      this.searchStr = ''
      document.activeElement.blur()
    },
    toggle() {
      this.$root.$emit('showDrawer', true)
    },
    searchExpand() {
      this.stretch = true
    },
    searchSeize() {
      this.stretch = false
    },
    resetSearch() {
      this.searchList = []
    },
    searchSelect(item) {
      this.searchStr = ''
      let { title, type } = item
      this.$root.$emit('doSearch', title, type)
      this._.delay(() => document.activeElement.blur(), 500)
      // this.$refs['search'].blur()
    }
    // isFirefox(){
    //   return
    // }
  },
  computed: {
    searchList() {
      let arr = []
      const { hash, height, nickname } = REGEX
      if (hash.test(this.searchStr)) {
        arr.push(
          {
            title: this.searchStr,
            label: this.$t('BLOCK_ID'),
            type: 'id'
          },
          {
            title: this.searchStr,
            label: this.$t('TRANSACTION_ID'),
            type: 'transaction'
          }
        )
      }
      if (height.test(this.searchStr)) {
        arr.push({
          title: this.searchStr,
          label: this.$t('BLOCK_HEIGHT'),
          type: 'block'
        })
      }
      if (nickname.test(this.searchStr)) {
        arr.push({
          title: this.searchStr,
          label: this.$t('NICKNAME'),
          type: 'nick'
        })
      }
      return arr
    },
    inputClass() {
      return isDesktop() ? 'custom-search-icon-desktop' : 'custom-search-icon-mobile'
    },
    searchIcon() {
      const deleteIcon = {
        icon: 'close',
        // required function to call when
        // icon is clicked/tapped
        handler: () => (this.searchStr = ''),
        // Optional. Show icon button
        // if model has a value
        content: true
      }
      const searchIcon = {
        icon: 'search',
        // required function to call when
        // icon is clicked/tapped
        handler: () => this.search(),
        // Optional. Show icon button
        // if model has a value
        content: true
      }
      return this.searchStr ? [deleteIcon, searchIcon] : [searchIcon]
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
      if (window.localStorage) {
        setCache('lang', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.trans {
  transition: all ease 0.1s;
}

.top-30 {
  top: 30px;
}
</style>