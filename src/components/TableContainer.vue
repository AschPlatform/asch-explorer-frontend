<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="desktop-only no-shadow table-top-border" :data="data" :grid="true" :hide-header="false" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" :no-data-label="$t('NO_DATA')" @request="request" row-key="name" hide-bottom>
        <q-tr v-if="isDesktop" slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr>
      </q-table>
      <q-table class="mobile-only no-shadow table-top-border" :data="data" :grid="true" :hide-header="true" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" :no-data-label="$t('NO_DATA')" @request="request" row-key="name" hide-bottom>
        <div class="w-full mobile-only" slot="item" slot-scope="props">
          <slot name="items" slot-scope="props" :props="props.row" />
        </div> -->
      </q-table>
        <div class="flex justify-between xs:py-20 sm:py-40">
        <div class="flex justify-start items-center">
          <span>{{$t('SHOW')}}</span>
          <q-select class="border border-solid border-tw-grey-darker xs:mx-5 sm:mx-10 xs:px-10 sm:px-20 py-5" v-model="selectPage" :options="options" @input="changePageNumber" hide-underline />
          <span>{{$t('PAGE')}}</span>
        </div>
        <div class="flex justify-between">
          <button class="custorm-last-btn  border-none bg-tw-white hover:text-tw-blue cursor-pointer xs:hidden sm:block" size="md" @click="toPage(1)">{{$t('FIRST_PAGE')}}</button>
          <q-pagination class="custorm-pag" v-model="curPage" color="tw-blue"  size="md" :min="1" :max="getMaxPage()" :max-pages="3" :ellipses="true" @input="changePage" direction-links/>
          <button class="custorm-last-btn border-none bg-tw-white hover:text-tw-blue cursor-pointer xs:hidden sm:block" size="md" @click="toPage(getMaxPage())">{{$t('LAST_PAGE')}}</button>
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
import { fulltimestamp, isDesktop } from '../utils/util'

export default {
  name: 'TableContaine',
  props: ['data', 'count', 'params', 'columnsData'],
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
      datas: [],
      curPage: 1,
      selectPage: 20,
      options: [
        {
          label: '20',
          value: 20
        },
        {
          label: '30',
          value: 30
        },
        {
          label: '50',
          value: 50
        },
        {
          label: '100',
          value: 100
        }
      ],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      isDisable: false
    }
  },
  mounted() {
    this.getData()
    this.getMaxPage()
    this.showLoading()
  },
  methods: {
    isDesktop,
    fulltimestamp,
    ...mapActions(['getTransactions', 'getTransfers', 'setLoadingflag']),
    changePageNumber(num) {
      this.pagination.rowsPerPage = this.selectPage = num
      this.request()
    },
    toPage(num) {
      this.pagination.page = this.curPage = num
      this.request()
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
      let limit = props ? props.pagination.rowsPerPage : this.pagination.rowsPerPage
      let pageNo = props ? props.pagination.page : this.pagination.page
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
      this.curPage = 1
      this.selectPage = 20
      this.getMaxPage()
    },
    changePage(val) {
      this.pagination.page = val
      this.request()
    },
    getMaxPage() {
      return Math.ceil(Number(this.count) / this.pagination.rowsPerPage)
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
.q-table {
  tr {
    border: 1px solid #E0E1E5;
    text-align: center;

    span {
      text-align: center;
      font-size: 16px;
    }
  }

  tr:hover {
    transform: scale(1.02);
    border-radius: 6px;
    box-shadow: 0 0 10px #E0E1E5;
  }

  td {
    border: 1px solid #E0E1E5;
  }

  thead {
    border: 1px solid #E0E1E5;
  }

  tr:nth-child(2n -1) {
    background-color: #F8F8F8;
  }
}
</style>