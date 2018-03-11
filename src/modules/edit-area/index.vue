<template>
  <div class="edit-area">
    <page />
    <el-button-group class="zoom-box">
      <el-button size="small" icon="el-icon-minus"></el-button>
      <el-button size="small">100%</el-button>
      <el-button size="small" icon="el-icon-plus"></el-button>
    </el-button-group>
    <!-- <attr-box></attr-box> -->
  </div>
</template>

<script>
import AttrBox from './attr-box/index'
import Page from './page'
export default {
  name: 'EditArea',
  data () {
    return {}
  },
  components: {
    AttrBox,
    Page
  }
}
</script>

<style scoped>
  .edit-area {
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .zoom-box {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  }
</style>