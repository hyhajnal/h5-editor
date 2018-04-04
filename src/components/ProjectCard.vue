<template>
  <div class="card" @click="goDetail" v-if="project">
    <figure class="card-image">
      <!-- <el-row class="shadow" type="flex" justify="space-around" align="middle">
        <i class="el-icon-circle-plus"></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-menu" @click.stop="open"></i>
      </el-row> -->
    </figure>
    <section class="card-body">
      <h3 class="title">{{project.name}}</h3>
      <el-row type="flex" justify="space-between" align="middle">
        <el-row type="flex" justify="space-between" align="middle" class="owner">
          <img src="../assets/2.jpg" alt="avatar" width="20" height="20">
          <span>发布者</span>
        </el-row>
        <div class="social-bar">
          <span><i class="iconfont icon-eye"></i>{{project.visitCount}}</span>
          <span><i class="iconfont icon-like"></i>{{project.useCount}}</span>
          <span><i class="iconfont icon-favor"></i>{{project.collectCount}}</span>
        </div>
      </el-row>
    </section>
    <span class="tag">项目</span>

    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible"
      width="30%"
      @close.stop="close">
      <span>这是一段信息</span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    project: Object
  },
  methods: {
    goDetail () {
      // this.$store.dispatch('changeCurrent', this.mod)
      this.$router.push({name: 'ProjectDetail', query: {id: this.project.id}})
    },
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
      // e.stopPropagation()
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 270px;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
}
.card-image {
  background-image: url('../assets/project.jpg');
  height: 200px;
  background-size: cover;
  position: relative;
}
.title {
  text-align: center;
}
.shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);
  z-index: 100;
  position: absolute;
  display: none;
  i {
    color: #fff;
    font-size: 42px;
  }
}
.card-image:hover {
  .shadow {
    display: flex;
  }
}
.card-body {
  padding: 10px;
  // border: 1px solid #ddd;
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
  i {
    margin-right: 2px;
  }
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
