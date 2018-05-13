<template>
  <component :is="componentId" v-if="ele.config" :ele="ele">
    <slot></slot>
  </component>
</template>

<script>
import Div00 from './div/div00'
import Div01 from './div/div01'
import Div10 from './div/div10'
import Div11 from './div/div11'
export default {
  name: 'DIV',
  props: {
    ele: Object
  },
  computed: {
    componentId () {
      const config = this.ele.config
      let flex = config[0].data ? 1 : 0
      let flexbox = config[5].data ? 1 : 0
      return `Div${flex}${flexbox}`
    }
  },
  components: {
    Div00, Div01, Div11, Div10
  }
}
</script>

<style scoped>
</style>

