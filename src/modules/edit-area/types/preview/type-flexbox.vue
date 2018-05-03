<template>
  <flexbox class="row"
    v-if="num"
    :gutter="ele.config[1].data"
    :orient="ele.config[2].data"
    :justify="ele.config[3].data"
    :align="ele.config[4].data"
    :wrap="ele.config[5].data"
    :direction="ele.config[6].data"
  >
    <flexbox-item v-for="(item, index) in num" :key="item" class="col">
      <slot :name="'ele'+index"></slot>
    </flexbox-item>
  </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'

export default {
  name: 'CustomFlexbox',
  props: {
    ele: Object
  },
  computed: {
    num () {
      return parseInt(this.ele.config[0].data)
    }
  },
  components: { Flexbox, FlexboxItem }
}
</script>

<style scoped lang="scss">
.row {
  border: 1px solid #ccc;
  background: #fff;
  width: 100%;
}
.col-container {
  min-height: 50px;
  height: auto;
  border: 1px dashed #ccc;
}
</style>

