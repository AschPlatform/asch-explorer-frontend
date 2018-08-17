<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="no-shadow table-top-border" :data="data" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" :no-data-label="$t('NO_DATA')" @request="request" row-key="name">
        <q-tr slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr>
        <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
          <q-btn round dense flat size="sm" icon="first_page"  class="q-mr-sm" :disable="props.isFirstPage" @click="()=>firstPage(props)" />
          <q-btn round dense flat size="sm" icon="chevron_left"  class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
          <div class="q-mr-sm" style="font-size: small">
            {{ props.pagination.page }} / {{ props.pagesNumber }}
          </div>
          <q-btn round dense flat size="sm" icon="chevron_right" :disable="props.isLastPage" @click="props.nextPage" />
          <q-btn round dense flat size="sm" icon="last_page" :disable="props.isLastPage" @click="()=>lastPage(props)" />
        </div>
      </q-table>
      <q-inner-loading :visible="loadingBool">
        <q-spinner-gears size="50px" color="teal-4" />
      </q-inner-loading>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { QTable, QTr, QTd, QTooltip, QBtnGroup, QBtn, QInnerLoading, QSpinnerGears } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import { fulltimestamp } from '../utils/util'

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
    QBtn
  },
  data() {
    return {
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
    ...mapGetters(['loadingBool']),
    columns() {
      return this.columnsData
    }
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
    params() {
      console.log('params changes!')
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