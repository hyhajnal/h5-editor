<template>
  <div class="attr-box"
    ref="attrbox"
  >
    <p v-if="!current"><span class="el-tree__empty-text">暂无选中元素</span></p>
    <template v-if="current && attrShow" >
      <container :attrData="attr" :attrShow="attrShow" />
      <div class="divider"></div>
    </template>
    <template v-if="current && current.config && current.config.length > 0">
      <config :attrData="current.config" />
      <div class="divider"></div>
    </template>
    <attr-link v-if="current" :linkData="current.link" :id="current.id" />
  </div>
</template>

<script>
import Container from './container'
import Config from './config'
import AttrLink from './link'
import { toStyleObj } from '@/utils/transformStyle'
import { mapGetters } from 'vuex'
import AttrShow from '@/utils/attrShow'

export default {
  name: 'AtrrBox',
  components: {
    Container,
    Config,
    AttrLink
  },
  computed: {
    ...mapGetters({
      current: 'current'
    }),
    attr () {
      return (this.current.style && toStyleObj(this.current.style)) || null
    },
    attrShow () {
      return AttrShow[this.current.type]
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


