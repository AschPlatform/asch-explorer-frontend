<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
  
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2 mb-8" />
      <info-panel :panelData="panelData" />
      <table-container :data="data" :count="count" :params="address" :columnsData="columnsData" @getData="getData">
        <template slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.height" key="height">
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.height)">
              {{ props.props.height }}
            </div>
          </q-td>
          <q-td v-if="props.props.reward" key="reward">
            <span>{{ rewardCount(props.props.height) }}</span>
          </q-td>
          <q-td v-if="props.props.count" key="count">
            <span>{{ props.props.count }}</span>
          </q-td>
          <q-td v-if="props.props.fees" key="fees">
            <span>{{ props.props.fees }}</span>
          </q-td>
          <q-td v-if="props.props.timestamp" key="timestamp" >
            <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp, getAddress, rewardCount } from '../utils/util'

export default {
  name: 'DelegateInfo',
  components: {
    QPage,
    BoundaryLine,
    Breadcrumb,
    InfoPanel,
    TableContainer,
    QTd,
    QTooltip
  },
  data() {
    return {
      block: '',
      producer: '',
      transNum: 0,
      transFee: '',
      preBlock: '',
      produceTime: '',
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
          label: this.$t('BLOCK_HEIGHT'),
          field: 'height',
          align: 'center'
        },
        {
          name: 'reward',
          label: this.$t('FORGE_REWARD'),
          field: 'reward',
          align: 'center'
        },
        {
          name: 'count',
          label: this.$t('TRANS_NUM'),
          field: 'count',
          align: 'center'
        },
        {
          name: 'fees',
          label: this.$t('TRANS_FEE'),
          field: 'fees',
          align: 'center'
        },
        {
          name: 'timestamp',
          label: this.$t('PRODUCER_TIME'),
          field: 'timestamp',
          align: 'center'
        }
      ]
    }
  },
  async mounted() {
    this.envalueData()
  },
  computed: {
    address() {
      return this.$route.params.address
    },
    // params() {
    //   return {
    //     height: this.height
    //   }
    // },

    panelData() {
      return [
        {
          label: 'BLOCK_HEIGHT',
          value: this.blockHeight,
          type: 'number'
        },
        {
          label: 'BLOCK_ID',
          value: this.block,
          type: 'id'
        },
        {
          label: 'PRODUCER',
          value: this.producer,
          type: 'address'
        },
        {
          label: 'FORGE_REWARD',
          value: rewardCount(this.blockHeight)
        },
        {
          label: 'TRANS_NUM',
          value: this.transNum,
          type: 'number'
        },
        {
          label: 'TRANS_FEE',
          value: this.transFee
        }
      ]
    }
  },
  methods: {
    rewardCount,
    fulltimestamp,
    ...mapActions(['getBlocks']),
    async envalueData() {
      let result = await this.getBlocks({
        height: this.blockHeight
      })
      if (result.success) {
        let trans = result.block
        this.block = trans.id
        this.producer = getAddress(trans.generatorPublicKey)
        this.transNum = trans.numberOfTransactions
        this.transFee = convertFee(trans.totalFee) + ' XAS'
        this.preBlock = trans.previousBlock
        this.produceTime = fulltimestamp(trans.timestamp)
      }
    },
    async getData(props = this.defaultProps) {
      let res
      // For transactions
      // TODO: BLOCKS API should accept address or publickey
      props.address = this.address
      res = await this.getBlocks(props)
      this.data = res.transactions
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    }
  },
  watch: {
    address() {
      this.envalueData()
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
