<template>
  <q-breadcrumbs v-if="pagePath.length>1" separator=">">
    <q-breadcrumbs-el v-for="(path, idx) in pagePath" :key="idx" :label="$t(_.toUpper(path))" :to="paths[path].path" />
  </q-breadcrumbs>
</template>

<script>
import { QBreadcrumbs, QBreadcrumbsEl } from 'quasar'
import routers from '../router/routes'

export default {
  name: 'Breadcrumb',
  components: {
    QBreadcrumbs,
    QBreadcrumbsEl
  },
  mounted() {},
  data() {
    return {
      data: {},
      routers
    }
  },
  methods: {
    fillPath(children, routeMap, parent) {
      if (children && children.length > 0) {
        children.forEach(child => {
          let name = child.name
          child.parent = parent
          child.pathNameArr = parent.pathNameArr.concat([child.name])
          routeMap[name] = child
          let children = child.children
          this.fillPath(children, routeMap, child)
        })
      }
    }
  },
  computed: {
    paths() {
      const routers = this.routers
      let routeMap = {}
      routers.forEach(router => {
        routeMap[router.name] = router
        router.level = 1
        router.pathNameArr = ['home']
        let children = router.children
        this.fillPath(children, routeMap, router)
      })
      return routeMap
    },
    pageName() {
      return this.$route.name
    },
    pagePath() {
      return this.paths[this.pageName].pathNameArr
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>