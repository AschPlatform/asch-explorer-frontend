<template>
  <q-page class="max-w-1200 m-auto xs:pl-2 xs:pr-2 sm:pl-0 sm:pr-0 pb-16">
    <breadcrumb />
    <div class="border border-solid border-grey rounded-lg overflow-hidden xs:overflow-scroll sm:overflow-hidden p-4 mb-4">
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('ASSET_INFO')}}
      </div>
      <boundary-line class="mt-2 mb-8" />
      <info-panel :panelData="panelData" />
      <div class="text-14 text-black-dark font-bold">
        {{this.$t('ASSET_DESC')}}
      </div>
      <boundary-line class="mt-2 mb-8" />
      <div>
        {{this.desc}}
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'
import { fulltimestamp } from '../utils/util'

export default {
  name: 'AssetInfo',
  components: {
    QPage,
    Breadcrumb,
    BoundaryLine,
    InfoPanel
  },
  data() {
    return {
      desc: '',
      account: 0,
      issuer: '',
      max: 0,
      publish: 0,
      precision: 0,
      time: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(['getAssetInfo']),
    async getData() {
      let result = await this.getAssetInfo({
        name: this.name
      })
      if (result.success) {
        let data = result.asset
        this.desc = data.desc
        this.issuer = this.name.split('.')[0]
        this.max = data.maximumShow
        this.publish = data.quantityShow
        this.time = fulltimestamp(data.timestamp)
        this.precision = data.precision
        this.address = data.issuerId
      }
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    name() {
      return this.$route.params.name.replace('-', '.')
    },
    panelData() {
      return [
        {
          label: 'ASSET_NAME',
          value: this.name
        },
        {
          label: 'ASSET_ACCOUNT',
          value: this.account
        },
        {
          label: 'ISSUER',
          value: this.issuer
        },
        {
          label: 'MAXIMUN',
          value: this.max
        },
        {
          label: 'ASSET_PUBLISH',
          value: this.publish
        },
        {
          label: 'PRECISION',
          value: this.precision
        },
        {
          label: 'ISSUE_TIME',
          value: this.time
        },
        {
          label: 'ADDRESS',
          value: this.address
        }
      ]
    }
  }
}
</script>
