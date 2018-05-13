<template>
  <div class="resource-area">
    <el-tabs tab-position="left" class="tab-wrap" type="border-card" v-model="tabActive">
      <el-tab-pane>
        <template slot="label">
          <span>元件</span>
        </template>
        <p><span>通用元件</span></p>
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
        <p><span>布局组件</span></p>
        <draggable
          class="components-box"
          element="ul"
          :options="{group:{name:'resource1',pull:'clone',put:false}}"
          @end="onCompEnd"
        >
          <li class="component-item" v-for="item in baseComps.slice(9,11)" :key="item.id" :data-id="item.type">
            <i :class="'iconfont icon-' + item.icon"></i><span>{{item.name}}</span>
          </li>
        </draggable>
        <p><span>基础组件</span></p>
        <draggable
          class="components-box"
          element="ul"
          :options="{group:{name:'resource1',pull:'clone',put:false}}"
          @end="onCompEnd"
        >
          <li class="component-item" v-for="item in baseComps.slice(0,9)" :key="item.id" :data-id="item.type">
            <i :class="'iconfont icon-' + item.icon"></i><span>{{item.name}}</span>
          </li>
        </draggable>
      </el-tab-pane>

      <el-tab-pane>
        <template slot="label">
          <span>组件</span>
        </template>
        <comp></comp>
      </el-tab-pane>

      <el-tab-pane>
        <template slot="label">
          <span>模版</span>
        </template>
        <templ></templ>
      </el-tab-pane>

      <el-tab-pane>
        <template slot="label">
          <span>模块</span>
        </template>
        <module></module>
      </el-tab-pane>

      <el-tab-pane>
        <template slot="label">
          <span>图片</span>
        </template>
        <image-resource></image-resource>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { components, layouts } from './type'
import BaseComps from './components.json'
import Templ from './templ'
import Comp from './comp'
import Module from './module'
import ImageResource from './images'
import draggable from 'vuedraggable'

export default {
  name: 'ResourceArea',
  data () {
    return {
      components: components,
      layouts: layouts,
      tabActive: '0',
      baseComps: BaseComps
    }
  },
  components: {
    draggable,
    Comp,
    Templ,
    Module,
    ImageResource
  },
  methods: {
    onEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid || 'root'
      const p = document.getElementById('page')
      const el = p.getElementsByClassName('component-item')[0]
      el && el.remove()
      // 如果拖入的目的地是flexbox组件，则index有变化
      let idx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      console.log('[Edit]', `${pid}的${idx}新增通用元件${obj.item.dataset.id}`)
      this.$store.dispatch('addEle', {
        type: obj.item.dataset.id,
        pid: pid,
        idx
      })
    },
    onCompEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid || 'root'
      const p = document.getElementById('page')
      const el = p.getElementsByClassName('component-item')[0]
      el && el.remove()
      // 如果拖入的目的地是flexbox组件，则index有变化
      let idx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      console.log('[Edit]', `${pid}的${idx}新增基础组件${obj.item.dataset.id}`)
      const index = BaseComps.findIndex(d => d.type === obj.item.dataset.id)
      // const idx = this.obj.to.classList.indexOf('col-container') > -1 ? this.obj.to.
      this.$store.dispatch('addEle', {
        type: obj.item.dataset.id,
        pid: pid,
        idx,
        style: BaseComps[index].style,
        compConfig: BaseComps[index].config
      })
    }
  }
}
</script>

<style scoped lang="scss">
.resource-area {
  overflow: hidden;
  height: 100%;
}
.components-box {
  flex-wrap: wrap;
  width: 240px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
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
.tab-wrap {
  height: 100%;
  // position: absolute;

}
p {
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  color: #5b6b73;
  height: 39px;
  line-height: 39px;
  padding: 0 5px;
  span {
    background: #F6F7F8;
    padding: 5px;
  }
}
</style>

<style lang="scss">
.el-collapse-item__content {
  padding: 0px !important;
  border: none !important;
}
/* .el-collapse-item__header {
  background: #FD7F6B !important;
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
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0;
  }
}
</style>
