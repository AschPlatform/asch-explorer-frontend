<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="no-shadow table-top-border" :data="data" :columns="columns" :pagination.sync="pagination" hide-bottom :no-data-label="$t('NO_DATA')" @request="request" row-key="name">
        <q-tr slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr>
        <!-- <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
            <q-btn round dense flat size="sm" icon="first_page" class="q-mr-sm" :disable="props.isFirstPage" @click="()=>firstPage(props)" />
            <q-btn round dense flat size="sm" icon="chevron_left" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
            <div class="q-mr-sm" style="font-size: small">
              {{ props.pagination.page }} / {{ props.pagesNumber }}
            </div>
            <q-btn round dense flat size="sm" icon="chevron_right" :disable="props.isLastPage" @click="props.nextPage" />
            <q-btn round dense flat size="sm" icon="last_page" :disable="props.isLastPage" @click="()=>lastPage(props)">
            </q-btn>
          </div> -->
      </q-table>
      <div class="mt-4 flex justify-end">
        <q-btn class="custorm-last-btn" size="md" @click="toFirstPage">{{this.$t('FIRST_PAGE')}}</q-btn>
        <q-pagination class="custorm-pag" v-model="page" color="secondary" text-color="white" size="md" :min="1" :max="this.maxPage" :max-pages="3" :ellipses="true" @input="changePage" boundary-links direction-links>
        </q-pagination>
        <q-btn class="custorm-last-btn" size="md" @click="toLastPage">{{this.$t('LAST_PAGE')}}</q-btn>
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
  QPagination
} from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import { fulltimestamp } from '../utils/util'

export default {
  name: 'TableContaine',
  props: ['data', 'count', 'maxPage', 'params', 'columnsData'],
  components: {
    QTable,
    QTr,
    QTd,
    QTooltip,
    QInnerLoading,
    QSpinnerGears,
    QBtnGroup,
    QBtn,
    QPagination
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
      isDisable: false
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
    },
    toFirstPage() {
      this.changePage(1)
      // debugger
      // this.pagination.page = 1
    },
    toLastPage() {
      this.changePage(this.maxPage)
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
      // this.page = this.pageNo
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
    // toast with state control
    // info(msg) {
    //   if (this.isDisable === true) {
    //     return
    //   }
    //   this.isDisable = true
    //   setTimeout(() => {
    //     this.isDisable = false
    //   }, 3000)
    //   toast(msg)
    // },
    request(props) {
      this.getData(props)
    },
    init() {
      this.pagination = {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    },
    firstPage(props) {
      this.pagination.page = 1
      this.request()
    },
    lastPage(props) {
      this.pagination.page = props.pagesNumber
      this.request()
    }
  },
  computed: {
    ...mapGetters(['getPrecision', 'loadingBool']),
    columns() {
      return this.columnsData
    }
    // curPage() {}
    // title() {
    //   let title = ''
    //   switch (this.type) {
    //     case 'trans':
    //       title = 'TRANS_TITLE'
    //       break
    //     case 'block':
    //       title = 'BLOCK_TITLE'
    //       break
    //   }
    //   return this.$t(title)
    // },
    // address() {
    //   return this.$route.params.address
    // },
    // height() {
    //   return this.$route.params.height
    // },
    // buttons() {
    //   return this.btnGroup
    // }
  },
  watch: {
    params(val) {
      this.init()
      this.getData()
    },
    datas() {
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