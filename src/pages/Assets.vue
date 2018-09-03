<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <div class="upperSlot flex justify-between items-center xs:mt-0 xs:mb-20 sm:mb-0 sm:mt-40">
      <div>
        <q-icon class="xs:text-14 sm:text-18 text-tw-grey-darkest xs:mr-10 sm:mr-20" name="icon-data" />
        <span class="xs:text-14 sm:text-16 text-tw-grey-darkest">{{$t('DIGITAL_ASSET')}}</span>
      </div>
      <span class="mobile-only xs:text-12 sm:text-16 text-tw-blue">{{$t('REGIST_ASSET')}}: {{count}}</span>
    </div>
    <div class="desktop-only w-full flex justify-end xs:mb-20 mb-40 xs:-mt-20 sm:mt-0">
      <span class="xs:text-12 sm:text-16 text-tw-blue">{{$t('REGIST_ASSET')}}: {{count}}</span>
    </div>

    <table-container class="custorm-thead" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
      <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
        <q-td v-if="props.props.name" key="asset">
          <div class="text-primary cursor-pointer" @click="doSearch(props.props.name, 'asset')">
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
          <span>{{ props.props.maximum | fee(props.props.precision)}}</span>
        </q-td>
        <q-td v-if="props.props.precision" key="precision" >
          <span>{{ props.props.precision }}</span>
        </q-td>
        <q-td v-if="props.props.timestamp" key="timestamp" >
          <span>{{ fulltimestamp(props.props.timestamp) }}</span>
        </q-td>
      </template>
      <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
        <table-item :data="getTableData(props.props)" :bgIcon="'icon-data'" :dataIcon="'icon-transaction'"/>
      </template>
    </table-container>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip, QIcon } from 'quasar'
import { mapActions } from 'vuex'
import TableContainer from '../components/TableContainer'
import { fulltimestamp } from '../utils/util'
import TableItem from '../components/TableItem'

export default {
  name: 'Assets',
  components: {
    QPage,
    QTd,
    QIcon,
    QTooltip,
    TableContainer,
    TableItem
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
    doSearch(str, type) {
      this.$root.$emit('doSearch', str, type)
    },
    getTableData(data) {
      const { name, timestamp } = data

      let assetField = {
        label: 'ASSET_NAME',
        value: name,
        type: 'asset'
      }
      let issuerField = {
        label: 'ISSUER',
        value: name.split('.')[0]
      }
      // let maximumField = {
      //   label: 'MAXIMUN',
      //   value: convertFee(maximum, precision)
      // }
      // let precisionField = {
      //   label: 'PRECISION',
      //   value: precision
      // }
      let timeField = {
        label: 'ISSUE_TIME',
        value: fulltimestamp(timestamp)
      }
      return [assetField, issuerField, timeField]
    }
  },
  computed: {
    params() {
      return this.$route.params
    }
  }
}
</script>
