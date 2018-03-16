<template>
  <div class="page"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <draggable element="span"
      :options="dragOptions"
      @end="onEnd"
    > 
      <custom-element
        v-for="item in elements"
        :key="item.id"
        :element="item"
        :data-id="item.id"
        :data-pid="item.pid"
      />
    </draggable>
  </div>
</template>

<script>
import CustomElement from './custom-element'
import { mapGetters } from 'vuex'
// import { toList, toTree } from '@/utils/transformTree'
import draggable from 'vuedraggable'
export default {
  name: 'Page',
  data () {
    return {
      width: 375,
      height: 667,
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
  components: {
    CustomElement,
    draggable
  },
  // watch: {
  //   elements: {
  //     handler () {
  //       console.log('change')
  //       this.$forceUpdate()
  //     },
  //     deep: true
  //   }
  // },
  computed: {
    ...mapGetters({
      elements: 'page'
    })
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
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  // border: 1px solid #ddd;
  margin: 40px auto;
  background: #fff;
  overflow: auto;
}
// .element-active {
//   border: 2px solid #03dafd;
// }
</style>
