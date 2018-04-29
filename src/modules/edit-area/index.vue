<template>
  <div class="edit-wrap">
    <div class="edit-area" ref="edit">
      <!-- 框选区域 -->
      <div class="shadow" v-show="divideStart" id="shadow"></div>
      <div class="select-area" :style="selectStyle"></div>
      <page />
    </div>

    <el-dialog title="提示"
      :visible.sync="outerVisible"
      width="20%"
      class="mod-tip"
      @close="handleClose"
    >
      <p>请选择将所选元素发布成模块或模版?</p>
      <el-dialog
        class="mod-tip-inner"
        width="30%"
        title="模块信息"
        :visible.sync="innerVisible"
        @close="handleClose"
        append-to-body>
        <el-form label-width="100px" :model="mod" ref="info" v-if="divideType === 'module'">
          <el-form-item
            label="模块名称"
            prop="name"
            :rules="[
              { required: true, message: '请输入模块名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="mod.name" placeholder="模块名称"></el-input>
          </el-form-item>
          <el-form-item
            label="开发者"
            prop="developer"
            :rules="[
              { required: true, message: '请输入模块开发者', trigger: 'blur' }
            ]"
          >
            <el-input v-model="mod.developer" placeholder="模块开发者"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="100px" :model="templ" ref="info" v-else>
          <el-form-item
            label="模版名称"
            prop="name"
            :rules="[
              { required: true, message: '请输入模版名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="templ.name" placeholder="模版名称"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="publish" size="small">发布</el-button>
        </span>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="divideModule" size="small">模块</el-button>
        <el-button type="primary" @click="innerVisible = true" size="small">模版</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import AttrBox from './attr-box/index'
import Page from './page'
import { createModule, createTempl } from '@/utils/help'
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
      outerVisible: false,
      divideStart: false,
      divideType: 'template',
      mod: {
        name: '',
        developer: ''
      },
      templ: {
        name: ''
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

    hotkeys('e', (event, handler) => {
      event.preventDefault()
      const message = !this.divideStart ? '模块划分模式已开启' : '模块划分模式已关闭'
      this.$notify({message})
      this.divideStart = !this.divideStart
    })

    hotkeys('⌘+v', (e) => {
      event.preventDefault()
      this.$notify({
        title: '成功',
        message: '成功将当前元素复制到编辑面板',
        type: 'success'
      })
      this.$store.dispatch('copyEle')
    })

    hotkeys('⌘+d', (e) => {
      event.preventDefault()
      this.$notify({
        title: '成功',
        message: '成功删除当前元素',
        type: 'success'
      })
      this.$store.dispatch('delEle')
    })

    hotkeys('esc', (event, handler) => {
      this.clear()
    })
  },
  beforeDestroyed () {
    const el = this.$refs.edit
    el.removeEventListener('mousemove', this.onMove, false)
    el.removeEventListener('mouseup', this.onUp, false)
    el.removeEventListener('mousedown', this.onDown, false)
  },
  methods: {

    onDown (e) {
      if (e.target.id !== 'shadow') return
      this.isEnd = false
      this.x = e.clientX
      this.y = e.clientY
      const el = this.$refs.edit
      const { top, left } = this.getOffset(el)
      this.left = e.clientX - left
      this.top = e.clientY - top
    },

    onUp (e) {
      if (e.target.id !== 'shadow') return
      let els = document.getElementsByClassName('element')
      let pid = ''
      let list = []
      // 选出在区域内的元素
      for (let i = 0; i < els.length; i++) {
        let el = els[i]
        if (this.inArea(el)) {
          list.push(el.dataset.id)
          el.classList.add('selected')
        }
      }
      // 赋值
      this.selectList = list
      this.mod.pid = pid || 'root'
      if (list.length > 0) {
        this.outerVisible = true
      }
      // 重置框选参数
      this.clear()
    },

    onMove (e) {
      if (e.target.id !== 'shadow' || this.isEnd) return
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
      const length = els.length
      for (let i = 0; i < length; i++) {
        document.querySelector('.selected').classList.remove('selected')
      }
      this.mod = { name: '', developer: '' }
      this.selectList = []
    },

    clear () {
      this.isEnd = true
      this.x = 0
      this.y = 0
      this.width = 0
      this.height = 0
      this.top = 0
      this.left = 0
    },

    publish () {
      this.$refs.info.validate((valid) => {
        if (valid) {
          if (this.divideType === 'module') {
            const mod = createModule({
              elements: this.selectList,
              ...this.mod
            })
            this.$store.commit('publishMod', mod)
          } else {
            const templ = createTempl({
              elements: this.selectList,
              ...this.mod
            })
            this.$store.commit('addTempl', templ)
          }
          this.innerVisible = false
          this.divideStart = false
        } else {
          return false
        }
      })
    },

    divideModule () {
      this.innerVisible = true
      this.divideType = 'module'
    },

    divideTempl () {
      this.innerVisible = true
      this.divideType = 'templ'
    }

  }
}
</script>

<style scoped lang="scss">
  .edit-wrap {
    height: 100%;
    overflow: auto;
    background: #F7F7F7;
    position: relative;
  }
  .edit-area {
    position: relative;
  }
  .shadow {
    width: 100%;
    height: 100%;
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
.mod-tip {
  .el-dialog {
    float: right;
    margin-right: 15vh;
  }
}
.mod-tip-inner {
  .el-dialog__body {
    padding: 20px 20px 0px 20px;
  }
}
</style>
