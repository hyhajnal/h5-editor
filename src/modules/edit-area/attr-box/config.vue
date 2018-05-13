<template>
  <div class="attr-text">

    <el-row :gutter="10"
      v-for="(item,idx) in config"
      :key="item.name"
      class="config-item"
      v-if="(!config[idx].show) || (config[idx].show && config[config[idx].show-1].data)"
    >
      <template v-if="config[idx].type && config[idx].type !== 'table'">
        <el-col :span="6" class="label">{{item.label}}:</el-col>
        <el-col :span="18">

          <el-input
            v-if="config[idx].type === 'input'"
            v-model="config[idx].data"
            placeholder="请输入内容"
            size="mini"
          />

          <el-input-number v-if="config[idx].type === 'number'"
            size="mini"
            v-model="config[idx].data"
          />

          <el-select v-if="config[idx].type === 'select'"
            v-model="config[idx].data"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in config[idx].options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-switch v-if="config[idx].type === 'bool'"
            v-model="config[idx].data">
          </el-switch>

          <color-picker v-if="config[idx].type === 'color'"
            v-model="config[idx].data"
          />

          <el-upload v-if="config[idx].type === 'upload'"
            class="upload"
            action="http://localhost:8360/editor/img/upload"
            :show-file-list="false"
            name="image"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-col>
      </template>

      <template v-else>
        <config-table v-model="config[idx].data" v-if="config[idx].data" @change="change"/>
      </template>


    </el-row>

  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
import ConfigTable from './configTable'
import Config from '@/utils/config'
import ColorPicker from '@/components/ColorPicker'
export default {
  name: 'Config',
  props: {
    attrData: Array
  },
  data () {
    return {
      config: []
    }
  },
  mounted () {
    this.config = this.attrData
  },
  watch: {
    attrData: {
      handler () {
        this.config = this.attrData
      },
      deep: true
    },
    config: {
      handler () {
        this.$store.dispatch('updateConfig', this.config)
      },
      deep: true
    }
  },
  components: {
    RadioBar, RadioItem, ConfigTable, ColorPicker
  },
  methods: {
    change () {
      console.log('change')
      this.$store.dispatch('updateConfig', this.config)
    },
    formatWeight (val) {
      if (val === 40) {
        return 'normal'
      }
      if (val === 70) {
        return 'bold'
      }
      return val * 10
    },
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      const url = `${Config.URL}/static/upload/${res.data}`
      // this.imageUrl = url
      this.$store.dispatch('updateConfig', [{
        name: 'url', label: 'url', type: 'input', data: url
      }])
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style scoped lang="scss">
.config-item {
  margin-bottom: 10px;
}
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
  .el-input {
    width: auto;
  }

}
</style>


