<template>
  <component
    v-if="ready"
    :is="'type-'+element.type"
    :ele="element"
    :data-id="element.id"
    :id="element.id"
    :data-pid="element.pid"
    @click.native.capture="changeActive"
    :class="['element', { 'element-active': active }]"
  >
    <template v-if="element.children && element.children.length > 0">
      <template v-if="'flexbox|grid'.indexOf(element.type) > -1">
        <custom-element
          v-for="item in element.children"
          :element="item"
          :key="item.id"
          :slot="'ele'+ item.idx"
        />
      </template>
      <template v-else>
        <custom-element
          v-for="item in element.children"
          :element="item"
          :key="item.id"
        />
      </template>
    </template>
  </component>
</template>

<script>
import Vue from 'vue'
// import draggable from 'vuedraggable'
import _Type from './types'
import { mapGetters } from 'vuex'
import Bus from '@/utils/Bus'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {
      ready: false,
      // menuShow: false,
      className: '',
      inputVisible: false,
      inputValue: ''
    }
  },
  components: {..._Type},
  computed: {
    active () {
      const current = this.current
      const isCurrent = current && current.id === this.element.id
      return (isCurrent || this.menuShow)
    },
    ...mapGetters({
      isModuleEdit: 'isModuleEdit',
      current: 'current'
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
  watch: {
    'element.className' (o, n) {
      this.className = n
    }
  },
  methods: {
    // onEnd (obj) {
    //   let oIdx = obj.from.classList[0] === 'col-container' ? parseInt(obj.from.dataset.index) : obj.oldIndex
    //   let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
    //   const from = `${obj.item.dataset.pid}的${oIdx}`
    //   const to = `${obj.to.children[0].dataset.pid}的${nIdx}`
    //   console.log('edit', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
    //   this.$store.dispatch('moveEle', {
    //     id: obj.item.dataset.id,
    //     oPid: obj.item.dataset.pid,
    //     nPid: obj.to.children[0].dataset.pid,
    //     nIdx,
    //     oIdx
    //   })
    // },
    changeActive () {
      this.$store.commit('changeCurrentEl', this.element)
      Bus.$emit('changeCurrentEl')
    },
    renderChild () {
      const type = this.element.type
      const content = this.element.content && JSON.parse(JSON.stringify(this.element.content))
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
    },

    handleClose () {
      this.className = ''
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.className = inputValue
      }
      this.inputVisible = false
      this.inputValue = ''
      this.$store.dispatch('changeClassName', {
        id: this.element.id,
        className: inputValue
      })
    }
  }
}
</script>


<style scoped lang="scss">
.element {
  cursor: move;
  position: relative;
  &:hover {
    border: 2px dashed #4ED7EC !important;
  }
}
.element-active {
  border: 2px dashed #4ED7EC;
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
  .del {
    text-align: center;
    border-bottom: 1px solid #ebeef5;
  }
  .del:hover {
    background-color: #ecf5ff;
    color: $themeColor;
  }
}
.menu-item {
  padding: 5px 10px;
  // text-align: center;
}
.className {
  display: flex;
  align-items: center;
}
// .menu-item:not(:last-child) {
//   border-bottom: 1px solid #ebeef5;
// }
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
    min-width: 50px;
    font-size: 12px;
  }
  .el-tag {
    height: 23px;
    line-height: 20px;
    margin-bottom: 2px;
  }
  .el-button--mini {
    padding: 4px 6px;
  }
}
</style>


