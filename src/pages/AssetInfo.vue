<template>
  <q-page class="max-w-1200 m-auto xs:p-15 sm:p-0 xs:pb-20 sm:pb-40">
    <div class="xs:mt-5 xs:mb-20 sm:my-40 text-16 custom-link-btn">
      <button class="p-0 text-tw-grey-darkest hover:text-tw-blue text-16 border-0 bg-tw-white cursor-pointer" @click="$router.push('/assets')">{{this.$t('ASSETS')}}</button>
      <q-icon class="text-12 text-tw-grey-darkest p-0 xs:mx-5 sm:mx-10" name="icon-right" />
      <button class="p-0 text-16 text-tw-grey-darkest border-0 bg-tw-white">{{this.$t('INFO')}}</button>
    </div>
    <div class="border border-solid border-tw-grey rounded-lg xs:px-10 xs:py-15 sm:px-30 sm:py-30">
      <div class="xs:text-16 sm:text-20 text-tw-grey-darkest pl-15">
        {{this.$t('ASSET_INFO')}}
      </div>
      <boundary-line class="xs:my-15 sm:my-30" />
      <div class="flex justify-between">
        <info-panel :panelData="panelData" />
       <div class="self-end w-auto xs:hidden sm:block pb-10">
          <q-icon class="text-60 text-tw-grayish" name="icon-data" />
        </div>
      </div>
      <boundary-line class="my-30" />
      <div class="text-20 text-tw-grey-darkest font-medium">
        {{this.$t('ASSET_DESC')}}
      </div>
      <boundary-line class="my-30" />
      <div class="text-16 text-tw-grey-darkest">
        {{this.desc}}
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QIcon } from 'quasar'
import Breadcrumb from '../components/Breadcrumb'
import BoundaryLine from '../components/BoundaryLine'
import InfoPanel from '../components/InfoPanel'
import { mapActions } from 'vuex'
import { fulltimestamp } from '../utils/util'
import infoImge from '../assets/asch_logo.png'

export default {
  name: 'AssetInfo',
  components: {
    QPage,
    QIcon,
    Breadcrumb,
    BoundaryLine,
    InfoPanel
  },
  data() {
    return {
      infoImge,
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
        this.max = data.maximum
        this.publish = data.quantity
        this.time = fulltimestamp(data.timestamp)
        this.precision = data.precision
        this.address = data.issuerId
        this.account = data.holders
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
          value: this.address,
          type: 'address'
        }
      ]
    }
  }
}
</script>
