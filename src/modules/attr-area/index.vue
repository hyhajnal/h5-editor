<template>
  <div class="attr-area">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="页面" name="first">页面基本信息</el-tab-pane>
      <el-tab-pane label="结构" name="second">
        <struct></struct>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr" v-if="!isModuleEdit">
        <attr-box />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Struct from './struct'
import AttrBox from '@/modules/edit-area/attr-box/index'
import { mapGetters } from 'vuex'
export default {
  name: 'AttrArea',
  data () {
    return {
      activeName: 'attr'
    }
  },
  components: {
    Struct,
    AttrBox
  },
  computed: {
    ...mapGetters({
      isModuleEdit: 'isModuleEdit'
    })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
.attr-area {
  .el-tabs__nav-scroll {
    padding: 0 10px;
  }
}
</style>