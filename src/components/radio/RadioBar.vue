<template>
  <div class="item-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RadioBar',
  props: {
    value: [Number, String]
  },
  watch: {
    value () {
      // 通知子元素
      this.$emit('radio-change-bar', this.value)
    }
  },
  mounted () {
    this.$emit('radio-change-bar', this.value)
    this.$on('radio-change-item', key => {
      // 通知外层组件
      this.$emit('change', key)
      // v-model 通过input将值带出
      this.$emit('input', key)
    })
  }
}
</script>

<style scoped>
.item-bar {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>