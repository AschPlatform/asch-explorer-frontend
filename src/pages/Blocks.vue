<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <breadcrumb class="xs:mt-5 sm:mt-20" />
    <div class="rounded-lg xs:px-0 xs:pt-0 xs:pb-15 sm:px-0 sm:py-0">
    <table-container class="custorm-thead" :data="data" :count="count" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.height" key="height">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
              {{ props.props.height }}
              <q-tooltip>{{ props.props.height }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.timestamp" key="timestamp" >
              <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
          <q-td v-if="props.props.delegate" key="delegate" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.delegate)">
              {{ getAddress(props.props.delegate) | eclipse }}
              <q-tooltip>{{ getAddress(props.props.delegate) }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.id" key="id" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td key="count" >
            <span>{{ props.props.count }}</span>
          </q-td>
          <q-td v-if="props.props.reward" key="reward" >
            <span>{{ props.props.reward | fee }}</span>
          </q-td>
          <q-td key="fee" >
            <span v-if="props.props.fees">{{ props.props.fees | fee }}</span>
            <span v-else>--</span>
          </q-td>
        </template>
        <template class="moblie-only" slot="items" slot-scope="props" v-if="props.props">
          <table-item :bgIcon="'icon-block'" :dataIcon="'icon-height'" :data="getTableData(props)" />
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import TableContainer from '../components/TableContainer'
import { fulltimestamp, convertFee, getAddress } from '../utils/util'
import TableItem from '../components/TableItem'
import { mapActions } from 'vuex'

export default {
  name: 'Blocks',
  components: {
    QPage,
    Breadcrumb,
    TableContainer,
    QTd,
    QTooltip,
    TableItem
  },
  data() {
    return {
      data: [],
      defaultProps: {
        orderBy: 'height:desc',
        limit: 10,
        offset: 0
      },
      count: 0,
      columnsData: [
        {
          name: 'height',
          label: this.$t('HEIGHT'),
          field: 'height',
          align: 'center'
        },
        {
          name: 'timestamp',
          label: this.$t('TRANS_TIME'),
          field: 'timestamp',
          align: 'center'
        },
        {
          name: 'delegate',
          label: this.$t('BLOCK_GENERATOR'),
          field: 'delegate',
          align: 'center'
        },
        {
          name: 'id',
          label: this.$t('BLOCK_ID'),
          field: 'id',
          align: 'center'
        },
        {
          name: 'count',
          label: this.$t('TRANS_NUM'),
          field: 'count',
          align: 'center'
        },
        {
          name: 'reward',
          label: this.$t('FORGE_REWARD'),
          field: 'reward',
          align: 'center'
        },
        {
          name: 'fees',
          label: this.$t('FEE'),
          field: 'fees',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    getAddress,
    ...mapActions(['getBlocks']),
    fulltimestamp,
    async getData(props = this.defaultProps) {
      props.orderBy = 'height:desc'
      let res
      // For transactions
      // TODO: BLOCKS API should accept address or publickey
      res = await this.getBlocks(props)
      this.data = res.blocks
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    getTableData(data) {
      const { id, height, delegate, reward, timestamp } = data.props
      let idField = {
        label: 'BLOCK_ID',
        value: id,
        type: 'id'
      }
      let heightField = {
        label: 'HEIGHT',
        value: height,
        type: 'number'
      }
      let delegateField = {
        label: 'BLOCK_GENERATOR',
        value: getAddress(delegate)
      }
      let rewardField = {
        label: 'FORGE_REWARD',
        value: convertFee(reward)
      }
      // let countField = {
      //   label: 'TRANS_NUM',
      //   value: count
      // }
      // let feeField = {
      //   label: 'FEE',
      //   value: fee
      // }
      let timeField = {
        label: 'FEE',
        value: timestamp,
        type: 'countDown'
      }

      return [idField, heightField, delegateField, rewardField, timeField]
    }
  },
  computed: {
  }
}
</script>
