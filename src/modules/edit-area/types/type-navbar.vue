<template>
  <van-nav-bar
    :style="ele.style"
    v-if="ele.config"
    :title="ele.config[0].data"
  >
    <span slot="left">
      <i :class="classStr1" v-if="ele.config[1].data">
      </i>
      <span v-if="ele.config[2].data">{{ele.config[2].data}}</span>
    </span>
    <span slot="right">
      <i :class="classStr2" v-if="ele.config[3].data">
      </i>
      <span v-if="ele.config[4].data">{{ele.config[4].data}}</span>
    </span>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    ele: Object
  },
  computed: {
    classStr1 () {
      if (!this.ele.config) return
      return `iconfont ${this.ele.config[1].data}`
    },
    classStr2 () {
      if (!this.ele.config) return
      return `iconfont ${this.ele.config[3].data}`
    }
  }
}
</script>

<style scoped>
</style>

