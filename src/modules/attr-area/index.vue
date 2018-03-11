<template>
  <div class="attr-area">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="页面" name="first">页面基本信息</el-tab-pane>
      <el-tab-pane label="工作区" name="second">
        <struct></struct>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">
        <attr-box />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Struct from './struct'
import AttrBox from '@/modules/edit-area/attr-box/index'
export default {
  name: 'AttrArea',
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    Struct,
    AttrBox
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>