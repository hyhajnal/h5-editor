<template>
  <div
    :data-id="element.id"
    :data-pid="element.pid"
  >
    <span
      @click.stop.capture="changeActive"
      :class="[{'active': active}, 'option-wrap']"
    >
      <component :is="'type-'+element.type"
        :ele="element"
        class="element"
      >
        <draggable
          element="span"
          :options="dragOptions"
          @end="onEnd"
          v-if="element.type === 'div'"
        >
          <custom-element
            v-for="item in element.children"
            :element="item"
            :key="item.id"
            v-if="element.children && element.children.length > 0"
          />
        </draggable>
      </component>
    </span>
  </div>
</template>

<script>
import TypeDiv from './types/type-div'
import TypeSpan from './types/type-span'
import draggable from 'vuedraggable'

export default {
  name: 'CustomElement',
  props: {
    element: Object
  },
  data () {
    return {
      dragOptions: {
        animation: 0,
        group: {
          name: 'page',
          put: ['resource1', 'resource2', 'page']
        },
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'element-active'
      }
    }
  },
  components: {
    TypeDiv,
    TypeSpan,
    draggable
  },
  computed: {
    canReceive () {
      return this.$store.state.isDraging && this.element.type === 'div'
    },
    active () {
      const current = this.$store.state.current
      return current && current.id === this.element.id
    }
  },
  // watch: {
  //   element: {
  //     handler () {
  //       console.log('change')
  //       this.$forceUpdate()
  //     },
  //     deep: true
  //   }
  // },
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
    }
  }
}
</script>


<style scoped lang="scss">
.element {
  cursor: move;
  // transition: all .5s;
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
.active {
  border: 2px solid #03dafd;
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

