<template>
  <div class="project-join">
    <el-row :gutter="30" class="project-list">
      <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="1"
        v-for="i in 10"
        :key="i"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 4px 14px 14px 14px;">
            <div class="bottom clearfix">
              <p class="title">组件</p>
              <a href="#">van-button</a>
              <i class="el-icon-info"></i>
              <i class="el-icon-error"></i>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Comp',
  data () {
    return {
      item: {
        name: '测试项目',
        id: 'ksncks'
      }
    }
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

