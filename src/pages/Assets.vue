<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <div class="upperSlot mt-4">
      <span>数字资产</span>
      <span>链内注册资产: {{count}}</span>
    </div>
    <table-container class="mt-4" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
      <template slot="content" slot-scope="props" v-if="props.props">
        <q-td v-if="props.props.name" key="asset">
          <div class="text-primary cursor-pointer" @click="doSearch(props.props.name, 'delegate')">
            {{ props.props.name.split('.')[1] }}
            <q-tooltip>{{ props.props.name }}</q-tooltip>
          </div>
        </q-td>
        <q-td v-if="props.props.name" key="issuer">
          <div class="text-primary cursor-pointer" @click="doSearch(props.props.name)">
            {{ props.props.name.split('.')[0]}}
            <q-tooltip>{{ props.props.name }}</q-tooltip>
          </div>
        </q-td>
        <q-td v-if="props.props.maximum" key="maximum" >
          <span>{{ props.props.maximum }}</span>
        </q-td>
        <q-td v-if="props.props.precision" key="precision" >
          <span>{{ props.props.precision }}</span>
        </q-td>
        <q-td v-if="props.props.timestamp" key="timestamp" >
          <span>{{ fulltimestamp(props.props.timestamp) }}</span>
        </q-td>
      </template>
    </table-container>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import { mapActions } from 'vuex'
import TableContainer from '../components/TableContainer'
import { fulltimestamp } from '../utils/util'

export default {
  name: 'Assets',
  components: {
    QPage,
    QTd,
    QTooltip,
    TableContainer
  },
  data() {
    return {
      data: [],
      count: 0,
      defaultProps: {
        orderBy: 'timestamp:desc',
        limit: 10,
        offset: 0
      },
      columnsData: [
        // {
        //   name: 'rate',
        //   label: this.$t('RANK'),
        //   field: 'rate',
        //   align: 'center'
        // },
        {
          name: 'asset',
          label: this.$t('ASSET_NAME'),
          field: 'name',
          align: 'center'
        },
        {
          name: 'issuer',
          label: this.$t('ISSUER'),
          field: 'name',
          align: 'center'
        },
        {
          name: 'maximum',
          label: this.$t('MAXIMUN'),
          field: 'maximum',
          align: 'center'
        },
        {
          name: 'precision',
          label: this.$t('PRECISION'),
          field: 'precision',
          align: 'center'
        },
        {
          name: 'timestamp',
          label: this.$t('ISSUE_TIME'),
          field: 'timestamp',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getAssetsShow']),
    async getData(props = this.defaultProps) {
      this.data = []
      let res
      res = await this.getAssetsShow(props)
      this.data = res.assets
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    }
  },
  computed: {
    params() {
      return this.$route.params
    }
  }
}
</script>
