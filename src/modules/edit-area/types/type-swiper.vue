<template>
  <swiper :list="list" v-model="index" @on-index-change="onIndexChange"></swiper>
</template>

<script>
import { Swiper } from 'vux'
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]
export default {
  name: 'Button',
  props: {
    ele: Object
  },
  data () {
    return {
      list: baseList,
      index: 0
    }
  },
  components: { Swiper },
  methods: {
    onIndexChange (index) {
      this.index = index
    }
  }
}
</script>

<style scoped>
</style>

