<template>
  <div class="page"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <draggable element="div" :options="dragOptions" :move="onMove" @end="onEnd" @start="onStart"> 
      <custom-element
        v-for="item in elements"
        :key="item.id"
        :element="item"
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
    onMove (obj) {
      console.log('move')
      console.log(obj)
    },
    onEnd (obj) {
      console.log('end')
      console.log(obj)
    },
    onStart (obj) {
      console.log('start')
      console.log(obj)
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  border: 1px solid #ddd;
  margin: 40px auto;
}
</style>
