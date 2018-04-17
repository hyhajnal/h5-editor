<template>
  <ul class="info">
    <li>
      <span class="label">页面名:</span>
      <span class="value">
        <input type="text" v-model="info.name">
      </span>
    </li>
    <li>
      <span class="label">设计师:</span>
      <span class="value">
        <input type="text" v-model="info.owner">
      </span>
    </li>
    <li>
      <span class="label">背景色:</span>
      <span class="value background">
        <color-picker v-model="info.background" />
      </span>
    </li>
  </ul>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
export default {
  name: 'Info',
  data () {
    return {
      info: {
        name: '测试页面',
        background: '#fff',
        owner: 'desinger1'
      }
    }
  },
  watch: {
    info: {
      handler () {
        this.$store.commit('changeInfo', this.info)
      },
      deep: true
    }
  },
  components: { ColorPicker }
}
</script>

<style scoped lang="scss">
.info {
  padding: 10px 20px;
  font-size: 14px;
  color: #555;
  height: 100vh;
}
li {
  margin-bottom: 15px;
}
.label {
  width: 60px;
  display: inline-block;
}
.value {
  background: #F6F7F8;
  border-radius: 2px;
  display: inline-block;
  padding: 4px 10px;
}
.background {
  background: #fff;
  padding: 4px 0;
}
input {
  border: none;
  background: #F6F7F8;
  color: #5b6b73;
}
</style>
