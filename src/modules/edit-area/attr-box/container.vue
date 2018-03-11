<template>
  <div class="container">
    <el-row :gutter="10" v-if="attr.width || attr.height">
      <el-col :span="6" class="label">宽高:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.width" v-if="attr.width"/>
        <el-input-number size="small" v-model="attr.height" v-if="attr.height" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.padding">
      <el-col :span="6" class="label">内边距:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.padding[0]" />
        <el-input-number size="small" v-model="attr.padding[1]" />
        <el-input-number size="small" v-model="attr.padding[2]" />
        <el-input-number size="small" v-model="attr.padding[3]" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.margin">
      <el-col :span="6" class="label">外边距:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.margin[0]" />
        <el-input-number size="small" v-model="attr.margin[1]" />
        <el-input-number size="small" v-model="attr.margin[2]" />
        <el-input-number size="small" v-model="attr.margin[3]" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.background">
      <el-col :span="6" class="label">背景色:</el-col>
      <el-col :span="18">
        <el-color-picker v-model="attr.background" size="mini" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.border">
      <el-col :span="6" class="label">边框:</el-col>
      <el-col :span="18" class="border-box">
        <el-input-number size="small" v-model="attr.border[0]" />
        <el-color-picker
          style="margin: 0 10px;"
          v-model="attr.border[1]"
          size="mini"
        />
        <el-select v-model="attr.border[2]" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
    <el-row :gutter="10">
      <el-col :span="6" class="label">水平排列:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="justifyContent" class="align-box">
          <radio-item label="left"><i class="iconfont icon-left" /></radio-item>
          <radio-item label="right"><i class="iconfont icon-right" /></radio-item>
          <radio-item label="center"><i class="iconfont icon-center" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>

    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
    <el-row :gutter="10">
      <el-col :span="6" class="label">垂直排列:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="alignItems" class="align-box">
          <radio-item label="top"><i class="iconfont icon-top" /></radio-item>
          <radio-item label="bottom"><i class="iconfont icon-end" /></radio-item>
          <radio-item label="middle"><i class="iconfont icon-middle" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>
    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
import { toStyleString } from '@/utils/transformStyle'
export default {
  name: 'Container',
  props: {
    attrData: Object
  },
  data () {
    return {
      attr: this.attrData,
      options: [{
        label: '---',
        value: 'dash'
      }, {
        label: '——',
        value: 'solid'
      }],
      justifyContent: 'center',
      alignItems: 'top'
    }
  },
  watch: {
    attr: {
      handler () {
        this.$store.commit('updateStyle', toStyleString(this.attr))
      },
      deep: true
    },
    attrData () {
      this.attr = this.attrData
    }
  },
  components: {
    RadioBar, RadioItem
  }
}
</script>

<style scoped lang="scss">
.label {
  margin-top: 2px;
}
.border-box {
  display: flex;
  align-items: center;
}
</style>

<style>
.std-radio-active i {
  color: orange;
}
</style>

