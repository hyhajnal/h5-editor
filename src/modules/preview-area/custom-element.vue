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
import _Type from '../edit-area/types'

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
      document.getElementById(this.element.id).addEventListener('click', () => {
        this.$router.push({name: 'Edit', query: {id: this.element.link}})
      }, false)
    }
  },
  components: {
    ..._Type
  },
  methods: {
  }
}
</script>


<style scoped lang="scss">
</style>

