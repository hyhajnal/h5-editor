<template>
  <div class="container">
    <el-row :gutter="10" v-if="attr.width || attr.height" type="flex" align="middle">
      <el-col :span="6" class="label">宽高:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.width" />
        <el-input-number size="small" v-model="attr.height" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.padding" type="flex" align="middle">
      <el-col :span="6" class="label">内边距:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.padding[0]" />
        <el-input-number size="small" v-model="attr.padding[1]" />
        <el-input-number size="small" v-model="attr.padding[2]" />
        <el-input-number size="small" v-model="attr.padding[3]" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.margin" type="flex" align="middle">
      <el-col :span="6" class="label">外边距:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.margin[0]" />
        <el-input-number size="small" v-model="attr.margin[1]" />
        <el-input-number size="small" v-model="attr.margin[2]" />
        <el-input-number size="small" v-model="attr.margin[3]" />
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.background" type="flex" align="middle">
      <el-col :span="6" class="label">背景色:</el-col>
      <el-col :span="18">
        <color-picker v-model="attr.background" />
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" align="middle">
      <el-col :span="6" class="label">圆角:</el-col>
      <el-col :span="18" class="border-box">
        <el-input-number size="small" v-model="attr.borderRadius[0]" style="margin-right: 10px;"/>
        <el-radio-group v-model="attr.borderRadius[1]">
          <el-radio label="px" />
          <el-radio label="%" />
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="10" v-if="attr.border" type="flex" align="middle">
      <el-col :span="6" class="label">边框:</el-col>
      <el-col :span="18" class="border-box">
        <el-input-number size="small" v-model="attr.border[0]" />
        <color-picker
          style="margin: 0 10px;"
          v-model="attr.border[2]"
        />
        <el-select v-model="attr.border[1]" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex" align="middle">
      <el-col :span="6" class="label">绝对定位:</el-col>
      <el-col :span="18" class="input-box">
        <el-switch
          v-model="position"
          active-color="#FED030"
          size="mini">
        </el-switch>
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="position" type="flex" align="middle">
      <el-col :span="6" class="label">定位:</el-col>
      <el-col :span="18" class="input-box">
        <el-input-number size="small" v-model="attr.top" />
        <el-input-number size="small" v-model="attr.right" />
        <el-input-number size="small" v-model="attr.bottom" />
        <el-input-number size="small" v-model="attr.left" />
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="position" type="flex" align="middle">
      <el-col :span="6" class="label">层级:</el-col>
      <el-col :span="18">
        <el-slider
          v-model="attr.zIndex"
          :step="100"
          :max="1000"
          show-stops>
        </el-slider>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex" align="middle">
      <el-col :span="6" class="label">盒子:</el-col>
      <el-col :span="18" class="input-box">
        <el-radio-group v-model="attr.display" size="mini">
          <el-radio label="block">块级</el-radio>
          <el-radio label="flex">弹性</el-radio>
          <el-radio label="inline-block">行内</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
    <el-row :gutter="10" type="flex" align="middle" v-if="attr.display === 'flex'">
      <el-col :span="6" class="label">水平对齐:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="attr.justifyContent" class="align-box">
          <radio-item label="flex-start"><i class="iconfont icon-left" /></radio-item>
          <radio-item label="flex-end"><i class="iconfont icon-right" /></radio-item>
          <radio-item label="space-around"><i class="iconfont icon-space-around" /></radio-item>
          <radio-item label="space-between"><i class="iconfont icon-space-between" /></radio-item>
          <radio-item label="center"><i class="iconfont icon-center" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>
    <!-- justify-content: flex-start | flex-end | center | space-between | space-around; -->

    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
    <el-row :gutter="10" v-if="attr.display === 'flex'">
      <el-col :span="6" class="label">垂直对齐:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="attr.alignItems" class="align-box">
          <radio-item label="flex-start"><i class="iconfont icon-top" /></radio-item>
          <radio-item label="flex-end"><i class="iconfont icon-end" /></radio-item>
          <radio-item label="center"><i class="iconfont icon-middle" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>
    <!-- align-items: flex-start | flex-end | center | baseline | stretch; -->
    <!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ -->
  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
import ColorPicker from '@/components/ColorPicker'
import { toStyleString } from '@/utils/transformStyle'
const init = {
  width: 0,
  height: 0,
  margin: [0, 0, 0, 0],
  padding: [0, 0, 0, 0],
  border: [0, 'solid', '#000'],
  borderRadius: [0, 'px'],
  background: 'transparent',
  display: 'block',
  position: 'relative'
}
export default {
  name: 'Container',
  props: {
    attrData: Object
  },
  data () {
    return {
      attr: init,
      options: [{
        label: '---',
        value: 'dashed'
      }, {
        label: '——',
        value: 'solid'
      }],
      position: false
    }
  },
  mounted () {
    this.attr = { ...init, ...this.attrData }
  },
  watch: {
    attr: {
      handler () {
        this.$store.dispatch('updateStyle', toStyleString(this.attr))
      },
      deep: true
    },
    attrData () {
      this.attr = { ...init, ...this.attrData }
      this.position = this.position === 'absolute'
    },
    position () {
      this.attr.position = this.position ? 'absolute' : 'relative'
      if (!this.position) {
        this.$delete(this.attr, 'left')
        this.$delete(this.attr, 'right')
        this.$delete(this.attr, 'bottom')
        this.$delete(this.attr, 'top')
        this.$delete(this.attr, 'zIndex')
      } else {
        this.attr = {...this.attr, left: 0, top: 0, right: 0, bottom: 0, zIndex: 0}
      }
    },
    'attr.display' () {
      if (this.attr.display === 'block') {
        this.$delete(this.attr, 'alignItems')
        this.$delete(this.attr, 'justifyContent')
      } else {
        this.attr = {...this.attr, justifyContent: 'flex-start', alignItems: 'flex-start'}
      }
    }
  },
  components: {
    RadioBar, RadioItem, ColorPicker
  }
}
</script>

<style scoped lang="scss">
.label {
  margin-top: 4px;
}
.border-box {
  display: flex;
  align-items: center;
}
.input-box {
  margin-top: 6px;
}
</style>

<style>
.std-radio-active i {
  color: orange;
}
.el-radio + .el-radio {
  margin-left: 10px;
}
.el-radio__label {
  padding-left: 5px;
}
.el-radio__inner {
  width: 10px;
  height: 10px;
}
</style>

