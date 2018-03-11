<template>
  <div class="resource-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="iconfont icon-component"></i><span>组件</span>
        </template>
        <draggable
          v-model="components"
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
    </el-collapse>
  </div>
</template>

<script>
import { components, layouts } from './type'
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
  components: {draggable},
  methods: {
    onEnd (obj) {
      console.log(`${obj.to.children[0].dataset.pid}的${obj.newIndex}新增元素${obj.item.dataset.id}`)
      this.$store.commit('addEle', {
        type: obj.item.dataset.id,
        pid: obj.to.children[0].dataset.pid,
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
</style>
