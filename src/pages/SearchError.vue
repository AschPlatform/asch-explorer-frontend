<template>
  <q-page class="flex justify-center items-center xs:p-15 sm:p-0 xs:py-15 sm:py-40">
     <div class="flex justify-center items-center w-full max-w-1200 m-auto border-1 border-solid border-tw-grey-darker xs:p-15 xs:pt-0 xs:pb-60 sm:pb-150"> 
       <img class="w-full" :src="errorBg" alt="error bg">
       <div class="xs:w-full sm:w-2/3 xs:mt-10 sm:mt-0">
         <p class="xs:text-18 sm:text-48 text-tw-grey-lighter text-center">{{$t('SEARCH_OEEOR')}}</p>
         <p class="w-full xs:text-12 sm:text-22 text-tw-grey-lighter text-center border-1 border-solid border-tw-grey-darker xs:py-10 sm:py-15 bg-tw-grayish-light whitespace-normal break-words xs:px-10 sm:px-20">{{this.$route.query.errorStr}}</p>
         <p class="xs:text-12 sm:text-14 text-tw-grey-lighter text-center">{{$t('SEARCH_OEEOR_STATEMENT')}}</p>
       </div>
     </div>
  </q-page>
</template>

<script>
import { QPage } from 'quasar'
import errorBg from '../assets/error_bg.png'

export default {
  name: 'SearchError',
  components: {
    QPage
  },
  data() {
    return { errorBg }
  },
  methods: {},
  computed: {}
}
</script>
