<template>
  <div class="home">
    <!-- <header><head-area></head-area></header> -->
    <main>
      <el-row type="flex" justify="center" class="search-box">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="search"
          class="search-input"
        >
          <el-select v-model="select" slot="append" placeholder="请选择">
            <el-option label="模块库" value="module"></el-option>
            <el-option label="项目库" value="project"></el-option>
          </el-select>
        </el-input>
      </el-row>
      <el-row :gutter="20" class="project-list">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
          <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1"
          v-for="item in modules"
          :key="item.id"
        >
          <!-- <router-link :to="{name: 'Edit'}"> -->
            <project-card :mod="item"></project-card>
          <!-- </router-link> -->
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
import AddCard from '@/components/AddCard'
import Config from '@/utils/config'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      select: 'module',
      modules: [],
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
    AddCard
  },
  methods: {
    getModules (page) {
      this.page = page
      this.axios.get(`${Config.URL}/editor/search/modules`, {
        params: { page: page || 1 }
      }).then(data => {
        this.modules = data.list
        this.total = data.total
      })
    },
    afterAdd ({ list, total }) {
      this.modules = list
      this.total = total
    }
  }
}
</script>

<style scoped>
  .home {
    height: 100vh;
    overflow: auto;
    background: linear-gradient(#090822, #fff);
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
