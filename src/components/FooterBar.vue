<template>
  <div class="flex flex-row xs:flex-col sm:flex-row flex-wrap justify-between text-center sm:h-86 bg-black-darker w-full max-w-1200 m-auto">
    <div class="flex xs:flex-col sm:flex-row xs:justify-center sm:justify-left ">
      <div class="text-16 text-white flex items-center justify-center xs:mt-2 sm:mb-0">{{$t('FOOTER_LINKS')}}</div>
      <div class="flex justify-center items-center xs:mt-10" v-for="(link,idx) in links" :key="idx">
        <a class="text-16 text-ash-darker hover:text-blue-light no-underline xs:ml-0 sm:ml-30" :href="link.href" target="_blank">{{link.label}}</a>
      </div>
    </div>
    <div class="xs:w-full sm:w-163 flex justify-center items-center cursor-pointer xs:py-10 sm:py-0" @click="toHome">
      <img class="xs:1/2 sm:w-full" :src="aschLogo" alt="">
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
          href:
            this.$store.state.locale === 'zh'
              ? 'https://github.com/AschPlatform/asch-docs/blob/master/http_api/zh-cn.md'
              : 'https://github.com/AschPlatform/asch-docs/blob/master/http_api/en.md'
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
  // color: #3A9FFE !important;
}
</style>