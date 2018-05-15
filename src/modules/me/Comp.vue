<template>
  <div class="project-join">
    <el-row :gutter="30" class="project-list">
      <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
        v-for="item in list"
        :key="item.id"
      >
        <comp-card :comp="item"></comp-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CompCard from '@/components/CompCard'

export default {
  name: 'Comp',
  props: {
    list: Array
  },
  components: { CompCard }
}
</script>

<style lang="scss">
.project-join {
  .el-col {
    margin-bottom: 30px;
  }
}
</style>

<style scoped>
.title {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

i {
  padding: 0;
  float: right;
  color: #666;
}
.el-icon-error {
  margin-right: 10px;
}
</style>

