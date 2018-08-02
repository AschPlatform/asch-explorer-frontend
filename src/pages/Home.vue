<template>
  <q-page padding class="flex items-center">
    <div class="block w-full">
      <div class="flex justify-center mb-10">
        LOGO
      </div>
      <div class="flex mb-4 justify-center">
        <q-input class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker leading-tight"
        v-model="searchStr" @keyup.enter="search" :after="searchIcon"
        type="text" :placeholder="$t('')" hide-underline	/>
      </div>
      <div class="flex">
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPage, QInput } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    QPage,
    QInput
  },
  data() {
    return {
      searchStr: '',
      
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['getMoreAssets', 'getAsset']),
    search() {
      this.$root.$emit('doSearch', this.searchStr)
    }
  },
  computed: {
    searchIcon() {
      return [
        {
          icon: 'search',
          // required function to call when
          // icon is clicked/tapped
          handler: () => this.$root.$emit('doSearch', this.searchStr),
          // Optional. Show icon button
          // if model has a value
          content: true
        }
      ]
    }
  }
}
</script>
