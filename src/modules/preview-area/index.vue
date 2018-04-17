<template>
  <div class="page" id="page" ref="page">
    <custom-element
      v-for="item in elements"
      :key="item.id"
      :element="item"
    />
  </div>
</template>

<script>
import CustomElement from './custom-element'
import { mapGetters } from 'vuex'
export default {
  name: 'Page',
  data () {
    return {}
  },
  components: {
    CustomElement
  },
  computed: {
    ...mapGetters({
      elements: 'page'
    })
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.page {
  overflow: auto;
  height: inherit;
}
</style>
