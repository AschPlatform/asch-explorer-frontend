<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <div class="upperSlot mt-4">
      <span>受托人列表</span>
      <span>注册受托人: {{count}}</span>
    </div>
    <table-container class="mt-4" :data="data" :count="count" :params="params" :columnsData="columnsData" @getData="getData">
      <template slot="content" slot-scope="props" v-if="props.props">
        <q-td v-if="props.props.rate" key="rate" >
          <span>{{ props.props.rate }}</span>
        </q-td>
        <q-td v-if="props.props.name" key="name">
          <div class="text-primary cursor-pointer" @click="doSearch(props.props.address, 'delegate')">
            {{ props.props.name | eclipse }}
            <q-tooltip>{{ props.props.name }}</q-tooltip>
          </div>
        </q-td>
        <q-td v-if="props.props.address" key="address">
          <div class="text-primary cursor-pointer" @click="doSearch(props.props.address)">
            {{ props.props.address | eclipse }}
            <q-tooltip>{{ props.props.address }}</q-tooltip>
          </div>
        </q-td>
        <q-td v-if="props.props.producedBlocks" key="producedBlocks" >
          <span>{{ props.props.producedBlocks }}</span>
        </q-td>
        <q-td v-if="props.props.productivity" key="productivity" >
          <span>{{ props.props.productivity + ' %' }}</span>
        </q-td>
        <q-td v-if="props.props.approval" key="approval" >
          <span>{{ props.props.approval + ' %' }}</span>
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

export default {
  name: 'Delegates',
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
      res = await this.getDelegates(props)
      this.data = res.delegates
      this.count = res.totalCount
    },
    doSearch(str, type) {
      this.$root.$emit('doSearch', str, type)
    }
  },
  computed: {
    params() {
      return this.$route.params
    }
  }
}
</script>
