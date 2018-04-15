<template>
  <div class="edit-area" ref="edit">
    <!-- 框选区域 -->
    <div class="shadow" :style="displayStyle"></div>
    <div class="select-area" :style="selectStyle"></div>
    <page />

    <el-dialog title="提示" :visible.sync="outerVisible" width="40%">
      <p>是否将选中元素划分成一个模块?</p>
      <el-dialog
        width="30%"
        title="模块信息"
        :visible.sync="innerVisible"
        @close="handleClose"
        append-to-body>
        <el-form label-width="100px" :model="mod" class="demo-form-inline">
          <el-form-item label="模块名称">
            <el-input v-model="mod.name" placeholder="模块名称"></el-input>
          </el-form-item>
          <el-form-item label="模块开发者">
            <el-input v-model="mod.developer" placeholder="模块开发者"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="publish">发布</el-button>
        </span>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import AttrBox from './attr-box/index'
import Page from './page'
import { createModule } from '@/utils/help'
export default {
  name: 'EditArea',
  data () {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isEnd: true,
      top: 0,
      left: 0,
      selectList: [],
      innerVisible: false,
      outerVisible: true,
      mod: {
        name: '',
        developer: ''
      }
    }
  },
  computed: {
    selectStyle () {
      const display = !this.isEnd ? 'block' : 'none'
      return `top:${this.top}px;left:${this.left}px;width:${this.width}px;height:${this.height}px;display:${display};`
    },
    displayStyle () {
      const display = !this.isEnd ? 'block' : 'none'
      return `display:${display};`
    }
  },
  components: {
    AttrBox,
    Page
  },
  mounted () {
    const el = this.$refs.edit
    el.addEventListener('mousemove', this.onMove, false)
    el.addEventListener('mouseup', this.onUp, false)
    el.addEventListener('mousedown', this.onDown, false)
  },
  beforeDestroyed () {
    const el = this.$refs.edit
    el.removeEventListener('mousemove', this.onMove, false)
    el.removeEventListener('mouseup', this.onUp, false)
    el.removeEventListener('mousedown', this.onDown, false)
  },
  methods: {
    onDown (e) {
      this.isEnd = false
      this.x = e.clientX
      this.y = e.clientY
      const el = this.$refs.edit
      const { top, left } = this.getOffset(el)
      this.left = e.clientX - left
      this.top = e.clientY - top
    },
    onUp (e) {
      this.isEnd = true
      let els = document.getElementsByClassName('element')
      for (let i = 0; i < els.length; i++) {
        let el = els[i]
        if (this.inArea(el)) {
          this.selectList.push(el.dataset.id)
          el.classList.add('selected')
        }
      }
      this.outerVisible = true
    },
    onMove (e) {
      if (this.isEnd) return
      this.width = Math.abs(e.clientX - this.x)
      this.height = Math.abs(e.clientY - this.y)
    },
    getOffset (element) {
      let top = element.offsetTop
      let left = element.offsetLeft
      let parent = element.offsetParent
      while (parent != null && parent !== undefined) {
        top += parent.offsetTop
        left += parent.offsetLeft
        parent = parent.offsetParent
      }
      return { top, left }
    },
    // 在圈中的范围内
    inArea (el) {
      let { top, left } = this.getOffset(el)
      const rect = el.getBoundingClientRect()
      top = top + rect.width / 2
      left = left + rect.height / 2
      const minX = this.x
      const minY = this.y
      const maxX = this.x + this.width
      const maxY = this.y + this.height
      // console.log(`${el.dataset.id}:${left}(${minX}-${maxX}),${top}(${minY}-${maxY})`)
      return top > minY && top < maxY && left > minX && left < maxX
    },
    handleClose () {
      this.innerVisible = false
      this.outerVisible = false
      this.clearAll()
    },
    clearAll () {
      let els = document.getElementsByClassName('selected')
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove('selected')
      }
      this.selectList = []
    },
    publish (developer, name) {
      const mod = createModule({
        elements: this.selectList.toString,
        pid: this.pid,
        ...this.mod
      })
      this.$store.commit('publishMod', mod)
      this.innerVisible = false
    }
  }
}
</script>

<style scoped>
  .edit-area {
    height: 100%;
    overflow: auto;
    position: relative;
    background: #F7F7F7;
  }
  .shadow {
    width: 100%;
    height: inherit;
    position: absolute;
    z-index: 998;
    background: rgba(0,0,0,0.2);
  }
  .select-area {
    position: absolute;
    z-index: 999;
    border: 2px dashed orange;
    background: rgba(0, 0, 0, 0.3);
  }
</style>

<style lang="scss">
.selected {
  border: 1px solid red !important;
}
.confirm-box {
  width: 300px;
  position: absolute;
  top: 140px;
  right: 40px;
}
.el-dialog__body {
  padding: 20px 20px 0px 20px;
}
</style>
