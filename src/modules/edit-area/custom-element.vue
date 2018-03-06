<template>
  <div class="custom">
    <component :is="'type-'+element.type" :ele="element" v-if="element.type === 'div'">
      <custom-element
        v-if="element.children && element.children.length > 0"
        v-for="item in element.children"
        :element="item"
        :key="item.id"
      />
    </component>
    <draggable
      v-else
      :options="{group:{name:'page',put:['resource1', 'resource2', 'page']}}"
    >
      <component :is="'type-'+element.type" :ele="element">
        <custom-element
          v-if="element.children && element.children.length > 0"
          v-for="item in element.children"
          :element="item"
          :key="item.id"
        />
      </component>
    </draggable>
  </div>
</template>

<script>
import TypeDiv from './types/type-div'
import TypeSpan from './types/type-span'
import draggable from 'vuedraggable'

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
    TypeSpan,
    draggable
  }
}
</script>


<style scoped lang="scss">

</style>

