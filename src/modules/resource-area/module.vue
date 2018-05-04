<template>
  <div class="module">
    <p class="tip">
      切换 'e' 键，进入／退出模块划分模式，选取元素即可划分模块；按 'esc' 键清除当前框选
    </p>
    <ul>
      <li v-for="(item, idx) in modules"
        :key="item.id" :data-id="item.id"
        class="component-item"
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
          <div style="padding: 4px 14px 10px 14px;">
            <h1>{{item.name}}</h1>
            <p class="clearfix">
              <span class="title">{{item.developer}}</span>
              <i class="el-icon-delete" @click.stop="del(idx)"></i>
              <router-link :to="{name: 'Preview'}">
                <i class="el-icon-search"></i>
              </router-link>
              <i class="el-icon-edit" @click.stop="onClick(idx, item.id)"></i>
            </p>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { treeTravel } from '@/utils/transformTree'
import Config from '@/utils/config'
export default {
  name: 'Module',
  computed: {
    ...mapGetters({
      modules: 'modules'
    })
  },
  methods: {
    onClick (i) {
      this.$store.dispatch('changeCurrent', i)
    },
    del (i, id) {
      this.axios.get(`${Config.URL}/editor/page/removeMod`, {
        params: id
      }).then(data => {
        if (data !== 1000) {
          this.$message({type: 'success', message: '成功删除该模块'})
          this.$store.commit('delMod', i)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .module {
    background: #fff;
    padding: 15px;
    color: #555;
    width: 240px;
  }
  .tip {
    font-size: 12px;
    background: #F6F7F8;
    color: #5b6b73;
    padding: 5px;
    margin-bottom: 15px;
  }
  h1 {
    font-size: 16px;
    color: #4a4a4a;
    font-weight: bold;
  }
  .title {
    float: left;
    font-size: 14px;
  }

  strong {
    margin-right: 5px;
  }

  i {
    padding: 0;
    color: #666;
    cursor: pointer;
    float: right;
  }
  .el-icon-delete {
    margin-left: 5px;
  }
  .el-icon-search {
    margin-left: 5px;
  }

  .image {
    width: 210px;
    display: block;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    background-image: url('../../assets/none.png');
    background-size: cover;
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
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
