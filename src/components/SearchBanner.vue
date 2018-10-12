<template>
  <div class="flex flex-wrap justify-between xs:justify-center sm:justify-between items-center bg-white w-full h-16 xs:h-32 sm:h-16 max-w-1200 m-auto">
    <div class="asch-logo h-8 mr-8 cursor-pointer" @click="toHome">
      <img class="h-full" :src="aschLogo" alt="">
    </div>
    <div class="search-container w-1/2 h-1/2 xs:w-5/6 sm:w-1/2">
      <q-input class="shadow appearance-none border rounded w-full h-full border-solid border border-black pt-2 pb-2 px-3 text-grey-darker leading-tight" v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text" :placeholder="$t('HOME_PLACEHOLDER')"
        hide-underline />
    </div>
    <div class="desktop-only xs:hidden sm:flex xs:w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 justify-end items-center h-16">
      <div>
        <q-icon class="text-5xl" name="insert_chart_outlined" />
      </div>
      <div class="ml-2">
        <div class="text-light-grey text-13">
          {{$t('BLOCK_HEIGHT')}}
        </div>
        <div class="text-14 text-black-absolute">
          <ICountUp :endVal="blockHeightCount||0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QInput, QIcon } from 'quasar'
import aschLogo from '../assets/asch_logo.png'
import ICountUp from 'vue-countup-v2'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchBanner',
  components: {
    QInput,
    QIcon,
    ICountUp
  },
  data() {
    return {
      searchStr: '',
      aschLogo
    }
  },
  methods: {
    search() {
      this.$root.$emit('doSearch', this.searchStr)
      debugger
      this.searchStr = ''
    },
    toHome() {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['blockHeight']),
    searchIcon() {
      return [
        {
          icon: 'search',
          // required function to call when
          // icon is clicked/tapped
          handler: () => this.search(),
          // Optional. Show icon button
          // if model has a value
          content: true
        }
      ]
    },
    blockHeightCount() {
      return this.blockHeight
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>