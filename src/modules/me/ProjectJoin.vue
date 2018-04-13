<template>
  <div class="project-join">
    <el-row :gutter="20" class="project-list">
      <!-- <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1">
        <add-card :type="select" @after-add="afterAdd" :page="page"></add-card>
      </el-col> -->
      <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="1"
        v-for="i in 10"
        :key="i"
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
    margin-bottom: 20px;
  }
}
</style>
