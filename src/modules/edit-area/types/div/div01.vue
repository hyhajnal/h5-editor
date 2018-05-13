<template>
  <draggable
    v-if="ele.config"
    :options="dragOptions"
    @end="onEnd"
    element="div"
    :flex-box="ele.config[6].data"
    :style="ele.style"
  >
    <slot></slot>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DIV',
  props: {
    ele: Object
  },
  data () {
    return {
      dragOptions: {
        animation: 0,
        group: {
          name: 'page',
          put: ['resource1', 'resource2', 'page'],
          // put: true,
          pull: true
        },
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'element-active'
      }
    }
  },
  methods: {
    onEnd (obj) {
      let nPid = obj.to.children[0].dataset.pid
      if (obj.to.localName === 'div') {
        nPid = obj.to.dataset.id
      }
      let oIdx = obj.from.classList[0] === 'col-container' ? parseInt(obj.from.dataset.index) : obj.oldIndex
      let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      const from = `${obj.item.dataset.pid}的${oIdx}`
      let to = `${nPid}的${nIdx}`
      console.log('[Edit]', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.dispatch('moveEle', {
        id: obj.item.dataset.id,
        oPid: obj.item.dataset.pid,
        nPid,
        nIdx,
        oIdx
      })
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>
</style>

