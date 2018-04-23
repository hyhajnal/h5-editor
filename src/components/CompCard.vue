
<!-- 组件卡片 -->

<template>
  <div class="component">
    <h1 class="title">{{comp.name}}</h1>
    <p class="desc">{{comp.desc}}</p>
    <card-bottom class="bottom" />
    <el-row class="shadow" type="flex" justify="space-around" align="middle">
      <i class="el-icon-circle-plus"></i>
      <i class="el-icon-info"></i>
    </el-row>
  </div>
</template>

<script>
import CardBottom from './Bottom'
export default {
  name: 'CompCard',
  data () {
    return {}
  },
  props: {
    comp: Object
  },
  components: {
    CardBottom
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.component {
  padding: 14px;
  background: #ffff;
  border-radius: 4px;
  height: 100px;
  position: relative;
}
.title {
  font-size: 14px;
  color: #555;
}
.desc {
  font-size: 12px;
  color: #909090;
  margin: 4px 0 14px 0;
}
.shadow {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  i {
    color: #fff;
    font-size: 28px;
    cursor: pointer;
  }
}
.component:hover {
  .shadow {
    display: flex;
  }
}
</style>
