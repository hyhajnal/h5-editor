<template>
  <div class="page"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <draggable element="div"
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
          put: ['resource1', 'resource2', 'page']
        },
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  components: {
    CustomElement,
    draggable
  },
  computed: {
    ...mapGetters({
      elements: 'page'
    })
    // elements: {
    //   get () {
    //     return toTree(this.$store.state.list)
    //   },
    //   set (value) {
    //     const list = JSON.parse(JSON.stringify(value))
    //     this.$store.commit('updateList', toList(list, 0, []))
    //   }
    // }
  },
  methods: {
    onEnd (obj) {
      const from = `${obj.item.dataset.pid}的${obj.oldIndex}`
      const to = `${obj.to.children[0].dataset.pid}的${obj.newIndex}`
      console.log('edit', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.commit('moveEle', {
        id: obj.item.dataset.id,
        pid: obj.to.children[0].dataset.pid,
        idx: obj.newIndex
      })
    }
    // onEnd (obj) {
    //   console.log('resource', obj)
    //   console.log('edit', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // }
    // onUpdate (obj) {
    //   console.log('update', obj)
    //   console.log('update', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // },
    // onRemove (obj) {
    //   console.log('remove', obj)
    //   console.log('remove', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // },
    // onAdd (obj) {
    //   console.log('add', obj)
    //   console.log('add', `${obj.item.dataset.id}:${obj.item.dataset.pid}-${obj.oldIndex}->${obj.newIndex}`)
    // }
  }
}
</script>

<style scoped lang="scss">
.page {
  border: 1px solid #ddd;
  margin: 40px auto;
}
</style>
