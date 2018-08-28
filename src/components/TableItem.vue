<template>
  <div class="flex">
    <div v-if="hasId && idField" class="flex w-full text-xs">
      <div class="absolute pin-l -ml-3">ic</div>
      <div class="w-1/6 text-xs">{{$t(idField.label)}}</div>
      <div class="w-5/6 truncate text-primary corsor-pointer" @click="doSearch(idField.value)">{{idField.value}}</div>
    </div>
    <table class="w-full">
      <tbody class='info-tbody'>
        <tr class="flex" v-for="(arr, idx) in tableData" :key="idx">
          <div class="flex w-full" v-for="(data, index) in arr " :key="index">
            <td class="w-1/3 text-xs">{{$t(data.label)}}</td>
            <td class="w-2/3 text-xs truncate">
              <span :class="data.link?`text-primary cursor-pointer`:''" @click="data.link?$router.push(data.link+data.value):null">
                <span v-if="data.type==='number'" >{{data.value | numSeparator}}</span>
              <span v-else-if="data.type==='timestamp'">{{data.value | formatTimestamp(true)}}</span>
              <span v-else-if="data.type==='delegate'" class="text-primary cursor-pointer" @click="doSearch(data.value, 'delegate')">{{data.value}}</span>
              <span v-else-if="data.type==='asset'" class="text-primary cursor-pointer" @click="doSearch(data.value, 'asset')">{{data.value.split('.')[1]}}</span>
              <span v-else-if="data.type==='countDown'">{{data.value | secFromNow}} {{$t('SECOND_BEFORE')}}</span>
              <span v-else-if="data.type==='address'" class="text-primary cursor-pointer" @click="doSearch(data.value)">
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
  props: ['data'],
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
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>