<template>
  <div class="attr-area">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="信息" name="info">
        <info />
      </el-tab-pane>
      <el-tab-pane label="结构" name="struct">
        <struct />
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr" v-if="!isModuleEdit">
        <attr-box />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Struct from './struct'
import Info from './info'
import AttrBox from '@/modules/edit-area/attr-box/index'
import { mapGetters } from 'vuex'
export default {
  name: 'AttrArea',
  data () {
    return {
      activeName: 'info'
    }
  },
  components: {
    Struct,
    AttrBox,
    Info
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