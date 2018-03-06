<template>
  <div class="attr-text">
    <el-row :gutter="10">
      <el-col :span="6" class="label">对齐:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="attr.textAlign" class="align-box">
          <radio-item label="left"><i class="iconfont icon-text-left" /></radio-item>
          <radio-item label="right"><i class="iconfont icon-text-right" /></radio-item>
          <radio-item label="center"><i class="iconfont icon-text-center" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6" class="label">字体色:</el-col>
      <el-col :span="18">
        <el-color-picker v-model="attr.color" size="mini" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6" class="label">字号:</el-col>
      <el-col :span="18">
        <el-slider v-model="attr.fontSize" show-input size="small" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
export default {
  name: 'AttrText',
  data () {
    return {
      attr: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 14
      }
    }
  },
  components: {
    RadioBar, RadioItem
  }
}
</script>

<style scoped lang="scss">

</style>

