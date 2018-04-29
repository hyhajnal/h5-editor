<template>
  <flexbox-item class="col-container">
    <draggable
      :options="dragOptions"
      @end="onEnd"
      class="col"
    >
      <slot></slot>
    </draggable>
  </flexbox-item>
</template>

<script>
import draggable from 'vuedraggable'
import { FlexboxItem } from 'vux'

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
      const from = `${obj.item.dataset.pid}的${obj.oldIndex}`
      let nPid = obj.to.children[0].dataset.pid
      if (obj.to.localName === 'div') {
        nPid = obj.to.dataset.id
      }
      let to = `${nPid}的${obj.newIndex}`
      console.log('[Edit]', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.dispatch('moveEle', {
        id: obj.item.dataset.id,
        oPid: obj.item.dataset.pid,
        nPid,
        nIdx: obj.newIndex,
        oIdx: obj.oldIndex
      })
    }
  },
  components: {
    draggable,
    FlexboxItem
  }
}
</script>

<style scoped>
.col {
  width: 80px;
  height: 80px;
  border: 1px dashed #ccc;
}
</style>

