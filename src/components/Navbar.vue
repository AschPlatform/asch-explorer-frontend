<template>
  <q-toolbar color="primary">
    <div class="asch-logo h-8 mr-8 cursor-pointer" @click="toHome">
      <img class="h-full" :src="aschLogo" alt="">
    </div>
    <!-- <q-toolbar-title>
          Title
        </q-toolbar-title> -->
    <div>
      <q-btn :label="$t('HOME')" @click="jump('/')" />
      <q-btn :label="$t('DELEGATES')" @click="jump('/deletages')" />
      <q-btn :label="$t('ASSETS')" @click="jump('/assets')" />
    </div>
  
    <q-toolbar-title>
    </q-toolbar-title>
    <!--
          In a Toolbar, buttons are best
          configured as "flat, round, dense" and with an icon,
          but any button will do
        -->
    <div class="flex">
      <q-search class="shadow appearance-none border rounded w-full h-full border-solid border border-black pt-2 pb-2 px-3 text-grey-darker leading-tight"
       v-model="searchStr" @keyup.enter="search" :after="searchIcon" type="text" :placeholder="getPlaceholder" no-icon hide-underline	
      />
      <q-select  />
    </div>
  
  </q-toolbar>
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn, QSearch, QSelect } from 'quasar'
import aschLogo from '../assets/asch_logo.png'

export default {
  name: 'Navbar',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QSearch,
    QSelect
  },
  data() {
    return {
      aschLogo
    }
  },
  methods: {
    jump(path = '/') {
      this.$router.push(path)
    },
    search() {
      this.$root.$emit('doSearch', this.searchStr)
      this.searchStr = ''
    }
  },
  computed: {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>