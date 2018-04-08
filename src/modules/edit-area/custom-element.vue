<template>
  <component
    v-if="ready"
    :is="'type-'+element.type"
    :ele="element"
    :data-id="element.id"
    :data-pid="element.pid"
    @click.native.capture="changeActive"
    @click.native.right.prevent.stop="openMenu"
    v-clickoutside="closeMenu"
    class="element"
  >
    <custom-element
      v-for="item in element.children"
      :element="item"
      :key="item.id"
      v-if="element.children && element.children.length > 0"
    />
    <ul class="menu-box" v-if="menuShow">
      <li class="menu-item del" v-if="!isModuleEdit"
        @click.capture.stop="del">删除</li>
      <template v-if="!isModuleEdit">
        <!-- <li class="menu-item">id: {{element.id}}</li> -->
        <li class="menu-item">
          class:&nbsp;
          <el-input
            v-model="input"
            size="mini"
            class="input-class"
          />
        </li>
      </template>
    </ul>
  </component>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import _Type from './types'
import { mapGetters } from 'vuex'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {
      ready: false,
      menuShow: false,
      input: ''
    }
  },
  components: {..._Type, draggable},
  computed: {
    canReceive () {
      return this.$store.state.isDraging && this.element.type === 'div'
    },
    active () {
      const current = this.$store.state.current
      return current && current.id === this.element.id
    },
    ...mapGetters({
      isModuleEdit: 'isModuleEdit'
    })
  },
  mounted () {
    if (this.element.type.indexOf('van') > -1) {
      this.renderChild()
      this.ready = true
    } else {
      this.ready = true
    }
  },
  methods: {
    openMenu () {
      this.menuShow = true
    },
    closeMenu () {
      this.menuShow = false
    },
    del () {
      const { pid, id } = this.element
      this.$store.dispatch('delEle', { pid, id })
    },
    onEnd (obj) {
      const from = `${obj.item.dataset.pid}的${obj.oldIndex}`
      const to = `${obj.to.children[0].dataset.pid}的${obj.newIndex}`
      console.log('edit', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.dispatch('moveEle', {
        id: obj.item.dataset.id,
        oPid: obj.item.dataset.pid,
        nPid: obj.to.children[0].dataset.pid,
        nIdx: obj.newIndex,
        oIdx: obj.oldIndex
      })
    },
    changeActive () {
      this.$store.commit('changeCurrentEl', this.element)
    },
    renderChild () {
      const type = this.element.type
      const content = JSON.parse(JSON.stringify(this.element.content))
      const config = this.element.config
      Vue.component(`type-${type}`, {
        render: function (createElement) {
          let props = {}
          config.forEach((item, idx) => {
            props[item.name] = this.ele.config[idx].data
          })
          if (this.ele) {
            return createElement(type, {...content, props})
          } else {
            return createElement('div', '渲染出错')
          }
        },
        props: {
          ele: {
            type: Object,
            required: true
          }
        }
      })
    }
  }
}
</script>


<style scoped lang="scss">
.element {
  cursor: move;
  // transition: all .5s;
  // &:hover {
  //   border: 2px dashed #03dafd !important;
  // }
  position: relative;
}
.menu-box {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 12px;
  transform: translate(50%, 50%);
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  z-index: 9999;
  border-radius: 2px;
  .del:hover {
    background-color: #ecf5ff;
    color: #FD7F6B;
  }
}
.menu-item {
  padding: 5px 10px;
  text-align: center;
}
// .menu-item:not(:last-child) {
//   border-bottom: 1px solid #ebeef5;
// }
.input-class {
  width: 65px;
}
.option-wrap {
  position: relative;
  display: inline-block;
  cursor: move;
}
.can-receive {
  background: rgba(3, 218, 253, 0.6);
  border: 2px dashed #03dafd;
}
.option {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>

<style lang="scss">
.menu-box {
  .el-input--mini .el-input__inner {
    height: 20px;
    padding: 0 2px;
    font-size: 12px;
  }
}
</style>


