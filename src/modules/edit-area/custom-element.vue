<template>
  <component
    v-if="ready"
    :is="'type-'+element.type"
    :ele="element"
    :data-id="element.id"
    :data-pid="element.pid"
    @click.native.capture="changeActive"
    class="element"
  >
    <custom-element
      v-for="item in element.children"
      :element="item"
      :key="item.id"
      v-if="element.children && element.children.length > 0"
    />
  </component>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import _Type from './types'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {
      ready: false
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
    }
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
      this.$store.commit('changeCurrent', this.element)
    },
    renderChild () {
      const type = this.element.type
      const content = JSON.parse(JSON.stringify(this.element.content))
      Vue.component(`type-${type}`, {
        render: function (createElement) {
          return createElement(type, content)
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
  &:hover {
    border: 2px dashed #03dafd !important;
  }
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
// .element-active {
//   opacity: 0.5;
// }
</style>

