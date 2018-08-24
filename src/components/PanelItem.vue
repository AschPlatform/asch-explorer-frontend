<template>
  <div class="bg-tw-black mb-20 p-20 border-2 border-solid border-tw-black-lighter ">
    <div v-if="type=='blocks'">
      <div v-if="data" class="flex">
        <div class="w-4/5">
          <div class="flex items-center mb-20">
            <span :class="labelClass">{{$t('BLOCK_HEIGHT')}}</span>
            <span :class="linkClass"  @click="doSearch(data.height)" >{{data.height | numSeparator}}</span>
          </div>
          <div class="flex items-center mb-20">
            <span :class="labelClass">{{$t('PRODUCER')}}</span>
            <span :class="linkClass"  @click="doSearch(getAddress(data.delegate))" >{{getAddress(data.delegate)}}</span>
          </div>
          <div class="flex items-center">
            <span :class="labelClass">{{$t('FORGE_REWARD')}}</span>
            <span class="truncate text-tw-white w-3/4"  >{{data.reward | fee}}{{' XAS'}}</span>
          </div>
        </div>
        <div class="w-1/5 text-right text-24 text-tw-green">
          {{data.timestamp | secFromNow}}{{$t('SECOND_BEFORE')}}
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="data">
        <div class="w-full">
          <div class="flex items-center mb-20">
            <span class="w-1/5 text-tw-grey-lighter">{{$t('TRANSACTION_ID')}}</span>
            <span :class="linkClass" @click="doSearch(data.id)">{{data.id}}</span>
          </div>
          <div class="flex items-center mb-20">
            <span class="mr-20 text-tw-grey-lighter">{{$t('FROM')}}</span>
            <span :class="addressClass" @click="doSearch(data.senderId)" >{{data.senderId}}</span>
            <span class="mr-20  text-tw-grey-lighter">{{$t('TO')}}</span>
            <span :class="getProps(data,'recieve')?addressClass:''" @click="doSearch(getProps(data,'recieve'))" >{{getProps(data,'recieve') || '--'}}</span>
          </div>
          <div class="flex items-center">
            <span class="w-1/5 text-tw-grey-lighter">{{$t('AMOUNT')}}</span>
            <span class="text-tw-grey-lighter">{{getProps(data) || '--'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { QIcon } from 'quasar'
import { getAddress, convertFee } from '../utils/util'
import { mapGetters } from 'vuex'

export default {
  name: 'PanelItem',
  props: ['type', 'data'],
  // components: { QIcon },
  data() {
    return {}
  },
  methods: {
    getAddress,
    getProps(trans, props = 'amount') {
      // get rec address
      // const filterTransType = [1, 103]
      const { type, args } = trans
      const isAmount = props === 'amount'
      const len = args.length
      let value = ''
      if (type === 1) {
        value = isAmount ? args[len - 2] : args[len - 1]
        if (isAmount) value = convertFee(value) + ' XAS'
      } else if (type === 103) {
        value = isAmount ? args[len - 2] : args[len - 1]
        if (isAmount && this.assetMap.get(args[0])) {
          value = convertFee(value, this.assetMap.get(args[0]).precision) + ' ' + args[0]
        }
      }
      return value
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    }
  },
  computed: {
    ...mapGetters(['assetMap']),
    linkClass() {
      return 'truncate text-tw-white hover:text-tw-green w-3/4 cursor-pointer'
    },
    addressClass() {
      return 'truncate text-tw-white hover:text-tw-green cursor-pointer w-2/5'
    },
    labelClass() {
      return 'w-1/4 text-tw-grey-lighter'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>