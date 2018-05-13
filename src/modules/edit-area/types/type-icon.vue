<template>
  <i :class="classStr"
    :style="ele.style" v-if="ele">
  </i>
</template>

<script>
export default {
  name: 'TypeIcon',
  props: {
    ele: Object
  },
  computed: {
    classStr () {
      return `iconfont ${this.ele.config[0].data}`
    }
  }
}
</script>

