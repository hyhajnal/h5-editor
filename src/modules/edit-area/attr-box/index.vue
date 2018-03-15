<template>
  <div class="attr-box"
    ref="attrbox"
  >
    <template v-if="current.type === 'div' && attr" >
      <container :attrData="attr"/>
      <div class="divider"></div>
    </template>
    <template v-if="current.type === 'span' && attr">
      <attr-text :attrData="attr" />
      <div class="divider"></div>
    </template>
    <template v-if="current.config">
      <config :attrData="current.config" />
    </template>
  </div>
</template>

<script>
import Container from './container'
import AttrText from './text'
import Config from './config'
import { toStyleObj } from '@/utils/transformStyle'
import { mapGetters } from 'vuex'

export default {
  name: 'AtrrBox',
  data () {
    return {
      type: 'container',
      dx: 0,
      dy: 0,
      offsetX: 0,
      offsetY: 0,
      isDrag: false
    }
  },
  components: {
    Container,
    AttrText,
    Config
  },
  computed: {
    ...mapGetters({
      current: 'current'
    }),
    attr () {
      return toStyleObj(this.current.style)
    },
    styleObj () {
      return { transform: `translate(${this.dx}px, ${this.dy}px)` }
    }
  },
  methods: {
    onMouseDown (e) {
      this.isDrag = true
      this.offsetX = e.pageX - this.offsetX
      this.offsetY = e.pageY - this.offsetY
    },
    onMouseUp (e) {
      this.isDrag = false
      this.offsetX = this.dx
      this.offsetY = this.dy
    },
    onMouseMove (e) {
      if (this.isDrag) {
        this.dx = e.pageX - this.offsetX
        this.dy = e.pageY - this.offsetY
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.attr-box {
  padding: 0 10px;
  overflow-y: auto;
  // overflow-x: hidden;
  min-height: 100vh;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}
.divider {
  height: 1px;
  background: #eee;
  width: 100%;
  margin: 20px 0;
}
</style>

<style lang="scss">
.attr-box {
  .el-tabs__content {
    overflow-x: auto;
  }
  .align-box {
    display: flex;
    width: 100px;
  }
  .el-input-number__increase,
  .el-input-number__decrease {
    display: none;
  }
  .el-input-number--small {
    height: 15px;
    width: 40px;
    line-height: 15px;
  }
  .el-input--small .el-input__inner {
    height: 17px;
    line-height: 15px;
    padding: 0 8px;
  }
  .el-select--small {
    width: 80px;
  }
  .el-select-dropdown__item {
    height: 15px;
    line-height: 15px;
    span {
      line-height: 15px !important;
    }
  }
  .el-color-picker--mini .el-color-picker__trigger {
    width: 20px;
    height: 20px;
  }
  .el-color-picker--mini {
    height: 20px;
  }
  .el-row {
    margin: 7px 0px;
  }
}
</style>


