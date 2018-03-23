<template>
  <div class="resource-area">
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="iconfont icon-component"></i><span>组件</span>
        </template>
        <draggable
          class="components-box"
          element="ul"
          :options="{group:{name:'resource1',pull:'clone',put:false}}"
          @end="onEnd"
        >
          <li class="component-item" v-for="item in components" :key="item.label" :data-id="item.value">
            <i :class="'iconfont icon-' + item.icon"></i><span>{{item.label}}</span>
          </li>
        </draggable>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="iconfont icon-layout"></i><span>布局</span>
        </template>
        <draggable
          v-model="layouts"
          class="components-box"
          element="ul"
          :options="{group:{name:'resource2',pull:'clone',put:false}}"
          @end="onEnd"
        >
          <li class="component-item" v-for="item in layouts" :key="item.label" :data-id="item.value">
            <i :class="'iconfont icon-' + item.icon"></i><span>{{item.label}}</span>
          </li>
        </draggable>
      </el-collapse-item>
    </el-collapse> -->
    <el-tabs tab-position="left" style="height: 100vh;" type="border-card">
      <el-tab-pane>
        <template slot="label">
          <span>元件</span>
        </template>
        <draggable
          class="components-box"
          element="ul"
          :options="{group:{name:'resource1',pull:'clone',put:false}}"
          @end="onEnd"
        >
          <li class="component-item" v-for="item in components" :key="item.label" :data-id="item.value">
            <i :class="'iconfont icon-' + item.icon"></i><span>{{item.label}}</span>
          </li>
        </draggable>
      </el-tab-pane>

      <el-tab-pane>
        <template slot="label">
          <span>组件</span>
        </template>
        <tpl></tpl>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { components, layouts } from './type'
import Tpl from './tpl'
import draggable from 'vuedraggable'

export default {
  name: 'ResourceArea',
  data () {
    return {
      activeNames: ['1', '2'],
      components: components,
      layouts: layouts
    }
  },
  components: {
    draggable,
    Tpl
  },
  methods: {
    onEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid
      const p = document.getElementById('page')
      p.getElementsByClassName('component-item')[0].remove()
      console.log(`${pid}的${obj.newIndex}新增元素${obj.item.dataset.id}`)
      this.$store.dispatch('addEle', {
        type: obj.item.dataset.id,
        pid: pid,
        idx: obj.newIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
.resource-area {
  overflow-y: auto;
  overflow-x: hidden;
}
.components-box {
  flex-wrap: wrap;
  width: 240px;
  display: flex;
  justify-content: flex-start;
}
.component-item {
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 80px;
  width: 80px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: move;
  span {
    font-size: 13px;
    margin-top: 5px;
    display: block;
  }
  i {
    display: block;
    font-size: 18px;
  }
}
.component-item:nth-child(3n) {
  border-right: none;
}
.icon-component {
  margin-right: 2px;
}
</style>

<style lang="scss">
.el-collapse-item__content {
  padding: 0px !important;
  border: none !important;
}
/* .el-collapse-item__header {
  background: #FED030 !important;
  color: #555;
} */
.el-collapse-item__header.is-active {
  border-bottom-color: #ddd;
}
.el-collapse-item__header {
  i {
    margin: 0 5px 0 15px;
  }
}
.resource-area .el-tabs__item {
  width: 80px !important;
}
.resource-area {
  .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }
  .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0;
  }
}
</style>
