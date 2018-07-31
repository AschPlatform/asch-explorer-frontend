<template>
  <div class="flex flex-wrap text-center">
    <div>{{$t('FOOTER_LINKS')}}</div>
    <div class="flex sm:w-1/2 md:w-1/4 lg:w-1/4" v-for="(link,idx) in links" :key="idx">
     <a :href="link.href" target="_blank">{{link.label}}</a>
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