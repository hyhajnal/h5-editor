<template>
  <div class="color-picker">
    <div class="color-show"
      :style="{background: colorVal }"
    >
      <i :class="[show ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" @click="show = !show" />
      <chrome-picker v-model="color" v-show="show" class="picker"/>
    </div>
  </div>
</template>

<script>
import { Chrome as ChromePicker } from 'vue-color'
export default {
  name: 'ColorPicker',
  props: {
    value: String
  },
  data () {
    return {
      show: false,
      color: this.value
    }
  },
  computed: {
    colorVal () {
      if (typeof (this.color) === 'string') {
        return this.color
      } else {
        return this.color.hex
      }
    }
  },
  watch: {
    value () {
      this.color = this.value
    },
    show () {
      this.$emit('input', this.colorVal)
    }
  },
  components: { ChromePicker }
}
</script>

<style scoped lang="scss">
.color-show {
  width: 17px;
  height: 17px;
  border: 1px solid #dbdde2;
  border-radius: 4px;
  position: relative;
}
.picker {
  position: absolute;
  z-index: 2000;
  top: 20px;
  left: 20px;
  transform: translateX(-50%);
}
</style>
