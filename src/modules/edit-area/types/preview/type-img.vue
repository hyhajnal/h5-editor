<template>
  <img src="../../../../assets/avatar.jpg" alt="图片" :style="ele.style" v-if="ele"> 
</template>

<script>

export default {
  name: 'IMG',
  props: {
    ele: Object
  }
}
</script>

<style scoped>
</style>

