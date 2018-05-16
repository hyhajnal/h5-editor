<template>
  <van-rate
    :style="ele.style" v-if="ele.config"
    v-model="value"
    :size="ele.config[1].data"
    :count="ele.config[2].data"
    :color="ele.config[3].data"
    :void-color="ele.config[4].data"
    :disabled-color="ele.config[5].data"
    :disabled="ele.config[6].data"
  />
</template>

<script>
export default {
  name: 'TypeRate',
  props: {
    ele: Object
  },
  data () {
    return {
      value: 5
    }
  },
  watch: {
    'ele.config' () {
      if (!this.ele.config) return
      this.value = this.ele.config[0].data
    }
  }
}
</script>

<style scoped>
</style>

