<template>
  <component :is="'type-'+element.type"
    :ele="element"
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
import TypeDiv from '../edit-area/types/type-div'
import TypeSpan from '../edit-area/types/type-span'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {}
  },
  components: {
    TypeDiv,
    TypeSpan
  },
  methods: {
  }
}
</script>


<style scoped lang="scss">
</style>

