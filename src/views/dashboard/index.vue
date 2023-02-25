<template>
  <div class="dashboard-container">
    <PageTools :show-before="true" />
  </div>
</template>

<script>
import PageTools from '@/components/PageTools/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    PageTools
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
