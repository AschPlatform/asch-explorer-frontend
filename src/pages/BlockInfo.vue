<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <breadcrumb class="xs:mt-5 sm:mt-40" />
    <div class="border border-solid border-tw-grey rounded-lg">
      <div class="xs:px-10 xs:py-15 sm:px-30 sm:py-30">
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest sm:pl-15">
        {{this.$t('BLOCK_INFO')}}
      </div>
      <div class="xs:px-0 sm:px-15">
      <boundary-line class="xs:my-15 sm:my-30" />
      </div>
      <div class="flex justify-between">
        <info-panel :panelData="panelData" />
        <div class="self-end w-auto xs:hidden sm:block pb-10 xs:pl-0 sm:pr-15">
          <q-icon class="text-60 text-tw-grayish" name="icon-block" />
        </div>
      </div>
      <div class="xs:px-0 sm:px-15">
        <boundary-line class="xs:my-20 sm:mt-40 sm:mb-30" />
      </div>
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest font-semibold sm:pl-15">
        {{$t('TRANS_TITLE')}}
      </div>
      <div class="xs:px-0 sm:px-15">
      <boundary-line class="xs:my-20 sm:mt-30 sm:mb-0" />
      </div>
      </div>
      <table-container class="xs:p-10 sm:p-0 custorm-tr-border" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
          <q-td v-if="props.props.id" key="id">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.id)">
              {{ props.props.id | eclipse }}
              <q-tooltip>{{ props.props.id }}</q-tooltip>
            </div>
          </q-td>
          <q-td v-if="props.props.height" key="height" >
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
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
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.senderId)">
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
        <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
          <table-item  :data="getTableData(props)" :bgIcon="'icon-details'" :dataIcon="'icon-transaction'"/>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
import { QPage, QTd, QTooltip, QIcon } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { transTypes } from '../utils/constants'
import { mapActions, mapGetters } from 'vuex'
import TableItem from '../components/TableItem'
import { convertFee, fulltimestamp, getAddress, rewardCount } from '../utils/util'
import infoImge from '../assets/asch_logo.png'

export default {
  name: 'BlockInfo',
  components: {
    QPage,
    BoundaryLine,
    Breadcrumb,
    InfoPanel,
    TableContainer,
    QTd,
    QIcon,
    QTooltip,
    TableItem
  },
  data() {
    return {
      infoImge,
      block: '',
      producer: '',
      transNum: 0,
      transFee: '',
      preBlock: '',
      produceTime: '',
      height: 0,
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
    ...mapGetters(['getPrecision']),
    // blockHeight() {
    //   return Number(this.$route.params.height) || 0
    // },
    params() {
      if (this.$route.params.height) {
        return Number(this.$route.params.height) || 0
      } else {
        return this.$route.params.id || ''
      }
    },

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
          value: rewardCount(this.height)
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
      let para = {}
      if (this.$route.params.height) {
        para['height'] = this.params
      } else {
        para['id'] = this.params
      }
      let result = await this.getBlockInfo(para)
      if (result.success) {
        let trans = result.block
        this.block = trans.id
        this.height = trans.height
        this.producer = getAddress(trans.generatorPublicKey)
        this.transNum = trans.numberOfTransactions
        this.transFee = convertFee(trans.totalFee) + ' XAS'
        this.preBlock = trans.previousBlock
        this.produceTime = fulltimestamp(trans.timestamp)
        this.reward = convertFee(trans.reward)
      }
    },
    async getData(props = this.defaultProps) {
      let res
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
    },
    getTableData(data) {
      const { id, senderId, timestamp } = data.props
      let idField = {
        label: 'TRANSACTION_ID',
        value: id,
        type: 'id'
      }
      let typeField = {
        label: 'TRANSACTION_TYPE',
        value: this.getTransType(data.props)
      }
      let senderField = {
        label: 'TRANS_SENDER',
        value: senderId,
        type: 'address'
      }
      // let feeField = {
      //   label: 'FEE',
      //   value: fee
      // }
      // let argsField = {
      //   label: 'ARGUMENTS',
      //   value: args.join(',')
      // }
      let timeField = {
        label: 'TRANS_TIME',
        value: fulltimestamp(timestamp),
        type: 'arg'
      }

      return [idField, typeField, senderField, timeField]
    }
  },
  watch: {
    params() {
      this.envalueData()
      this.getData()
    },
    height() {
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
