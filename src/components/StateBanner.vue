<template>
  <div class="w-full flex flex-wrap border border-solid border-tw-grey-darker xs:border-b-0 sm:border-b-1 state-container">
    <div class="flex xs:w-1/2 md:w-1/6 xs:h-86 sm:h-130 justify-center items-center shadow-none hover:shadow-13 xs:border-0 sm:border border-solid border-tw-grey-darker  xs:border-r-1 xs:border-b-1 sm:border-l-0 sm:border-t-0 sm:border-b-0 bg-tw-grey-lightet state" v-for="(state,idx) in stateData" :key="idx">
      <div class="xs:mr-10 sm:mr-15">
        <q-icon class="xs:text-36 sm:text-48 text-tw-blue" :name="state.icon" />
      </div>
      <div>
        <div class="text-tw-grey-darkest xs:text-12 lg:text-14 xll:text-20 xs:mb-5 sm:mb-15">
          {{$t(state.label)}}
        </div>
        <div class="xs:text-16 lg:text-22 xll:text-28 text-tw-blue font-futura">
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