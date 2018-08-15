<template>
   <div class="rounded overflow-hidden hv:shadow-lg">
    <div v-if="type=='trans'" >
      <div v-if="data">
       {{data}} 
      </div>
    </div>
    <div v-else>
      <div v-if="data">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PanelItem',
  props: ['type', 'data'],
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
</style>