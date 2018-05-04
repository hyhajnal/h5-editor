<template>
  <grid class="row"
    :cols="ele.config[0].data"
    :show-lr-borders="ele.config[1].data"
    :show-vertical-dividers="ele.config[2].data"
    :style="ele.style"
  >
    <grid-item v-for="(item, index) in ele.config[0].data" :key="item" class="col">
      <slot :name="'ele'+index"></slot>
    </grid-item>
  </grid>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  name: 'CustomGrid',
  props: {
    ele: Object
  },
  components: { Grid, GridItem }
}
</script>

<style scoped lang="scss">
.row {
  background: #fff;
  width: 100%;
}
.col-container {
  min-height: 50px;
  height: auto;
}
</style>

