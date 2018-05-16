<template>
  <van-nav-bar
    :style="ele.style"
    v-if="ele.config"
    :title="ele.config[0].data"
  >
    <span slot="left">
      <i :class="['iconfont',ele.config[1].data]" v-if="ele.config[1].data">
      </i>
      <span v-if="ele.config[2].data">{{ele.config[2].data}}</span>
    </span>
    <span slot="right">
      <i :class="['iconfont',ele.config[3].data]" v-if="ele.config[3].data">
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
  }
}
</script>

<style scoped>
i {
  font-size: 16px;
  vertical-align: middle;
}
</style>

