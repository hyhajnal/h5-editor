<template>
  <div class="home">
    <header>
      <head-area></head-area>
    </header>
    <main>
      <!-- <el-row type="flex" justify="center" class="search-box">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="search"
          class="search-input"
        >
        </el-input>
      </el-row> -->

      <el-row :gutter="20" class="project-list">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
          <add-card type="page" @after-add="afterAdd" :page="page"></add-card>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <page-card :page="item"></page-card>
        </el-col>
      </el-row>

      <el-row type="flex" justify="end" class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="11"
          @current-change="getModules">
        </el-pagination>
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
import PageCard from '@/components/PageCard'
import ModuleCard from '@/components/ModuleCard'
import AddCard from '@/components/AddCard'
import Config from '@/utils/config'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      list: [],
      total: 1,
      page: 1
    }
  },
  mounted () {
    this.getModules()
  },
  components: {
    HeadArea,
    EditArea,
    ResourceArea,
    AttrArea,
    ProjectCard,
    AddCard,
    PageCard,
    ModuleCard
  },
  watch: {
    select () {
      this.getModules()
    }
  },
  methods: {
    getModules (page) {
      this.page = page
      this.axios.get(`${Config.URL}/editor/search/pages`, {
        params: { page: page || 1 }
      }).then(data => {
        this.list = data.list
        this.total = data.total
      })
    },
    afterAdd ({ list, total }) {
      this.list = list
      this.total = total
    }
  }
}
</script>

<style scoped>
  header {
    background: #FD7F6B;
  }
  .home {
    height: 100vh;
    overflow: auto;
    background: #f2f2f2;
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
    width: 50%;
  }
  .search-box {
    padding: 0 20px;
    margin: 100px 0;
  }
  .type-box {
    /* width: 40%; */
  }
  .pagination {
    margin: 40px 0 100px 0;
  }
</style>

<style lang="scss">
.home {
  .el-col {
    margin-bottom: 20px;
  }
   .el-select .el-input {
    width: 130px;
  }
}
</style>
