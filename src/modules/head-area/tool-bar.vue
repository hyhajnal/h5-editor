<template>
  <div class="tool-bar">
    <ul>
      <li>
        <i class="iconfont icon-save"></i>
        <span>保存</span>
      </li>
      <li>
        <i class="iconfont icon-preview"></i>
        <span>预览</span>
      </li>
    </ul>
    <div
      class="avatar"
      :style="{ backgroundImage: 'url('+avatar+')' }"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      avatar: 'http://img.zcool.cn/community/013eed5a7fdd56a8012045b3640463.jpeg@520w_390h_1c_1e_1o_100sh.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool-bar {
    display: flex;
    align-items: center;
  }
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
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-size: cover;
    margin-left: 40px;
  }
</style>