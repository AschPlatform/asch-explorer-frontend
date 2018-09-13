<template>
  <div class="xs:mb-15 sm:mb-30 xs:p-15 sm:p-20 shadow-none  sm:hover:shadow-21 sm:hover:bg-tw-grey-lightet border-1 border-solid border-tw-grey-darker panelitem-container overflow-hidden relative">
    <div v-if="type=='blocks'">
      <div class="right-icon-left absolute -mr-15 -mb-15 pin-b pin-r">
        <q-icon class="xs:text-70 sm:text-70 text-tw-grey-darkest opacity-8" name="icon-block" />
      </div>
      <div :class="timestampClass">
          {{data.timestamp | secFromNow}}{{' ' + $t('SECOND_BEFORE')}}
      </div>
      <div v-if="data" class="flex justify-start">
        <div class="flex justify-start items-start w-auto xs:mr-5 sm:mr-10 xs:pt-2 sm:pt-3">
          <q-icon class="xs:text-15 sm:text-20 text-tw-blue" name="icon-height" />
        </div>
        <div class="w-4/5">
          <div class="flex items-center xs:mb-15 sm:mb-20">
            <span :class="labelClass">{{$t('BLOCK_HEIGHT')}}</span>
            <span :class="linkClass" @click="doSearch(data.height, 'height')">{{data.height | numSeparator}}</span>
          </div>
          <div class="flex items-center xs:mb-15 sm:mb-20">
            <span :class="labelClass">{{$t('PRODUCER')}}</span>
            <span :class="linkClass" @click="$router.push('/delegate/'+getAddress(data.delegate))">
            <a :class="customLinkClass">{{getAddress(data.delegate)}}</a>
            </span>
          </div>
          <div class="flex items-center">
            <span :class="labelClass">{{$t('FORGE_REWARD')}}</span>
            <span class="truncate xs:text-15 sm:text-18 text-tw-grey-darkest w-auto">{{rewardCount(data.height)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="data" class="flex justify-start">
        <div class="flex justify-start items-start w-auto xs:mr-5 sm:mr-10 xs:pt-2 sm:pt-3">
          <q-icon class="xs:text-15 sm:text-20 text-tw-blue" name="icon-transaction" />
        </div>
        <div :class="timestampClass">
          {{timeFromNow(data.timestamp)}}
        </div>
        <div class="w-4/5">
          <div class="flex items-center mb-20">
            <span class="w-auto mr-10 xs:text-15 sm:text-18 text-tw-grey-darkest">{{$t('TRANSACTION_ID')}}</span>
            <span :class="linkClass" class="max-w-xs" @click="doSearch(data.id, 'trans')">
               <a :class="customLinkClass">
                  {{data.id}}
                </a>
              </span>
          </div>
          <p class="flex items-center justify-start mb-20">
            <span class="xs:mr-10 sm:mr-20 xs:text-15 sm:text-18 text-tw-grey-darkest">{{$t('FROM')}}</span>
            <span :class="addressClass" @click="doSearch(data.senderId)">
                <a :class="customLinkClass" href="javascript:;">
                  {{data.senderId}}
                </a>
            </span>
            <span class="xs:mx-5 sm:mx-10 xs:text-15 sm:text-18 text-tw-grey-darkest">{{$t('TO')}}</span>
            <span :class="getProps(data,'recieve')?addressClass:''" @click="doSearch(getProps(data,'recieve'))">
                <a :class="customLinkClass" >
                 {{getProps(data,'recieve')|| 'SYSTEM'}}
                </a>
              </span>
          </p>
          <div class="flex items-center">
            <span class="w-auto xs:mr-10 sm:mr-20 xs:text-15 sm:text-18 text-tw-grey-darkest">{{$t('AMOUNT')}}</span>
            <span v-if="getProps(data)" class="xs:text-15 sm:text-18 text-tw-grey-darkest">
                    {{getresult(getProps(data),4)}}
                  <q-tooltip>{{ getProps(data) }}</q-tooltip>
                </span>
            <span v-else class="xs:text-15 sm:text-18 text-tw-grey-darkest">{{'--'}}</span>
          </div>
        </div>
        <div class="right-icon-right absolute -mr-20 -mb-10 pin-b pin-r">
          <q-icon class="xs:text-60 sm:text-60 text-tw-grey-lighter opacity-8" name="icon-watermark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QIcon, QTooltip } from 'quasar'
import { getAddress, convertFee, fulltimestamp, rewardCount, isDesktop } from '../utils/util'
import { REGEX } from '../utils/constants'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'PanelItem',
  props: ['type', 'data'],
  components: {
    QIcon,
    QTooltip
  },
  data() {
    return {}
  },
  methods: {
    rewardCount,
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
        if (isAmount) value = convertFee(value)
      } else if (type === 103) {
        value = isAmount ? args[len - 2] : args[len - 1]
        if (isAmount && this.assetMap.get(args[0])) {
          value = convertFee(value, this.assetMap.get(args[0]).precision)
        }
      }
      return value
    },
    doSearch(str, type) {
      if (type === 'height' || type === 'trans') {
        return this.$root.$emit('doSearch', str)
      } else if (REGEX.address.test(str)) {
        return this.$root.$emit('doSearch', str)
      } else {
        return this.$root.$emit('doSearch', str, 'nick')
      }
    },
    timeFromNow(timestamp) {
      const lang = this.$store.state.locale
      moment.locale(lang === 'zh' ? 'zh-cn' : 'en-us')
      let timeStr = moment(fulltimestamp(timestamp)).fromNow()
      if (lang === 'en') {
        timeStr = timeStr.replace('seconds', 's')
        timeStr = timeStr.replace('minutes', 'm')
        timeStr = timeStr.replace('minute', 'm')
        timeStr = timeStr.replace('hours', 'h')
        timeStr = timeStr.replace('hour', 'h')
        timeStr = timeStr.replace('an', '1')
      }
      return timeStr
    },
    getresult(str, n) {
      return str.replace(new RegExp('^(\\-?\\d*\\.?\\d{0,' + n + '})(\\d*)$'), '$1')
    }
  },
  computed: {
    ...mapGetters(['assetMap']),
    timestampClass() {
      return 'w-auto text-right xs:text-15 sm:text-18 text-tw-grey-darkest absolute xs:pt-15 xs:pr-15 sm:pt-20 sm:pr-20 pin-t pin-r'
    },
    linkClass() {
      return 'truncate xs:text-15 sm:text-18 text-tw-blue hover:underline w-auto cursor-pointer w-1/2'
    },
    customLinkClass() {
      return isDesktop()
        ? 'custom-link-desktop xs:text-15 sm:text-18 text-tw-blue no-underline hover:underline cursor-pointer'
        : 'custom-link-mobile xs:text-15 sm:text-18 text-tw-blue no-underline hover:underline cursor-pointer'
    },
    addressClass() {
      return 'xs:text-15 sm:text-18 text-tw-blue hover:underline  cursor-pointer custom-link w-1/3'
    },
    labelClass() {
      return 'w-auto xs:text-15 sm:text-18 text-tw-grey-darkest mr-10'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>