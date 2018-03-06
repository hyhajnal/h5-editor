<template>
  <div class="head-area">
    <h1>活动中心页面</h1>
    <menu-bar></menu-bar>
    <tool-bar></tool-bar>
  </div>
</template>

<script>
import ToolBar from './tool-bar'
import MenuBar from './menu-bar'

export default {
  name: 'HeadArea',
  data () {
    return {}
  },
  components: {
    ToolBar,
    MenuBar
  }
}
</script>

<style scoped lang="scss">
  .head-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #555;
  }
  h1 {
    font-size: 20px;
    font-weight: normal;
  }
</style>