<template>
  <div class="flex xs:mb-15 sm:mb-30 xs:pt-15 xs:pb-5 xs:px-15 sm:p-10 shadow-none sm:hover:shadow-21 border-1 border-solid border-tw-grey-darker panelitem-container relative overflow-hidden">
    <div class="absolute -mr-15 -mb-15 opacity-8 pin-b pin-r">
      <q-icon class="text-60 text-tw-grey-lighter" :name="this.bgIcon" />
    </div>
    <div v-if="hasId && idField" class="flex justify-start items-start w-auto mr-10 pt-2">
      <q-icon class="xs:text-14 sm:text-26 text-tw-blue" :name="this.dataIcon" />
    </div>
    <table class="w-5/6 flex">
      <div class="flex w-full" v-if="hasId && idField">
        <div class="w-auto xs:text-15 sm:text-18 text-tw-grey-darkest mb-15">{{$t(idField.label)}}:</div>
        <div class="truncate text-tw-blue hover:underline xs:text-15 sm:text-18 max-w-2/3 ml-5" @click="doSearch(idField.value)">{{idField.value}}</div>
      </div>
      <tbody class='info-tbody w-full'>
        <tr class="flex" v-for="(arr, idx) in tableData" :key="idx">
          <div class="flex justify-left items-center w-full mb-15" v-for="(data, index) in arr" :key="index">
            <td v-if="data.type==='rate'" class="w-auto xs:text-15 sm:text-18 text-tw-blue whitespace-no-wrap font-semibold">
             <span>{{$t(data.label)}}:</span>
            </td>
            <td v-else class="w-auto xs:text-15 sm:text-18 text-tw-grey-darkest  whitespace-no-wrap">
             <span>{{$t(data.label)}}:</span>
            </td>
            <td class="truncate xs:text-15 sm:text-18 text-tw-grey-darkest max-w-2/3 ml-5">
              <span :class="data.link?`text-tw-blue cursor-pointer hover:underline`:''" @click="data.link?$router.push(data.link+data.value):null">
              <span v-if="data.type==='number'" >{{data.value | numSeparator}}</span>
              <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp(true)}}</span>
              <span v-else-if="data.type==='delegate'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value[1], 'delegate')">{{data.value[0]}}</span>
              <span v-else-if="data.type==='asset'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value, 'asset')">{{data.value.split('.')[1]}}</span>
              <span v-else-if="data.type==='countDown'">{{data.value | secFromNow}} {{$t('SECOND_BEFORE')}}</span>
              <span v-else-if="data.type==='address'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value)">
                <span v-if="data.nickname" >
                  {{data.nickname}}({{data.value}})
                </span>
              <span v-else class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{data.value}}</a></span>
              </span>
              <span v-else-if="data.type==='argStr'">{{data.value}}</span>
              <span v-else-if="data.type==='block'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value)">{{data.value}}</span>
              <span v-else-if="data.type==='transactionId'" class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(data.value)">
                <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{data.value}}</a></span>
                </span>
              <span v-else-if="data.type==='rate'" class="text-15 text-tw-blue font-semibold">{{data.value}}</span>
              <span v-else> {{data.value}} </span>
              </span>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { QTd, QIcon } from 'quasar'
// import { getAddress, convertFee } from '../utils/util'
// import { mapGetters } from 'vuex'

export default {
  name: 'TableItem',
  props: ['data', 'dataIcon', 'bgIcon'],
  components: {
    QTd,
    QIcon
  },
  data() {
    return {
      idField: null
    }
  },
  methods: {
    doSearch(value, type) {
      this.$root.$emit('doSearch', value, type)
    }
  },
  computed: {
    tableData() {
      const data = this.data
      if (!data) return []
      if (this.hasId) {
        this.idField = data.shift()
      }
      let tableData = []
      data.forEach((field, idx) => {
        let index = Math.floor(idx / 2)
        let tableArray = tableData[index] || []
        tableArray.push(field)
        tableData[index] = tableArray
      })
      return tableData
    },
    hasId() {
      return this.data[0].type === 'id'
    },
    icIcon() {
      return this.idIcon + ' xs:text-12 sm:text-20 text-tw-blue material-icons'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>