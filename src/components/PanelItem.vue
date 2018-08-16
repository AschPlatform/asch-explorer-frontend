<template>
  <div class="rounded overflow-hidden hv:shadow-lg">
    <div v-if="type=='blocks'">
      <div v-if="data" class="flex">
        <div class="w-4/5">
          <div>
            <span>{{$t('BLOCK_HEIGHT')}}</span>
            <span>{{data.height | numSeparator}}</span>
          </div>
          <div>
            <span>{{$t('PRODUCER')}}</span>
            <span>{{getAddress(data.delegate)}}</span>
          </div>
          <div>
            <span>{{$t('FORGE_REWARD')}}</span>
            <span>{{data.height | getRewardByHeight}}</span>
          </div>
        </div>
        <div class="w-1/5">

        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="data">
        <div class="w-4/5">
          <div>
            <span>{{$t('TRANSACTION_ID')}}</span>
            <span>{{data.id}}</span>
          </div>
          <div>
            <span>{{$t('FROM')}}</span>
            <span>{{data.senderId}}</span>
            <span>{{$t('TO')}}</span>
            <span>{{getRecievr(data)}}</span>
          </div>
          <div>
            <span>{{$t('AMOUNT')}}</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { QIcon } from 'quasar'
import { getAddress } from '../utils/util'
export default {
  name: 'PanelItem',
  props: ['type', 'data'],
  // components: { QIcon },
  data() {
    return {}
  },
  methods: {
    getAddress,
    getRecievr(trans) { // get rec address
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>