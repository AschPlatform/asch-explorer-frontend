<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <div class="upperSlot flex justify-between items-center xs:mt-0 xs:mb-20 sm:mb-0 sm:mt-30">
      <div>
        <q-icon class="xs:text-18 sm:text-24 text-tw-grey-darkest xs:mr-10 sm:mr-20 align-middle" name="icon-trustee" />
        <span class="xs:text-16 sm:text-24 font-semibold text-tw-grey-darkest align-middle">{{$t('DELEGATE_LIST')}}</span>
      </div>
      <span class="mobile-only xs:text-12 sm:text-16 text-tw-blue">{{$t('REGIST_DELEGATE')}}: {{count}}{{$t('PERSON')}}</span>
    </div>
    <div class="desktop-only w-full flex justify-end xs:mb-20 mb-40 xs:-mt-20 sm:mt-0">
      <span class="xs:text-12 sm:text-16 text-tw-blue">{{$t('REGIST_DELEGATE')}}: {{count}}{{$t('PERSON')}}</span>
    </div>
    <table-container class="custom-thead" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
      <template class="desktop-only" slot="content" slot-scope="props" v-if="props.props">
        <q-td v-if="props.props.rate" key="rate" >
          <span>{{ props.props.rate }}</span>
        </q-td>
        <q-td v-if="props.props.name" key="name">
          <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.address, 'delegate')">
            <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{ props.props.name }}</a></span>
            <q-tooltip>{{ props.props.name }}</q-tooltip>
          </div>
        </q-td>
        <q-td v-if="props.props.address" key="address">
          <div class="text-tw-blue cursor-pointer hover:underline" @click="doSearch(props.props.address)">
            <span class="w-136 inline-block"><a class="custom-link-desktop text-tw-blue cursor-pointer hover:underline">{{ props.props.address }}</a></span>
            <q-tooltip>{{ props.props.address }}</q-tooltip>
          </div>
        </q-td>
        <!-- <q-td key="producedBlocks" >
          <span>{{ props.props.producedBlocks || 0 }}</span>
        </q-td> -->
        <q-td v-if="props.props.productivity" key="productivity" >
          <span>{{ props.props.productivity + ' %' }}</span>
        </q-td>
        <q-td key="approval">
          <span>{{ props.props.approval.toFixed(2) + ' %' }}</span>
          <q-tooltip>{{ props.props.approval + '%'}}</q-tooltip>
        </q-td>
      </template>
      <template class="mobile-only" slot="items" slot-scope="props" v-if="props.props">
        <table-item  :data="getTableData(props.props)" :bgIcon="'icon-trustee'" :dataIcon="'icon-transaction'"/>
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
import TableItem from '../components/TableItem'

export default {
  name: 'Delegates',
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
        {
          name: 'rate',
          label: this.$t('RANK'),
          field: 'rate',
          align: 'center'
        },
        {
          name: 'name',
          label: this.$t('DELEGATE_NAME'),
          field: 'name',
          align: 'center'
        },
        {
          name: 'address',
          label: this.$t('ADDRESS'),
          field: 'address',
          align: 'center'
        },
        {
          name: 'producedBlocks',
          label: this.$t('BLOCK_NUM'),
          field: 'producedBlocks',
          align: 'center'
        },
        {
          name: 'productivity',
          label: this.$t('PRODUCTIVITY'),
          field: 'productivity',
          align: 'center'
        },
        {
          name: 'approval',
          label: this.$t('VOTE_RATE'),
          field: 'approval',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getDelegates']),
    async getData(props = this.defaultProps) {
      this.data = []
      let res
      props.orderBy = 'rate:asc'
      res = await this.getDelegates(props)
      this.data = res.delegates
      this.count = res.totalCount
    },
    doSearch(str, type) {
      this.$root.$emit('doSearch', str, type)
    },
    getTableData(data) {
      const { rate, name, address, productivity, approval } = data
      let rateField = {
        label: 'RANK',
        value: rate,
        type: 'rate'
      }
      let nameField = {
        label: 'DELEGATE_NAME',
        value: [name, address],
        type: 'delegate'
      }
      let addressField = {
        label: 'ADDRESS',
        value: address,
        type: 'address'
      }
      // let producedBlocksField = {
      //   label: 'BLOCK_NUM',
      //   value: producedBlocks,
      //   type: 'number'
      // }
      let productivityField = {
        label: 'PRODUCTIVITY',
        value: productivity + ' %',
        type: 'productivity'
      }
      let approvalField = {
        label: 'VOTE_RATE',
        value: approval + ' %',
        type: 'voteRate'
      }

      return [
        rateField,
        nameField,
        addressField,
        // producedBlocksField,
        productivityField,
        approvalField
      ]
    }
  },
  computed: {
    params() {
      return this.$route.params
    }
  }
}
</script>
