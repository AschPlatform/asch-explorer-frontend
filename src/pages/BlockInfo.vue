<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
  
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <boundary-line class="mt-2 mb-8" />
      <info-panel :panelData="panelData" />
      <table-container :data="data" :count="count" :params="height" :columnsData="columnsData" @getData="getData">
        <template slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id">
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.height" key="height" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.height)">
              {{ props.props.height }}
            </div>
          </q-td>
          <q-td v-if="props.props.timestamp > -1" key="timestamp" >
            <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
          <q-td v-if="props.props.type" key="type" >
            <span class="">{{ getTransType(props.props) }}</span>
          </q-td>
          <q-td v-if="props.props.senderId" key="senderId" >
            <div class="text-primary cursor-pointer" @click="doSearch(props.props.senderId)">
              {{ props.props.senderId | eclipse }}
              <q-tooltip>{{ props.props.senderId }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.amount" key="amount" >
            <span v-if="getAmount(props.props.transaction)">{{ getAmount(props.props.transaction) }}</span>
          </q-td>
          <q-td v-if="props.props.args || props.props.args === null" key="args" >
           <div v-if="props.props.args && props.props.args.length > 0" >
            <span>{{ props.props.args.join(',') | eclipse }}</span>
              <q-tooltip>{{ props.props.args }}</q-tooltip>
           </div>
            <span v-else>--</span>
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

<script>
import { QPage, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { transTypes } from '../utils/constants'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp, getAddress } from '../utils/util'

export default {
  name: 'BlockInfo',
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
          name: 'id',
          label: 'ID',
          field: 'ID',
          align: 'center'
        },
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
          name: 'type',
          label: this.$t('TRANSACTION_TYPE'),
          field: 'type',
          align: 'center'
        },
        {
          name: 'senderId',
          label: this.$t('TRANS_SENDER'),
          field: 'senderId',
          align: 'center'
        },
        {
          name: 'args',
          label: this.$t('ARGUMENTS'),
          field: 'args',
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
  async mounted() {
    this.envalueData()
  },
  computed: {
    blockHeight() {
      return Number(this.$route.params.height) || 0
    },
    rewardCount() {
      let blockHeight = this.blockHeight
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
    },
    height() {
      return this.$route.params.height
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
          value: this.rewardCount
        },
        {
          label: 'TRANS_NUM',
          value: this.transNum,
          type: 'number'
        },
        {
          label: 'TRANS_FEE',
          value: this.transFee
        },
        {
          label: 'PRE_BLOCK',
          value: this.preBlock,
          type: 'preBlock'
        },
        {
          label: 'PRODUCER_TIME',
          value: this.produceTime
        }
      ]
    }
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getBlockInfo', 'getTransactions']),
    async envalueData() {
      let result = await this.getBlockInfo({
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
      props.height = this.height
      res = await this.getTransactions(props)
      this.data = res.transactions
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    getTransType(trans) {
      const { type, args } = trans
      let currencySymbol = 'XAS'
      let transType = this.$t(transTypes[type])
      // type that need fill with currency symbol
      const filterTransType = [1, 103]
      if (filterTransType.indexOf(type) >= 0) {
        if (args && args.length === 3) currencySymbol = args[0].split('.')[1]
        return currencySymbol + ' ' + transType
      } else {
        return transType
      }
    },
    getAmount(trans) {
      if (!trans.args) return '--'
      const filterTransType = [1, 103]
      const { args } = trans
      // const len = args ? args.length : 0
      if (filterTransType.indexOf(trans.type) >= 0) {
        if (args && args.length === 3) return convertFee(args[1], this.getPrecision(args[0]))
        return convertFee(args[0])
        // return currencySymbol + ' ' + transType
      } else {
        return '--'
      }
      // return args[len - 2]
    }
  },
  watch: {
    height() {
      this.envalueData()
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
