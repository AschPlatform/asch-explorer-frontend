<template>
  <div class="flex flex-row xs:flex-col sm:flex-row flex-wrap justify-between text-center xs:h-auto sm:h-86 bg-tw-black w-full max-w-1200 m-auto">
    <div class="flex xs:flex-col sm:flex-row xs:justify-center sm:justify-left ">
      <div class="flex items-center justify-center xs:text-16 sm:text-18 text-tw-white xs:mt-20 sm:mt-0 sm:mb-0" :data-aos="linkClass" data-aos-delay="0" data-aos-easing="ease-in-sine" data-aos-duration="800" data-aos-offset="0">
        <span>{{$t('FOOTER_LINKS')}}</span>
        <span>{{footerLink}}</span>   
      </div>
      <div class="flex justify-center items-center xs:mt-20 sm:mt-0" v-for="(link,idx) in links" :key="idx" :data-aos="linkClass" :data-aos-delay="idx*100" data-aos-easing="ease-in-sine" data-aos-duration="800" data-aos-offset="0">
        <a class="xs:text-14 sm:text-18 text-tw-white hover:text-tw-blue no-underline xs:ml-0 sm:ml-40" :href="link.href" target="_blank">{{link.label}}</a>
      </div>
    </div>
    <div class="xs:w-full sm:w-163 flex justify-center items-center cursor-pointer xs:py-20 sm:py-0" @click="toHome" :data-aos="linkClass" data-aos-delay="300" data-aos-easing="ease-in-sine" data-aos-duration="800" data-aos-offset="0">
      <img class="xs:1/2 sm:w-full" :src="logoFooter" alt="">
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import logoFooter from '../assets/logo_footer.png'
import { isDesktop } from '../utils/util'

export default {
  name: 'FooterBar',
  components: {
    QIcon
  },
  data() {
    return {
      logoFooter
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    }
  },
  computed: {
    footerLink() {
      return isDesktop() ? ':' : ''
    },
    linkClass() {
      return isDesktop() ? 'fade-right' : 'fade-up'
    },
    links() {
      const t = this.$t
      return [
        {
          label: 'API',
          href: this.isZH
            ? 'https://github.com/AschPlatform/asch-docs/blob/master/http_api/zh-cn.md'
            : 'https://github.com/AschPlatform/asch-docs/blob/master/http_api/en.md'
        },
        { label: t('HOMEPAGE'), href: 'https://www.asch.io' },
        { label: 'Github', href: 'https://github.com/AschPlatform/asch' },
        { label: t('ONLINE_WALLET'), href: 'https://wallet.asch.io/#/login' },
        { label: t('FORUM'), href: 'https://bbs.asch.io' }
      ]
    },
    isZH() {
      return this.$store.state.locale === 'zh'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>