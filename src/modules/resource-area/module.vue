<template>
  <div class="tpl">
    <ul style="padding: 15px;">
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
              <i class="el-icon-edit" @click="onClick(idx)"></i>
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
    },
    del (i) {
      this.$store.commit('delMod', i)
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    padding: 15px;
  }
  h1 {
    font-size: 16px;
    color: #555;
  }
  .title {
    font-size: 14px;
    color: #555;
    float: left;
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
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
