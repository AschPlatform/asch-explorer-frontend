<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <div class="xs:mt-5 xs:mb-20 sm:my-20 text-16 custom-link-btn">
      <button class="p-0 text-tw-grey-darkest hover:text-tw-blue text-16 border-0 bg-tw-white cursor-pointer" @click="$router.push('/delegates')">{{this.$t('DELEGATES')}}</button>
      <q-icon class="text-12 text-tw-grey-darkest p-0 xs:mx-5 sm:mx-10" name="icon-right" />
      <button class="p-0 text-16 text-tw-grey-darkest border-0 bg-tw-white">{{this.$t('INFO')}}</button>
    </div>
    <div class="border border-solid border-tw-grey rounded-lg xs:px-10 xs:py-15 sm:px-40 sm:py-30">
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest font-normal xs:pl-5 sm:pl-15">
        {{this.$t('DELEGATE_INFO')}}
      </div>
      <div class="xs:px-5 sm:px-15">
        <boundary-line class="xs:my-15 sm:my-30" />
      </div>
       <div class="flex justify-between">
        <info-panel :panelData="panelData" />
        <div class="self-end w-auto xs:hidden sm:block pb-10">
          <q-icon class="text-60 text-tw-grayish" name="icon-trustee" />
        </div>
      </div>
      <table-container :data="data" :count="count" :params="address" :columnsData="columnsData" @getData="getData">
        <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
          <q-td key="height">
            <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.height)">
              {{ props.props.height }}
            </div>
          </q-td>
          <q-td key="reward">
            <span>{{ props.props.reward | fee }}</span>
          </q-td>
          <q-td key="count">
            <span>{{ props.props.count }}</span>
          </q-td>
          <q-td key="fees" class="text-right">
            <span>{{ props.props.fees }}</span>
          </q-td>
          <q-td key="timestamp" >
            <span>{{ fulltimestamp(props.props.timestamp) }}</span>
          </q-td>
        </template>
        <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
          <table-item  :data="getTableData(props.props)" :bgIcon="'icon-details'" :dataIcon="'icon-transaction'"/>
        </template>
      </table-container>
    </div>
  </q-page>
</template>

<script>
import { QPage, QIcon, QTd, QTooltip } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import TableContainer from '../components/TableContainer'
import { mapActions } from 'vuex'
import { convertFee, fulltimestamp } from '../utils/util'
import TableItem from '../components/TableItem'

export default {
  name: 'DelegateInfo',
  components: {
    QPage,
    QIcon,
    BoundaryLine,
    Breadcrumb,
    InfoPanel,
    TableContainer,
    QTd,
    QTooltip,
    TableItem
  },
  data() {
    return {
      fees: '',
      balance: 0,
      producedBlocks: 0,
      address: '',
      approval: '',
      productivity: '',
      data: [],
      userName: '',
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
  },
  computed: {
    name() {
      return this.$route.params.name
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
          value: this.userName,
          type: 'id'
        },
        {
          label: 'ACCOUNT_BALANCE',
          value: this.balance
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
          label: 'DELEGATE_ADDRESS',
          value: this.address,
          type: 'address'
        }
      ]
    }
  },
  methods: {
    fulltimestamp,
    ...mapActions(['getDelegateDetail', 'getBlocks', 'getAccount', 'getDelegateBlock']),
    async envalueData() {
      let result = await this.getDelegateDetail({
        address: this.name
      })
      if (result.success) {
        let trans = result.delegate
        this.address = trans.address
        this.fees = convertFee(trans.fees)
        this.producedBlocks = trans.producedBlocks
        this.productivity = trans.productivity
        this.approval = trans.approval
        this.userName = trans.name
        this.getAccountLeft()
      }
    },
    async getAccountLeft() {
      let result = await this.getAccount(this.address)
      if (result.success && result.account && result.account.xas) {
        this.balance = convertFee(result.account.xas) + ' XAS'
      }
    },
    async getBalance(address) {},
    async getData(props = this.defaultProps) {
      if (this.userName === '') {
        return
      }
      let res
      // For transactions
      // TODO: BLOCKS API should accept address or publickey
      props.name = this.userName
      props.reverse = 1
      res = await this.getDelegateBlock(props)
      this.data = res.blocks
      this.count = res.count
    },
    doSearch(str) {
      this.$root.$emit('doSearch', str)
    },
    getTableData(data) {
      const { height, reward, count, fees, timestamp } = data

      let heightField = {
        label: 'BLOCK_HEIGHT',
        value: height
      }
      let rewardField = {
        label: 'FORGE_REWARD',
        value: reward
      }
      let countField = {
        label: 'TRANS_NUM',
        value: count
      }
      let feeField = {
        label: 'TRANS_FEE',
        value: fees
      }
      let timeField = {
        label: 'PRODUCER_TIME',
        value: fulltimestamp(timestamp)
      }
      return [heightField, rewardField, countField, feeField, timeField]
    }
  },
  watch: {
    name() {
      this.envalueData()
    },
    userName(value) {
      if (value !== '') {
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
</style>
