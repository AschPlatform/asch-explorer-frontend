<template>
  <div class="flex xs:mb-15 sm:mb-30 xs:p-15 sm:p-20 shadow-none hover:shadow-21 border-1 border-solid border-tw-grey-darker panelitem-container">
    <div class="right-icon">
      <i :class="rightIcon"></i>
    </div>
    <div v-if="hasId && idField" class="flex justify-start items-start w-auto xs:mr-5 sm:mr-10 xs:pt-3 sm:pt-3">
      <i :class="icIcon"></i>
    </div>
    <table class="w-4/5 flex">
      <div class="flex" v-if="hasId && idField">
        <div class="w-1/6 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t(idField.label)}}</div>
        <div class="truncate text-tw-blue xs:text-12 sm:text-18 w-5/6" @click="doSearch(idField.value)">{{idField.value}}</div>
      </div>
      <tbody class='info-tbody'>
        <tr class="flex" v-for="(arr, idx) in tableData" :key="idx">
          <div class="flex w-full" v-for="(data, index) in arr" :key="index">
            <td class="w-1/4 xs:text-12 sm:text-18 text-tw-grey-darkest">{{$t(data.label)}}</td>
            <td class="truncate xs:text-12 sm:text-18 text-tw-grey-darkest w-3/4">
              <span :class="data.link?`text-tw-blue cursor-pointer`:''" @click="data.link?$router.push(data.link+data.value):null">
                <span v-if="data.type==='number'" >{{data.value | numSeparator}}</span>
              <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp(true)}}</span>
              <span v-else-if="data.type==='delegate'" class="text-tw-blue cursor-pointer" @click="doSearch(data.value, 'delegate')">{{data.value}}</span>
              <span v-else-if="data.type==='asset'" class="text-tw-blue cursor-pointer" @click="doSearch(data.value, 'asset')">{{data.value.split('.')[1]}}</span>
              <span v-else-if="data.type==='countDown'">{{data.value | secFromNow}} {{$t('SECOND_BEFORE')}}</span>
              <span v-else-if="data.type==='address'" class="text-tw-blue cursor-pointer" @click="doSearch(data.value)">
                <span v-if="data.nickname" >
                  {{data.nickname}}({{data.value}})
                </span>
              <span v-else class="">
                {{data.value}}
              </span>
              </span>
              <span v-else-if="data.type==='argStr'" class="custom-pre-wrap">{{data.value}}</span>
              <span v-else-if="data.type==='block'" class="text-primary cursor-pointer" @click="doSearch(data.value)">{{data.value}}</span>
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
import { QTd } from 'quasar'
// import { getAddress, convertFee } from '../utils/util'
// import { mapGetters } from 'vuex'

export default {
  name: 'TableItem',
  props: ['data', 'iconName', 'idIcon'],
  components: {
    QTd
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
    rightIcon() {
      return this.iconName + ' xs:text-48 sm:text-48 text-tw-grey-lighter opacity-25'
    },
    icIcon() {
      return this.idIcon + ' xs:text-12 sm:text-20 text-tw-blue material-icons'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>