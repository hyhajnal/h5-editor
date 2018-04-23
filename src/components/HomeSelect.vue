<template>
<div class="home-select">
  <el-tabs tab-position="top"
    style="height: 50px; width: 80%; padding-left: 30px;"
    v-model="tag"
  >
    <el-tab-pane
      v-for="item in list"
      :key="item.name"
      :label="item.label"
      class="tab-item"
    />
  </el-tabs>
  <div class="sort">
    <el-dropdown>
      <span class="el-dropdown-link">
        排序<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>最新</el-dropdown-item>
        <el-dropdown-item>最热</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
const data = {
  project: [
    {label: '全部', name: 'all'},
    {label: '电商', name: 'shop'},
    {label: '教育', name: 'education'},
    {label: '生活', name: 'life'},
    {label: '效率', name: 'work'},
    {label: '音乐', name: 'music'}
  ],
  templ: [
    {label: '全部', name: 'all'},
    {label: '卡片', name: 'card'},
    {label: '列表', name: 'list'},
    {label: '评论', name: 'comment'},
    {label: '详情', name: 'detail'},
    {label: '启动页', name: 'welcome'},
    {label: '登录注册', name: 'login'},
    {label: '个人中心', name: 'me'}
  ],
  comp: [
    {label: '全部', name: 'all'},
    {label: '搜索框', name: 'search'},
    {label: '标签页', name: 'tabbar'}
  ]
}
export default {
  name: 'HomeMenu',
  props: {
    type: String
  },
  data () {
    return {
      tag: '1'
    }
  },
  computed: {
    list () {
      return data[this.type]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
$height: 50px;
.type-box {
  margin: auto;
  transition: all .3s;
}
.home-select {
  width: 100%;
  background: #fff;
  height: $height;
  position: relative;
  .el-tabs__item {
    height: $height;
    line-height: $height;
  }
  &:after {
    content: '';
    background-color: #e4e7ed;
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 0;
    width: 100%;
  }
  .el-tabs__nav-next, .el-tabs__nav-prev {
    line-height: $height;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
.sort {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>

