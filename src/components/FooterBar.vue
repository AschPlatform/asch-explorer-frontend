<template>
  <div class="flex flex-row xs:flex-col sm:flex-row flex-wrap justify-between text-center h-86 xs:h-48 sm:h-86 bg-black-darker w-full max-w-1200 m-auto">
    <div class="flex justify-left ">
      <div class="text-16 text-white flex items-center justify-center xs:mb-2 sm:mb-0">{{$t('FOOTER_LINKS')}}</div>
      <div class="flex justify-center items-center" v-for="(link,idx) in links" :key="idx">
        <a class="text-16 text-grey hover:text-blue-light no-underline ml-30" :href="link.href" target="_blank">{{link.label}}</a>
      </div>
    </div>
    <div class="w-163 flex justify-center items-center cursor-pointer" @click="toHome">
      <img class="w-full" :src="aschLogo" alt="">
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import aschLogo from '../assets/asch_logo2.png'

export default {
  name: 'FooterBar',
  components: {
    QIcon
  },
  data() {
    return {
      aschLogo
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    }
  },
  computed: {
    links() {
      const t = this.$t
      return [
        {
          label: 'API',
          href: 'https://github.com/AschPlatform/asch/blob/master/docs/asch_http_interface.md'
        },
        {
          label: 'Github',
          href: 'https://github.com/AschPlatform/asch'
        },
        {
          label: t('HOMEPAGE'),
          href: 'https://www.asch.io'
        },
        {
          label: t('FORUM'),
          href: 'https://bbs.asch.io'
        },
        {
          label: t('ONLINE_WALLET'),
          href: 'https://wallet.asch.io/#/login'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
a:hover {
  color: #3A9FFE !important;
}
</style>