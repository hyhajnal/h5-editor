<template>
  <grid class="row"
    :cols="ele.config[0].data"
    :show-lr-borders="ele.config[1].data"
    :show-vertical-dividers="ele.config[2].data"
  >
    <grid-item v-for="(item, index) in ele.config[0].data" :key="item" class="col">
      <draggable
        :options="dragOptions"
        @end="onEnd"
        element="div"
        class="col-container"
        :data-id="ele.id"
        :data-pid="ele.pid"
        :data-index="index"
      >
        <slot :name="'ele'+index"></slot>
      </draggable>
    </grid-item>
  </grid>
</template>

<script>
import draggable from 'vuedraggable'
import { Grid, GridItem } from 'vux'

export default {
  name: 'CustomFlexbox',
  props: {
    ele: Object
  },
  components: { Grid, GridItem, draggable },
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
      let oIdx = obj.from.classList[0] === 'col-container' ? parseInt(obj.from.dataset.index) : obj.oldIndex
      let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      const from = `${obj.item.dataset.pid}的${oIdx}`
      let nPid = obj.to.children[0].dataset.pid
      if (obj.to.localName === 'div') {
        nPid = obj.to.dataset.id
      }
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
  }
}
</script>

<style scoped lang="scss">
.row {
  background: #fff;
  width: 100%;
}
.col-container {
  min-height: 50px;
  height: auto;
}
</style>

