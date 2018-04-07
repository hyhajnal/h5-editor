<template>
  <div class="tpl">
    <ul style="padding: 15px;">
      <li v-for="(item, idx) in modules"
        :key="item.id" :data-id="item.id"
        class="component-item"
        @click="onClick(idx)"
      >
        <el-card :body-style="{ padding: '0px' }">
          <!-- <img :src="item.image" class="image"> -->
          <div class="image">
            <div class="component-preview">
              <!-- <custom-element
                v-for="el in item.content.children"
                :key="el.id"
                :element="el"
              /> -->
            </div>
          </div>
          <div style="padding: 4px 14px 14px 14px;">
            <div class="bottom clearfix">
              <span class="title">{{item.name}}——{{item.developer}}</span>
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
import { mapGetters } from 'vuex'
// import { treeTravel } from '@/utils/transformTree'
export default {
  name: 'Module',
  data () {
    return {
      currentDate: new Date()
    }
  },
  computed: {
    ...mapGetters({
      modules: 'modules'
    })
  },
  methods: {
    onClick (i) {
      this.$store.dispatch('changeCurrent', i)
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    padding: 15px;
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
    width: 210px;
    display: block;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    background-image: url('../../assets/2.jpg');
  }
  .component-preview {
    transform: scale(0.6);
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
    cursor: pointer;
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
