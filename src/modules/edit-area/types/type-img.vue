<template>
  <!-- <img src="../../../assets/avatar.jpg" alt="图片" :style="ele.style" v-if="ele"> -->
  <badge text="1"></badge>
</template>

<script>
import { Badge } from 'vux'
export default {
  name: 'Img',
  props: {
    ele: Object
  },
  components: { Badge }
}
</script>

<style scoped>
img {
  width: 120px;
  height: 80px;
}
</style>

