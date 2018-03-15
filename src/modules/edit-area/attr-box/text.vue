<template>
  <div class="attr-text">
    <el-row :gutter="10" v-if="attr.textAlign">
      <el-col :span="6" class="label">对齐:</el-col>
      <el-col :span="18" class="input-box">
        <radio-bar v-model="attr.textAlign" class="align-box">
          <radio-item label="left"><i class="iconfont icon-text-left" /></radio-item>
          <radio-item label="right"><i class="iconfont icon-text-right" /></radio-item>
          <radio-item label="center"><i class="iconfont icon-text-center" /></radio-item>
        </radio-bar>
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="attr.color">
      <el-col :span="6" class="label">字体色:</el-col>
      <el-col :span="18">
        <color-picker v-model="attr.color" />
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="attr.fontSize">
      <el-col :span="6" class="label">字号:</el-col>
      <el-col :span="18">
        <el-slider v-model="attr.fontSize" show-input size="small" />
      </el-col>
    </el-row>

    <el-row :gutter="10" v-if="attr.fontWeight">
      <el-col :span="6" class="label">粗细:</el-col>
      <el-col :span="18">
        <el-slider v-model="attr.fontWeight"
          size="small"
          :step="10"
          show-stops
          :max="90"
          :format-tooltip="formatWeight"
        />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
import { toStyleString } from '@/utils/transformStyle'
import ColorPicker from '@/components/ColorPicker'
const init = {
  color: '#000',
  fontSize: 16,
  fontWeight: 40
}
export default {
  name: 'AttrText',
  data () {
    return {
      attr: init
    }
  },
  props: {
    attrData: Object
  },
  watch: {
    attr: {
      handler () {
        this.$store.dispatch('updateStyle', toStyleString(this.attr))
      },
      deep: true
    },
    attrData () {
      this.attr = {...init, ...this.attrData}
    }
  },
  components: {
    RadioBar, RadioItem, ColorPicker
  },
  methods: {
    formatWeight (val) {
      if (val === 40) {
        return 'normal'
      }
      if (val === 70) {
        return 'bold'
      }
      return val * 10
    }
  }
}
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
.attr-text {
  .el-slider__runway.show-input {
    margin-right: 60px;
  }
  .el-slider__runway {
    margin: 10px 0;
    height: 4px;
  }
  .el-slider__bar {
    height: 4px;
  }
  .el-slider__button {
    width: 12px;
    height: 12px;
  }
  .el-slider__button-wrapper {
    top: -16px;
  }
  .el-slider__stop {
    width: 4px;
    height: 4px;
  }

}
</style>


