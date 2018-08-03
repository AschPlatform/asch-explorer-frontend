<template>
  <q-page class="">
    <breadcrumb />
    <table-container :type="'trans'" :params="params" />
  
  </q-page>
</template>

<style>
  
</style>

<script>
  import {
    QPage
  } from 'quasar'
  import TableContainer from '../components/TableContainer'
  import Breadcrumb from '../components/Breadcrumb'
  
  export default {
    name: 'AccountInfo',
    components: {
      QPage,
      Breadcrumb,
      TableContainer
    },
    data() {
      return {}
    },
    computed: {
      params() {
        let address = this.$route.params.address
        let nickname = this.$route.params.nickname
        let params = {}
        // diffrent params in table list
        if (address) params.address = address
        if (nickname) params.nickname = nickname
        return params
      }
    }
  }
</script>
