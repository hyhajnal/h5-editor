<template>
  <div class="home">
    <header><head-area></head-area></header>
    <main>
      <el-row type="flex" justify="center" class="search-box">
        <el-input
          placeholder="请输入内容"
          class="search-input"
          v-model="input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-row>
      <el-row :gutter="20" class="project-list">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1" v-for="i in 20" :key="i" >
          <project-card></project-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import HeadArea from '@/modules/head-area'
import EditArea from '@/modules/edit-area'
import ResourceArea from '@/modules/resource-area'
import AttrArea from '@/modules/attr-area'
import ProjectCard from '@/components/ProjectCard'

export default {
  name: 'Home',
  data () {
    return {
      input: ''
    }
  },
  mounted () {},
  components: {
    HeadArea,
    EditArea,
    ResourceArea,
    AttrArea,
    ProjectCard
  }
}
</script>

<style scoped>
  .home {
    height: 100vh;
    overflow: auto;
    background: #090822;
  }
  header {
    height: 60px;
    background: #FD7F6B;
    transition: all .5s;
  }
  main {
    height: 100%;
    padding-top: 60px;
    margin: 0 auto;
    max-width: 1200px;
  }
  .project-list {
    width: 100%;
    padding: 20px 10px;
    margin: 0 !important;
  }
  .search-input {
    width: 70%;
  }
  .search-box {
    padding: 0 20px;
    margin-bottom: 60px;
  }
</style>

<style lang="scss">
.home {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
