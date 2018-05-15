<template>
  <img :src="url" alt="图片" :style="ele.style" v-if="ele"> 
</template>

<script>
// import Config from '@/utils/config'
export default {
  name: 'IMG',
  props: {
    ele: Object
  },
  computed: {
    url () {
      const dataUrl = this.ele.config[0].data
      if (dataUrl) {
        return dataUrl
      } else {
        return `http://localhost/static/noimage.jpg`
      }
    }
  }
}
</script>

<style scoped>
</style>

