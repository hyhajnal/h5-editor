<template>
  <div class="ele-wrap">
    <span class="option-wrap"
      :class="{'active': active}"
      @click.stop.capture="changeActive"
    >
      <div :class="{'can-receive': canReceive}" class="option"></div>
      <component :is="'type-'+element.type" :ele="element" v-if="element.type === 'div'">
        <custom-element
          v-if="element.children && element.children.length > 0"
          v-for="item in element.children"
          :element="item"
          :key="item.id"
        />
      </component>
      <draggable
        v-else
        :options="{group:{name:'page',put:['resource1', 'resource2', 'page']}}"
        @end="onEnd"
      >
        <component :is="'type-'+element.type" :ele="element" :data-id="element.id" :data-pid="element.pid">
          <custom-element
            v-if="element.children && element.children.length > 0"
            v-for="item in element.children"
            :element="item"
            :key="item.id"
          />
        </component>
      </draggable>
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
  data () { return {} },
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
  methods: {
    onEnd (obj) {
      const from = `${obj.item.dataset.pid}的${obj.oldIndex}`
      const to = `${obj.to.children[0].dataset.pid}的${obj.newIndex}`
      console.log('edit', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.dispatch('moveEle', {
        id: obj.item.dataset.id,
        oPid: obj.from.children[0].dataset.pid,
        nPid: obj.to.children[0].dataset.pid,
        nIdx: obj.newIndex,
        oIdx: obj.oldIndex
      })
    },
    unActive () {
      alert('hhh')
      this.active = false
    },
    changeActive () {
      this.$store.commit('changeCurrent', this.element)
    }
    // onUpdate (obj) {
    //   console.log('update', obj)
    //   console.log('update', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // },
    // onRemove (obj) {
    //   console.log('remove', obj.to.children[0].dataset.pid)
    //   console.log('remove', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // },
    // onAdd (obj) {
    //   console.log('add', obj.to.children[0].dataset.pid)
    //   console.log('add', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // }
  }
}
</script>


<style scoped lang="scss">
.ele-wrap {
  cursor: move;
}
.option-wrap {
  position: relative;
  display: inline-block;
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
</style>

