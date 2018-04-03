<template>
  <div class="attr-text">

    <el-row :gutter="10" v-for="(item,idx) in config" :key="item.name">
      <el-col :span="6" class="label">{{item.label}}:</el-col>
      <el-col :span="18">

        <el-input
          v-if="config[idx].type === 'input'"
          v-model="config[idx].data"
          placeholder="请输入内容"
          size="mini"
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

      </el-col>
    </el-row>

  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
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
    RadioBar, RadioItem
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
  .el-input {
    width: auto;
  }

}
</style>


