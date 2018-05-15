<template>
  <div class="project-join">
    <el-row :gutter="30" class="project-list">
      <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
        v-for="item in list"
        :key="item.id"
      >
        <module-card :mod="item"></module-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
export default {
  name: 'Mod',
  props: {
    list: Array
  },
  components: {
    ModuleCard
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
