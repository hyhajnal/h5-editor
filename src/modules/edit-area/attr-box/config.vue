<template>
  <div class="attr-text">

    <el-row :gutter="10" v-for="(item,idx) in config" :key="item.name">
      <el-col :span="6" class="label">{{item.label}}:</el-col>
      <el-col :span="18">
        <el-input v-model="configData[config[idx].name]" placeholder="请输入内容" size="small"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { RadioBar, RadioItem } from '@/components/radio'
export default {
  name: 'Config',
  props: {
    attrData: Array,
    attrProps: Object
  },
  data () {
    return {
      config: [],
      configData: {}
    }
  },
  mounted () {
    this.config = this.attrData
    this.configData = this.attrProps
  },
  watch: {
    attrData: {
      handler () {
        this.config = this.attrData
      },
      deep: true
    },
    configData: {
      handler () {
        this.$store.dispatch('updateConfig', this.configData)
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


