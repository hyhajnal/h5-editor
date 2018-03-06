<template>
  <ul>
    <li>
      <i class="iconfont icon-fontsize"></i>
      <span>字号</span>
    </li>
    <li>
      <i class="iconfont icon-reverse"></i>
      <span>撤销</span>
    </li>
    <li>
      <i class="el-icon-zoom-in"></i>
      <span>放大</span>
    </li>
    <li>
      <i class="el-icon-zoom-out"></i>
      <span>缩小</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuBar',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  ul {
    height: 60px;
    display: flex;
    align-items: center;
  }
  li {
    text-align: center;
    width: 60px;
    span {
      font-size: 13px;
      margin-top: 5px;
      display: block;
    }
  }
  i {
    display: block;
    font-size: 18px;
  }
</style>