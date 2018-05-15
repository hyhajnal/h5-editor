<template>
  <div class="project-join">
    <el-row :gutter="30" class="project-list">
      <!-- <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
        <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
      </el-col> -->
      <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
        v-for="item in list"
        :key="item.id"
      >
        <project-card :project="item"></project-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard'
export default {
  name: 'ProjectJoin',
  props: {
    list: Array
  },
  data () {
    return {
      item: {
        name: '测试项目',
        id: 'ksncks'
      }
    }
  },
  components: {
    ProjectCard
  }
}
</script>

<style lang="scss">
.project-join {
  .el-col {
    margin-bottom: 30px;
  }
}
</style>
