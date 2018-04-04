<template>
  <component :is="'type-'+element.type"
    :ele="element"
    :class="element.id"
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
  components: {
    ..._Type
  },
  methods: {
  }
}
</script>


<style scoped lang="scss">
</style>

