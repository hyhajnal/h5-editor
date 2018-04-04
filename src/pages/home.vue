<template>
  <div class="home unfixed">
    <header>
      <h2>
        <i class="iconfont icon-design"></i>
        H5 Editor
      </h2>
      <el-row type="flex" justify="center" class="search-box">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="search"
          class="search-input"
        >
          <!-- <el-select v-model="select" slot="append" placeholder="请选择">
            <el-option label="模块库" value="module"></el-option>
            <el-option label="项目库" value="project"></el-option>
            <el-option label="页面库" value="page"></el-option>
          </el-select> -->
        </el-input>
      </el-row>
      <div class="avatar"></div>
    </header>
    <el-row type="flex" justify="center" class="search-box-bottom">
      <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入内容"
        v-model="search"
        class="search-input"
      >
        <el-select v-model="select" slot="append" placeholder="请选择">
          <!-- <el-option label="模块库" value="module"></el-option> -->
          <el-option label="项目库" value="project"></el-option>
          <el-option label="页面库" value="page"></el-option>
        </el-select>
      </el-input>
    </el-row>
    <main>
      <!-- <el-row type="flex" justify="center" class="search-box">
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="search"
          class="search-input"
        >
          <el-select v-model="select" slot="append" placeholder="请选择">
            <el-option label="模块库" value="module"></el-option>
            <el-option label="项目库" value="project"></el-option>
            <el-option label="页面库" value="page"></el-option>
          </el-select>
        </el-input>
      </el-row> -->

      <el-row :gutter="20" class="project-list" v-if="select === 'project'">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
          <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <project-card :project="item"></project-card>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="20" class="project-list" v-if="select === 'module'">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
          <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <module-card :mod="item"></module-card>
        </el-col>
      </el-row> -->

      <el-row :gutter="20" class="project-list" v-if="select === 'page'">
        <!-- <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
          <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
        </el-col> -->
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
          @current-change="getList">
        </el-pagination>
      </el-row>

    </main>
  </div>
</template>

<script>
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
      select: 'project',
      list: [],
      total: 1,
      page: 1
    }
  },
  mounted () {
    this.getList()
    this.$el.addEventListener('scroll', e => {
      if (this.$el.scrollTop < 200) {
        this.$el.classList = 'home unfixed'
      } else {
        this.$el.classList = 'home fixed'
      }
    }, false)
  },
  // destroyed () {
  //   this.$el.addEventListener('scroll')
  // },
  components: {
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
      this.getList()
    }
  },
  methods: {
    getList (page) {
      this.page = page || 1
      this.axios.get(`${Config.URL}/editor/search/${this.select}s`, {
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

<style scoped lang="scss">
  .home {
    height: 100vh;
    overflow: auto;
    background: #f2f2f2;
    // background: url(https://www.brainpickings.org/wp-content/themes/brainpickings/images/bckgd_body.png);
  }
  main {
    height: 100%;
    // padding-top: 60px;
    margin: 0 auto;
    max-width: 1200px;
  }
  .project-list {
    width: 100%;
    padding: 20px 10px;
    margin: 0 !important;
  }
  .search-box {
    width: 600px;
  }
  .search-box-bottom {
    padding: 0 20px;
    margin: 200px 0 100px 0;
  }
  .search-input {
    width: 50%;
  }
  .pagination {
    margin: 40px 0 100px 0;
  }
  header {
    width: 100vw;
    height: 60px;
    background: #FD7F6B;
    transition: all .5s;
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #FFF;
    .el-input__inner {
      border: none;
    }
  }
  .avatar {
    border-radius: 100%;
    margin-left: 40px;
    background: url('../assets/2.jpg');
    background-size: cover;
    width: 40px;
    height: 40px;
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
.unfixed {
  header {
    opacity: 0;
  }
}
.fixed {
  header {
    opacity: 1;
  }
}
</style>
