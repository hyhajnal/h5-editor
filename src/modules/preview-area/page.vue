<template>
  <div class="page"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
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
    return {
      width: 375,
      height: 667
    }
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
  margin: 40px auto;
  background: #fff;
  overflow: auto;
}
</style>
