<template>
  <div class="w-full flex flex-wrap border border-solid border-tw-black-dark xs:border-b-0 sm:border-b-1 state-container">
    <div class="flex xs:w-1/2 md:w-1/6 xs:h-86 sm:h-130 justify-center items-center xs:border-0 sm:border border-solid border-tw-black-dark  xs:border-r-1 xs:border-b-1 sm:border-l-0 sm:border-t-0 sm:border-b-0 state" v-for="(state,idx) in stateData" :key="idx">
      <div class="xs:mr-10">
        <q-icon class="xs:text-36 sm:text-48 text-tw-green" :name="state.icon" />
      </div>
      <div class="ml-2">
        <div class="text-tw-grey xs:text-12 sm:text-14">
          {{$t(state.label)}}
        </div>
        <div class="xs:text-16 sm:text-24 text-tw-green font-futura">
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
.state-container {
  border-left: none;
  border-right: none;

  .state:last-child {
    border-right: none;
  }
}

@media screen and (max-width: 678px) {
  .state-container {
    .state:last-child {
      border-right: 1px solid #373941;
    }
  }
}
</style>