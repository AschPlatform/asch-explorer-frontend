<template>
  <div class="flex flex-wrap justify-between xs:justify-center sm:justify-between items-center bg-black-darker w-full h-74 xs:h-32 sm:h-74 max-w-1200 m-auto">
    <div class="asch-logo h-8 mr-8 cursor-pointer" @click="toHome">
      <img class="h-full" :src="aschLogo" alt="">
    </div>
    <div class="flex justify-end">
      <div class="search-container w-340 h-36 xs:w-5/6 sm:w-340">
        <q-input class="flex items-center shadow appearance-none border rounded-30 w-full h-full border-solid border border-white h-full pl-26 pr-21 text-white leading-tight custorm-search-input" v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text"
          :placeholder="$t('HOME_PLACEHOLDER')" hide-underline />
      </div>
      <div class="desktop-only xs:hidden sm:flex justify-center items-center h-full ml-50">
        <div>
          <q-icon class="text-33 text-blue-light w-30 h-30" name="insert_chart_outlined" />
        </div>
        <div class="ml-19">
          <div class="text-blue-light text-18">
            {{$t('BLOCK_HEIGHT')}}
            <ICountUp class="ml-16" :endVal="blockHeightCount||0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QInput, QIcon } from 'quasar'
import aschLogo from '../assets/asch_logo1.png'
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
          handler: () => this.$root.$emit('doSearch', this.searchStr),
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