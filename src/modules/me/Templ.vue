<template>
  <div class="project-join">
    <el-row :gutter="30" class="project-list">
      <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
        v-for="item in list"
        :key="item.id"
      >
        <templ-card :templ="item"></templ-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TemplCard from '@/components/TemplCard'

export default {
  name: 'Templ',
  props: {
    list: Array
  },
  components: {
    TemplCard
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

<style scoped>
/* --- card css --- */
.title {
  font-size: 14px;
  color: #555;
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
.el-icon-edit {
  margin-right: 10px;
}

.image {
  width: 100%;
  display: block;
  height: 150px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  background-image: url('/static/avatar.jpeg');
}
/* ---- card css --- */
</style>

