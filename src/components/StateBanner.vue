<template>
  <div class="flex-wrap bg-grey-lighter state-container w-full max-w-1200 m-auto">
    <div class="group flex xs:w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 justify-center items-center h-160 hover:bg-white xs:border-0 sm:border border-solid border-grey-darker sm:border-l-0 sm:border-t-0 sm:border-b-0 state" v-for="(state,idx) in stateData" :key="idx">
      <div class="text-5xl text-grey-lightest group-hover:text-blue-light state-icon">
        <q-icon class="" :name="state.icon" />
      </div>
      <div class="ml-2 state-content">
        <div class="text-grey-lightest text-18 group-hover:text-blue-light content-top">
          {{$t(state.label)}}
        </div>
        <div class="text-28 text-grey-lightest group-hover:text-blue-light content-bottom">
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
  .state:last-child {
    border: none;
  }

  .state:hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.08);

    .state-icon {
      color: #3A9FFE;
    }

    .state-content {
      .content-top {
        color: #3A9FFE;
      }

      .content-bottom {
        color: #3A9FFE;
      }
    }
  }
}
</style>