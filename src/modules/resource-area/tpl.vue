<template>
  <div class="tpl">
    <!-- <ul style="padding: 15px;"> -->
    <draggable
      element="ul"
      :options="{group:{name:'resource1',pull:'clone',put:false}}"
      @end="onEnd"
    >
      <li v-for="item in components" :key="item.id" :data-id="item.id" class="component-item">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.image" class="image">
          <div style="padding: 4px 14px 14px 14px;">
            <div class="bottom clearfix">
              <span class="title">{{item.name}}-{{item.id}}</span>
              <!-- <el-button type="text" class="button">编辑</el-button> -->
              <i class="el-icon-search"></i>
              <i class="el-icon-edit"></i>
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
import draggable from 'vuedraggable'
export default {
  name: 'Tpl',
  data () {
    return {
      currentDate: new Date()
    }
  },
  components: {draggable},
  computed: {
    ...mapGetters({
      components: 'components'
    })
  },
  methods: {
    onEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid || 'root'
      const p = document.getElementById('page')
      const el = p.getElementsByClassName('component-item')[0]
      el && el.remove()
      console.log(`${pid}的${obj.newIndex}新增元素${obj.item.dataset.id}`)
      this.$store.dispatch('addComp', {
        type: obj.item.dataset.id,
        pid: pid,
        idx: obj.newIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    padding: 15px;
  }
  .components-box {
    cursor: move;
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
