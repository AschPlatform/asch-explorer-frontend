<template>
  <div class="flex-wrap">
    <div class="flex xs:w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 justify-center items-center h-16 xs:border-0 sm:border border-solid border-grey-dark sm:border-l-0 sm:border-t-0 sm:border-b-0" v-for="(state,idx) in stateData" :key="idx">
      <div>
        <!-- <q-icon class="text-5xl" :name="state.icon" /> -->
        <i :class="'text-5xl ' + state.icon"></i>
      </div>
      <div class="ml-2">
        <div class="text-light-grey text-13">
          {{$t(state.label)}}
        </div>
        <div class="text-14 text-black-absolute">
          <ICountUp :endVal="Number(state.value)||0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import ICountUp from 'vue-countup-v2'

export default {
  name: 'StateBanner',
  props: ['stateData'],
  components: {
    QIcon,
    ICountUp
  },
  data() {
    return {}
  }
}
</script>
 
<style lang="stylus" scoped>
</style>