<template>
  <div class="card">
    <figure class="card-image"></figure>
    <section class="card-body">
      <h3 class="title">模块名</h3>
      <el-row type="flex" justify="space-between" align="middle">
        <el-row type="flex" justify="space-between" align="middle" class="owner">
          <img src="../assets/2.jpg" alt="avatar" width="20" height="20">
          <span>发布者</span>
        </el-row>
        <div class="social-bar">
          <span><i class="iconfont icon-eye"></i>153</span>
          <span><i class="iconfont icon-like"></i>153</span>
          <span><i class="iconfont icon-favor"></i>153</span>
        </div>
      </el-row>
    </section>
    <span class="tag">分类</span>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.card-image {
  background-image: url('../assets/avatar.jpg');
  height: 200px;
  background-size: cover;
}
.card-body {
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
}
.owner {
  img {
    border-radius: 100%;
    margin-right: 5px;
  }
  span {
    font-size: 13px;
  }
}
.social-bar {
  font-size: 13px;
  color: #555;
  margin-top: 5px;
  span {
    margin-right: 4px;
  }
  margin-right: -4px;
}
.tag {
  position: absolute;
  top: 20px;
  right: 0;
  background: #4ED7EC;
  color: #fff;
  font-size: 13px;
  padding: 2px 10px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-right: -2px;
}
</style>
