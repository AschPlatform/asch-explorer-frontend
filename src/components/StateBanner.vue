<template>
  <div class="flex flex-wrap">
    <div class="flex sm:w-1/2 md:w-1/4 lg:w-1/4" v-for="(state,idx) in stateData" :key="idx">
      <div>
        <q-icon class="text-4xl" :name="state.icon" />
      </div>
      <div class="">
        <div>
          {{state.label}}
        </div>
        <div>
          <ICountUp :endVal="state.value||0" />
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