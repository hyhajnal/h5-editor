<template>
  <div class="page-wrap"
    @mouseup="onUp"
    @mousemove="onMove"
  >
    <draggable element="div"
      id="page"
      class="page"
      data-id="root"
      :style="style"
      :options="dragOptions"
      @end="onEnd"
    > 
      <custom-element
        v-if="elements.length > 0"
        v-for="item in elements"
        :key="item.id"
        :element="item"
        :data-id="item.id"
        :data-pid="item.pid"
      />
    </draggable>
    <p @mousedown="onDown">
      拖动调整高度 <span style="color: #FB7F6E;">{{height}}px</span>
    </p>
  </div>
</template>

<script>
import CustomElement from './custom-element'
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: 'Page',
  data () {
    return {
      dragOptions: {
        animation: 0,
        group: {
          name: 'page',
          put: ['resource1', 'resource2', 'page'],
          pull: true
        },
        disabled: false,
        ghostClass: 'ghost',
        chosenClass: 'element-active'
      },
      baseHeight: 667,
      dHeight: 0,
      lastY: 0,
      isMoveEnd: false
    }
  },
  components: {
    CustomElement,
    draggable
  },
  computed: {
    ...mapGetters({
      elements: 'page',
      device: 'device',
      info: 'pageInfo'
    }),
    height () {
      return this.baseHeight + this.dHeight
    },
    style () {
      const background = (this.$store.state.info && this.$store.state.info.background) || '#fff'
      return `height:${this.height}px;background:${background};`
    }
  },
  methods: {
    onEnd (obj) {
      let pid = obj.to.dataset.id || obj.to.children[0].dataset.pid
      let oIdx = obj.from.classList[0] === 'col-container' ? parseInt(obj.from.dataset.index) : obj.oldIndex
      let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      const from = `${obj.item.dataset.pid}的${oIdx}`
      const to = `${pid}的${nIdx}`
      console.log('[Edit]', `元素${obj.item.dataset.id}:从${from}，成为了${to}`)
      this.$store.dispatch('moveEle', {
        id: obj.item.dataset.id,
        oPid: obj.from.children[0].dataset.pid,
        nPid: pid,
        nIdx,
        oIdx
      })
    },

    onDown (e) {
      this.isMoveEnd = true
      this.lastY = e.clientY
    },

    onMove (e) {
      if (!this.isMoveEnd) return
      if (this.height > 666) {
        this.dHeight = e.clientY - this.lastY
      }
    },

    onUp (e) {
      this.isMoveEnd = false
      this.dHeight = 0
      const baseHeight = this.baseHeight + e.clientY - this.lastY
      this.baseHeight = baseHeight > 667 ? baseHeight : 667
      this.lastY = e.clientY
    }
  }
}
</script>

<style scoped lang="scss">
.page-wrap {
  margin: 0 auto;
  padding: 40px 0 1000px 0;
  width: 375px;
}
.page {
  background: #fff;
  position: relative;
}
p {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
  cursor: ns-resize;
  position: relative;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
  color: #969191;
  user-select: none;
}
p::after {
  content: "";
  height: 2px;
  width: 90px;
  background: #ccc;
  position: absolute;
  top: 50%;
  left: 0;
}
p::before {
  content: "";
  display: block;
  height: 2px;
  width: 90px;
  background: #ccc;
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
