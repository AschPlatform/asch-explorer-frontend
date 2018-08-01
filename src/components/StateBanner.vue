<template>
  <div class="flex flex-wrap">
    <div class="flex sm:w-1/2 md:w-1/4 lg:w-1/4 justify-center items-center h-16 border-r-grey-1" v-for="(state,idx) in stateData" :key="idx">
      <div>
        <q-icon class="text-5xl" :name="state.icon" />
      </div>
      <div class="ml-2">
        <div class="text-light-grey text-13">
          {{state.label}}
        </div>
        <div class="text-black text-14">
          {{state.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'

export default {
  name: 'StateBanner',
  props: ['stateData'],
  components: {
    QIcon
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
</style>