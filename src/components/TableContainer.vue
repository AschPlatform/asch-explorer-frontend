<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="no-shadow table-top-border" :data="data" :columns="columns" :pagination.sync="pagination" hide-bottom :no-data-label="$t('NO_DATA')" @request="request" row-key="name">
        <q-tr slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr>
      </q-table>
      <div class="mt-4 flex justify-between">
        <div class="flex justify-start items-center ">
          <span>显示</span>
          <q-select class="custorm-select mx-2" v-model="selectPage" :options="options" @input="changePageNumber" hide-underline />
          <span>页</span>
        </div>
        <div class="flex">
          <q-btn class="custorm-last-btn" size="md" @click="toPage(1)">{{this.$t('FIRST_PAGE')}}</q-btn>
          <q-pagination class="custorm-pag" v-model="page" color="secondary" text-color="white" size="md" :min="1" :max="maxPage" :max-pages="3" :ellipses="true" @input="changePage" direction-links/>
          <q-btn class="custorm-last-btn" size="md" @click="toPage(maxPage)">{{this.$t('LAST_PAGE')}}</q-btn>
        </div>
      </div>
      <q-inner-loading :visible="loadingBool">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </div>
  </transition>
</template>

<script>
import {
  QTable,
  QTr,
  QTd,
  QTooltip,
  QBtnGroup,
  QBtn,
  QInnerLoading,
  QSpinnerGears,
  QPagination,
  QSelect
} from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import { fulltimestamp } from '../utils/util'

export default {
  name: 'TableContaine',
  props: ['data', 'count', 'select', 'maxPage', 'params', 'columnsData'],
  components: {
    QTable,
    QTr,
    QTd,
    QTooltip,
    QInnerLoading,
    QSpinnerGears,
    QBtnGroup,
    QBtn,
    QPagination,
    QSelect
  },
  data() {
    return {
      page: 1,
      datas: [],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      isDisable: false,
      selectPage: this.select,
      options: [
        {
          label: '10',
          value: '10'
        },
        {
          label: '15',
          value: '15'
        },
        {
          label: '30',
          value: '30'
        }
      ]
    }
  },
  mounted() {
    this.getData()
    this.showLoading()
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getTransactions', 'getTransfers', 'setLoadingflag']),
    changePage(num) {
      this.$emit('changePage', num)
      this.page = num
    },
    changePageNumber(num) {
      this.selectPage = num
      this.$emit('changePageNumber', num)
    },
    toPage(pageNumber) {
      this.changePage(pageNumber)
      this.page = pageNumber
    },
    showLoading() {
      if (this.datas) {
        this.setLoadingflag(true)
        setTimeout(() => {
          this.setLoadingflag(false)
        }, 2000)
      }
      this.setLoadingflag(true)
    },
    async getData(props = null) {
      let res = []
      // let limit = props ? props.pagination.rowsPerPage : this.pagination.rowsPerPage
      let limit = Number(this.select)
      let pageNo = props ? props.pagination.page : this.pagination.page
      this.page = 1
      this.selectPage = '10'
      let condition = {
        // TODO 参数 bug
        orderBy: 'timestamp:desc',
        limit: limit,
        offset: (pageNo - 1) * limit
      }
      if (props) {
        this.pagination = props.pagination
      }
      if (res.success) {
        this.showLoading()
      }
      this.$emit('getData', condition)
    },
    request(props) {
      this.getData(props)
    },
    init() {
      this.pagination = {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    }
  },
  computed: {
    ...mapGetters(['loadingBool']),
    columns() {
      return this.columnsData
    }
  },
  watch: {
    params() {
      this.init()
      this.getData()
    },
    data() {
      this.showLoading()
    },
    count(val) {
      this.pagination.rowsNumber = val
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>