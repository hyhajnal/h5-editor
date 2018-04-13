<template>
  <el-menu default-active="1-4-1">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">我的项目</span>
      </template>
      <el-menu-item index="1-1">我参与的项目</el-menu-item>
      <el-menu-item index="1-2">我发起的项目</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">我的收藏</span>
      </template>
      <el-menu-item index="1-1">项目</el-menu-item>
      <el-menu-item index="1-2">模版</el-menu-item>
      <el-menu-item index="1-2">组件</el-menu-item>
    </el-submenu>

    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">我的模版</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">我的组件</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {}
    }
  }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

