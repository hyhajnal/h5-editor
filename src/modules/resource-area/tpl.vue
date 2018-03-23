<template>
  <div class="tpl">
    <ul style="padding: 15px;">
      <li v-for="i in 10" :key="i">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="padding: 4px 14px 14px 14px;">
            <div class="bottom clearfix">
              <span class="title">compo-{{i}}</span>
              <!-- <el-button type="text" class="button">编辑</el-button> -->
              <i class="el-icon-search"></i>
              <i class="el-icon-edit"></i>
              <!-- <el-button type="text" class="button">预览</el-button> -->
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tpl',
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
  }
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
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  li {
    margin-bottom: 15px;
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
