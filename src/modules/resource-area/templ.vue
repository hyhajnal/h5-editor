<template>
  <div class="tpl">
    <!-- <ul style="padding: 15px;"> -->
    <p class="tip">
      按
      <router-link :to="{name: 'Home', params: {type: 'templ'}}">
        <i class="el-icon-circle-plus-outline"></i>
      </router-link>
      从资源库中选取需要的模版
    </p>
    <draggable
      element="ul"
      :options="{group:{name:'resource1',pull:'clone',put:false}}"
      @end="onEnd"
    >
      <li v-for="(item, idx) in templs" :key="item.id" :data-id="item.id" class="component-item">
        <el-card :body-style="{ padding: '0px' }">
          <!-- <img :src="item.image" class="image"> -->
          <div class="image">
            <div class="component-preview">
              <custom-element
                v-for="el in item.elements"
                :key="el.id"
                :element="el"
              />
            </div>
          </div>
          <div style="padding: 4px 14px 14px 14px;">
            <div class="bottom clearfix">
              <span class="title">{{item.name}}-{{item.id}}</span>
              <!-- <el-button type="text" class="button">编辑</el-button> -->
              <i class="el-icon-search"></i>
              <i class="el-icon-circle-close-outline" @click.stop="del(idx, item.resourceId)"></i>
              <!-- <el-button type="text" class="button">预览</el-button> -->
            </div>
          </div>
        </el-card>
      </li>
    <!-- </ul> -->
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomElement from '@/modules/preview-area/custom-element'
import draggable from 'vuedraggable'
import Config from '@/utils/config'
export default {
  name: 'Templ',
  data () {
    return {
      currentDate: new Date()
    }
  },
  components: {
    draggable,
    CustomElement
  },
  computed: {
    ...mapGetters({
      templs: 'templs'
    })
  },
  methods: {
    onEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid || 'root'
      const p = document.getElementById('page')
      const el = p.getElementsByClassName('component-item')[0]
      el && el.remove()
      let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      console.log('[Edit]', `${pid}的${nIdx}新增组件${obj.item.dataset.id}`)
      this.$store.dispatch('addTempl', {
        type: obj.item.dataset.id,
        pid: pid,
        idx: nIdx
      })
    },
    del (i, id) {
      this.axios.get(`${Config.URL}/editor/page/removeResource`, {
        params: {
          pageId: this.$store.state.info.id,
          resourceId: id,
          type: 2}
      }).then(data => {
        if (data !== 1000) {
          this.$message({type: 'success', message: '成功移除该模版'})
          this.$store.commit('delTempl', i)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    padding: 15px;
    width: 240px;
  }
  .tip {
    font-size: 12px;
    background: #F6F7F8;
    color: #5b6b73;
    padding: 5px;
    margin-bottom: 15px;
  }
  .title {
    font-size: 14px;
    color: #555;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 210px;
    display: block;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
    cursor: move;
  }
  .component-preview {
    transform: scale(0.6);
    // position: absolute;
    // top: 0;
    // left: 0;
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
    i {
      padding: 0;
      float: right;
      color: #666;
      cursor: pointer;
    }
    .el-icon-search {
      margin-left: 10px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
