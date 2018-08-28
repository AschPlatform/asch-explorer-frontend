<template>
  <div class="xs:mb-15 sm:mb-30 xs:p-15 sm:p-20 shadow-none hover:shadow-21 border-1 border-solid border-tw-grey-darker panelitem-container">
    <div v-if="type=='blocks'">
      <div class="right-icon ">
        <i class="material-icons xs:text-24 sm:text-48 text-tw-grey-lighter opacity-25 ">timeline</i>
      </div>
      <div class="w-auto text-right xs:text-12 sm:text-24 text-tw-blue right-top-time">
          {{data.timestamp | secFromNow}}{{$t('SECOND_BEFORE')}}
      </div>
      <div v-if="data" class="flex justify-start">
        <div class="flex justify-start items-start w-auto xs:mr-5 sm:mr-10 xs:pt-0 sm:pt-3">
          <i class="material-icons xs:text-14 sm:text-20 text-tw-grey-lighter opacity-25">table_chart</i>
        </div>
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
            <span class="truncate xs:text-12 sm:text-18 text-tw-grey-darkest w-3/4"  >{{data.reward | fee}}{{' XAS'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="data" class="flex justify-start">
        <div class="flex justify-start items-start w-auto xs:mr-5 sm:mr-10 xs:pt-0 sm:pt-3">
          <i class="material-icons xs:text-14 sm:text-20 text-tw-grey-lighter opacity-25">table_chart</i>
        </div>
        <div class="w-4/5">
          <div class="flex items-center mb-20">
            <span class="w-1/5 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t('TRANSACTION_ID')}}</span>
            <span :class="linkClass" @click="doSearch(data.id)">{{data.id}}</span>
          </div>
          <div class="flex items-center justify-start mb-20">
            <span class="xs:mr-10 sm:mr-20 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t('FROM')}}</span>
            <span :class="addressClass" @click="doSearch(data.senderId)" >{{data.senderId}}</span>
            <span class="xs:mx-10 sm:mx-20 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t('TO')}}</span>
            <span :class="getProps(data,'recieve')?addressClass:''" @click="doSearch(getProps(data,'recieve'))" >{{getProps(data,'recieve') || '--'}}</span>
          </div>
          <div class="flex items-center">
            <span class="w-auto mr-20 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t('AMOUNT')}}</span>
            <span class="xs:text-12 sm:text-18 text-tw-grey-lighter">{{getProps(data) || '--'}}</span>
          </div>
        </div>
        <div class="right-icon">
          <i class="material-icons xs:text-24 sm:text-48 text-tw-grey-lighter opacity-25">timeline</i>
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
      return 'truncate xs:text-12 sm:text-18 text-tw-blue hover:underline w-3/4 cursor-pointer'
    },
    addressClass() {
      return 'truncate xs:text-12 sm:text-18 text-tw-blue hover:underline cursor-pointer w-1/3'
    },
    labelClass() {
      return 'w-1/4 xs:text-12 sm:text-18 text-tw-grey-darkest'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>