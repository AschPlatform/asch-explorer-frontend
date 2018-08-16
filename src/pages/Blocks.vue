<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <table-container :data="data" :count="count" :params="height" :columnsData="columnsData" @getData="getData">
        <template slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.height" key="height">
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.height)">
              {{ props.props.height }}
              <q-tooltip>{{ props.props.height }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.timestamp" key="timestamp" >
              <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
          <q-td v-if="props.props.name" key="name" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.name)">
              {{ props.props.name }}
              <q-tooltip>{{ props.props.name }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.id" key="id" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.amount" key="count" >
            <span>{{ props.props.count }}</span>
          </q-td>
          <q-td v-if="props.props.reward" key="reward" >
            <span>{{ rewardCount(props.props.height) }}</span>
          </q-td>
          <q-td v-if="props.props.fee" key="fee" >
            <span v-if="props.props.fee">{{ props.props.fee | fee }}</span>
            <span v-else>--</span>
          </q-td>
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
import { fulltimestamp } from '../utils/util'
import { mapActions } from 'vuex'

export default {
  name: 'Blocks',
  components: {
    QPage,
    Breadcrumb,
    TableContainer,
    QTd,
    QTooltip
  },
  data() {
    return {
      data: [],
      defaultProps: {
        orderBy: 'timestamp:desc',
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
          name: 'name',
          label: this.$t('BLOCK_GENERATOR'),
          field: 'name',
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
          name: 'fee',
          label: this.$t('FEE'),
          field: 'fee',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getBlocks']),
    fulltimestamp,
    async getData(props = this.defaultProps) {
      let res
      // For transactions
      // TODO: BLOCKS API should accept address or publickey
      props.address = this.address
      res = await this.getBlocks(props)
      this.data = res.blocks
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    rewardCount(val) {
      let blockHeight = val
      if (blockHeight) {
        switch (true) {
          case (blockHeight <= 3464500 && blockHeight >= 464500):
            return '3.5 XAS'
          case (blockHeight < 6464500 && blockHeight >= 3464500):
            return '3.0 XAS'
          case (blockHeight < 9464500 && blockHeight >= 6464500):
            return '2.5 XAS'
          case (blockHeight < 12464500 && blockHeight >= 9464500):
            return '2 XAS'
          case (blockHeight < 15464500 && blockHeight >= 12464500):
            return '1 XAS'
          case (blockHeight > 15464500):
            return '0.5 XAS'
          default:
            return '0 XAS'
        }
      }
      return this.$t('LOADING')
    }
  }
}
</script>
