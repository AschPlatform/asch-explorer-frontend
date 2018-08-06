<template>
 <q-card-separator class="bg-transparent border-bottom" />
</template>

<script>
import { QCardSeparator } from 'quasar'

export default {
  name: 'BoundaryLine',
  components: { QCardSeparator },
  mounted() {},
  data() {
    return {
      data: {}
    }
  },
  methods: {},
  computed: {}
}
</script>

<style lang="stylus" scoped>
.border-bottom {
  border-bottom: 1px dashed #000000;
}
</style>