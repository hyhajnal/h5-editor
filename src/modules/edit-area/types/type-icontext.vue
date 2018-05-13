<template>
  <span :style="ele.style" v-if="ele.config" class="icontext">
    <i :class="classStr" :style="'marginRight:'+ele.config[2].data+'px'"></i>
    {{ele.config[1].data}}
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    ele: Object
  },
  computed: {
    classStr () {
      if (!this.ele.config) return
      return `iconfont ${this.ele.config[0].data}`
    }
  }
}
</script>

<style scoped lang="scss">
.icontext {
  font-size: 12px;
  i {
    font-size: 12px;
  }
}
</style>


