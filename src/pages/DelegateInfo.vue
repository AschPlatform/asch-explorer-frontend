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
            <span>{{ props.props.reward | fee }}</span>
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
/* eslint-disable */
import { QPage, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'

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
      name: '',
      fees: '',
      producedBlocks: 0,
      approval: '',
      productivity: '',
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
  mounted() {
    this.envalueData()
    this.getAccountLeft()
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
          label: 'DELEGATE_NAME',
          value: this.name,
          type: 'id'
        },
        {
          label: 'ACCOUNT_BALANCE',
          value: this.fees
        },
        {
          label: 'BLOCK_NUM',
          value: this.producedBlocks,
          type: 'number'
        },
        {
          label: 'PRODUCTIVITY',
          value: this.productivity + ' %'
        },
        {
          label: 'VOTE_RATE',
          value: this.approval
        },
        {
          label: 'ADDRESS',
          value: this.address,
          type: 'address'
        }
      ]
    }
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getDelegateDetail', 'getBlocks', 'getAccount']),
    async envalueData() {
      let result = await this.getDelegateDetail({
        address: this.address
      })
      if (result.success) {
        let trans = result.delegate
        this.name = trans.name
        this.fees = convertFee(trans.fees)
        this.producedBlocks = trans.producedBlocks
        this.productivity = trans.productivity
        this.approval = trans.approval
      }
    },
    async getAccountLeft() {
      let result = await this.getAccount(this.address)
      if (result.success && result.account && result.account.xas) {
        this.fees = convertFee(result.account.xas) + ' XAS'
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
      this.getAccountLeft()
      this.envalueData()
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
