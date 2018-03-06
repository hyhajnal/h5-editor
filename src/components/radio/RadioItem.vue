<template>
  <div class="item-wrap"
    :class="{'std-radio-active': isActive }"
    @click="change"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RadioItem',
  props: {
    label: [Number, String]
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.$parent.$on('radio-change-bar', key => {
      this.isActive = this.label === key
    })
  },
  methods: {
    change () {
      this.$parent.$emit('radio-change-item', this.label)
    }
  }

}
</script>

<style scoped>
.item-wrap {
  flex: 1;
  cursor: pointer;
}
</style>