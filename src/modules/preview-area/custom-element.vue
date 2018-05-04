<template>
  <component :is="'type-'+element.type"
    :ele="element"
    :class="element.id"
    :id="element.id"
  >
    <custom-element
      v-for="item in element.children"
      :element="item"
      :key="item.id"
      v-if="element.children && element.children.length > 0"
    />
  </component>
</template>

<script>
import _Type from '../edit-area/types/preview'
import Config from '@/utils/config'
// import Bus from '@/utils/Bus'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {}
  },
  mounted () {
    if (this.element.link) {
      const el = document.getElementById(this.element.id)
      el && el.addEventListener('click', () => {
        this.axios.get(`${Config.URL}/editor/page/detail`, {
          params: { id: this.element.link }
        }).then(data => {
          this.$store.dispatch('changeCurrent', data)
        })
      }, false)
    }
  },
  components: {
    ..._Type
  }
}
</script>


<style scoped lang="scss">
</style>

