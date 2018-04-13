<template>
  <el-menu default-active="project-me" @select="onSelect">
    <el-submenu index="project">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">我的项目</span>
      </template>
      <el-menu-item index="project-me">我发起的项目</el-menu-item>
      <el-menu-item index="project-join">我参与的项目</el-menu-item>
    </el-submenu>

    <el-submenu index="collect">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">我的收藏</span>
      </template>
      <el-menu-item index="project-collect">项目</el-menu-item>
      <el-menu-item index="templ-collect">模版</el-menu-item>
      <el-menu-item index="comp-collect">组件</el-menu-item>
    </el-submenu>

    <el-menu-item index="templ-me">
      <i class="el-icon-document"></i>
      <span slot="title">我的模版</span>
    </el-menu-item>
    <el-menu-item index="comp-me">
      <i class="el-icon-setting"></i>
      <span slot="title">我的组件</span>
    </el-menu-item>
    <el-menu-item index="mod-me">
      <i class="el-icon-setting"></i>
      <span slot="title">我的模块</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {}
    },
    methods: {
      onSelect (index) {
        const type = index.split('-')[0]
        const param = index.split('-')[1]
        this.$emit('select', { type, param })
      }
    }
  }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

