<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="relative-position">
      <q-table class="desktop-only no-shadow table-top-border" :data="data" :grid="true" :hide-header="false" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" :no-data-label="$t('NO_DATA')" @request="request" row-key="name">
        <q-tr v-if="isDesktop" slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr>
        <!-- <div class="w-full mobile-only" slot="item" slot-scope="props">
          <slot name="items" slot-scope="props" :props="props.row" />
        </div> -->
  
        <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
          <q-btn round dense flat size="sm" icon="first_page" class="q-mr-sm" :disable="props.isFirstPage" @click="()=>firstPage(props)" />
          <q-btn round dense flat size="sm" icon="chevron_left" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
          <div class="q-mr-sm" style="font-size: small">
            {{ props.pagination.page }} / {{ props.pagesNumber }}
          </div>
          <q-btn round dense flat size="sm" icon="chevron_right" :disable="props.isLastPage" @click="props.nextPage" />
          <q-btn round dense flat size="sm" icon="last_page" :disable="props.isLastPage" @click="()=>lastPage(props)" />
        </div>
      </q-table>
      <q-table class="mobile-only no-shadow table-top-border" :data="data" :grid="true" :hide-header="true" :columns="columns" :rows-per-page-options="[3,5,10,50]" :pagination.sync="pagination" :no-data-label="$t('NO_DATA')" @request="request" row-key="name">
        <!-- <q-tr v-if="isDesktop" slot="body" slot-scope="props" :props="props">
          <slot name="content" slot-scope="props" :props="props.row"></slot>
        </q-tr> -->
        <div class="w-full mobile-only" slot="item" slot-scope="props">
          <slot name="items" slot-scope="props" :props="props.row" />
        </div> -->
        <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
          <q-btn round dense flat size="sm" icon="first_page" class="q-mr-sm" :disable="props.isFirstPage" @click="()=>firstPage(props)" />
          <q-btn round dense flat size="sm" icon="chevron_left" class="q-mr-sm" :disable="props.isFirstPage" @click="props.prevPage" />
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
import { QTable, QTr, QTd, QTooltip, QBtnGroup, QBtn, QInnerLoading, QSpinnerGears } from 'quasar'
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
    isDesktop,
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
.q-table
  tr
    border: 1px solid #E0E1E5;
    text-align: center;
    span
      text-align: center;
      font-size: 16px;
  tr:hover
    transition: all ease .3s; 
    transform: scale(1.03);
    border:1px solid rgba(224,225,229,1);
    box-shadow:-3px 3px 5px rgba(5,4,4,0.09)
  td
    border: 1px solid #E0E1E5;
  thead
    border: 1px solid #E0E1E5;
  tr:nth-child(2n -1)
    background-color: #F8F8F8;

</style>