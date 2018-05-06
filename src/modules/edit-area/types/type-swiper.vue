<template>
  <van-swipe :autoplay="3000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'TypeSwiper',
  props: {
    ele: Object
  },
  data () {
    return {
      images: [
        'http://localhost:8360/static/1.jpg',
        'http://localhost:8360/static/2.jpg'
      ]
    }
  }
}
</script>

<style scoped>
</style>

