<template>
  <img src="../../../assets/avatar.jpg" alt="图片" :style="ele.style" v-if="ele">
</template>

<script>
export default {
  name: 'Img',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
img {
  width: 120px;
  height: 80px;
}
</style>

