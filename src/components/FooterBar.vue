<template>
  <div class="flex flex-row xs:flex-col sm:flex-row bg-black  flex-wrap justify-center text-center h-16 xs:h-48 sm:h-16 text-light-ash">
    <div class="text-16 flex items-center justify-center xs:mb-2 sm:mb-0">{{$t('FOOTER_LINKS')}}</div>
    <div class="flex justify-center items-center sm:w-1/3 md:w-1/5 lg:w-1/6" v-for="(link,idx) in links" :key="idx">
     <a class="text-14 text-light-ash no-underline xs:mr-2 mb-0 xs:mb-2 sm:mb-0" :href="link.href" target="_blank">{{link.label}}</a>
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'

export default {
  name: 'FooterBar',
  components: {
    QIcon
  },
  data() {
    return {}
  },
  computed: {
    links() {
      const t = this.$t
      return [
        { label: 'API', href: 'https://github.com/AschPlatform/asch/blob/master/docs/asch_http_interface.md' },
        { label: 'Github', href: 'https://github.com/AschPlatform/asch' },
        { label: t('HOMEPAGE'), href: 'https://www.asch.io' },
        { label: t('FORUM'), href: 'https://bbs.asch.io' },
        { label: t('ONLINE_WALLET'), href: 'https://wallet.asch.io/#/login' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>