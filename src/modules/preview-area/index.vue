<template>
  <div class="page" id="page" ref="page" v-if="elements">
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
  mounted () {
    let mod = window.localStorage.getItem('page')
    mod = JSON.parse(mod)
    if (this.elements.length === 0) {
      this.$store.dispatch('changeCurrent', mod)
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  overflow: auto;
  height: inherit;
}
</style>
