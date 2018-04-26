<template>
  <div class="home">
    <header>
      <h2>
        <i class="iconfont icon-design"></i>
        H5 Editor
      </h2>
      <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入你想要找的内容"
        v-model="keyword"
        class="search-input"
        @keyup.enter.native="keywordChange"
      />
      <div class="right">
        <radio-bar v-model="select" class="select-bar">
          <radio-item label="project" class="select-item">项目</radio-item>
          <radio-item label="templ" class="select-item">模版</radio-item>
          <radio-item label="comp" class="select-item">组件</radio-item>
        </radio-bar>
        <router-link :to="{name: 'Me'}">
          <div class="avatar"></div>
        </router-link>
      </div>
    </header>

    <div class="search-box">
      <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入你想要找的内容"
        v-model="keyword"
        class="search-input"
        @keyup.enter.native="keywordChange"
      />
    </div>

    <home-select :type="select" @search-params="paramsChange" />

    <main>

      <el-row :gutter="40" class="project-list" v-if="select === 'project'">
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1">
          <project-add @after-add="afterAdd" :page="search.page"></project-add>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <project-card :project="item"></project-card>
        </el-col>
      </el-row>

      <el-row :gutter="40" class="project-list" v-if="select === 'templ'">
        <!-- <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1">
          <templ-add @after-add="afterAdd" :page="search.page"></templ-add>
        </el-col> -->
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <templ-card :templ="item"></templ-card>
        </el-col>
      </el-row>

      <el-row :gutter="40" class="project-list" v-if="select === 'comp'">
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1">
          <comp-add @after-add="afterAdd" :page="search.page"></comp-add>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
          v-for="item in list"
          :key="item.id"
        >
          <comp-card :comp="item"></comp-card>
        </el-col>
      </el-row>


      <el-row type="flex" justify="end" class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="11"
          @current-change="pageChange">
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
import TemplCard from '@/components/TemplCard'
import CompCard from '@/components/CompCard'
import * as Add from '@/components/add'
import Config from '@/utils/config'
import HomeSelect from '@/components/HomeSelect'
import { RadioBar, RadioItem } from '@/components/radio'

export default {
  name: 'Home',
  data () {
    return {
      search: {
        keyword: '',
        sort: 'created',
        tag: '全部',
        page: 1
      },
      keyword: '',
      select: 'project',
      list: [],
      total: 1
    }
  },
  mounted () {
    this.getList()
    this.$el.addEventListener('scroll', e => {
      if (this.$el.scrollTop < 186) {
        this.$el.classList.remove('search-fixed')
      } else {
        this.$el.classList.add('search-fixed')
      }
      if (this.$el.scrollTop < 290) {
        this.$el.classList.remove('select-fixed')
      } else {
        this.$el.classList.add('select-fixed')
      }
    }, false)
  },
  components: {
    EditArea,
    ResourceArea,
    AttrArea,
    ProjectCard,
    ...Add,
    PageCard,
    ModuleCard,
    TemplCard,
    CompCard,
    HomeSelect,
    RadioBar,
    RadioItem
  },
  watch: {
    search: {
      handler () {
        this.getList()
      },
      deep: true
    },
    select () {
      this.keyword = ''
      this.search.keyword = ''
      this.getList()
    }
  },
  methods: {
    // 搜索条件change后
    paramsChange ({tag, sort}) {
      this.search.tag = tag
      this.search.sort = sort
    },
    pageChange (page) {
      this.search.page = page || 1
    },
    keywordChange () {
      const keyword = this.keyword.trim()
      // if (keyword && keyword.charCodeAt() !== 39) {
      this.search.keyword = keyword
      // }
    },
    getList () {
      this.axios.get(`${Config.URL}/editor/search/${this.select}s`, {
        params: this.search
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
    background: $lightBg;
  }
  main {
    height: 100%;
    margin: 0 auto;
    margin-top: 60px;
    max-width: 1200px;
    width: 80%;
  }
  .project-list {
    width: 100%;
    margin: 0 !important;
  }
  .search-box {
    background: url('../assets/bg-1.svg');
    height: 350px;
    padding-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .search-input {
    width: 35%;
  }
  .pagination {
    margin: 40px 0 100px 0;
  }

  // 头部区域

  header {
    width: 100vw;
    height: 60px;
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #FFF;
    background: transparent;
    .search-input {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%, -50%);
    }
  }
  .avatar {
    background: url('../assets/2.jpg');
    background-size: cover;
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
  .right {
    display: flex;
  }
  .select-bar {
    width: 240px !important;
  }
  .select-item {
    color: #999;
    font-weight: bold;
  }
</style>

<style lang="scss">
.home {
  .el-col {
    margin-bottom: 40px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .el-input--prefix .el-input__inner {
    background: transparent;
    border-radius: 30px;
  }
}
header {
  .el-input--prefix .el-input__inner {
    border: none;
    background: #f2f2f2 !important;
    width: 50%;
    border-radius: 4px;
    height: 30px;
  }
  .el-input__icon {
    height: 30px;
    line-height: 32px;
  }
}

.search-fixed {
  header {
    background: #000;
    .search-input {
      opacity: 1;
    }
  }
}

.select-fixed {
  .home-select {
    position: fixed;
    top: 60px;
    z-index: 999;
  }
  main { 
    margin-top: 110px;
  }
}

.std-radio-active {
  color: #fff !important;
}
</style>
