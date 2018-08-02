<template>
  <div class="flex flex-wrap justify-center text-center h-16 text-light-ash">
    <div class="text-16 flex items-center">{{$t('FOOTER_LINKS')}}</div>
    <div class="flex justify-center items-center sm:w-1/3 md:w-1/5 lg:w-1/6" v-for="(link,idx) in links" :key="idx">
     <a class="text-14 text-light-ash no-underline xs:mr-2" :href="link.href" target="_blank">{{link.label}}</a>
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
        { label: 'API', href: '' },
        { label: 'Github', href: '' },
        { label: t('HOMEPAGE'), href: '' },
        { label: t('FORUM'), href: '' },
        { label: t('ONLINE_WALLET'), href: '' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>