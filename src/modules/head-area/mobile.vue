<template>
  <div class="mobile-config">
    <el-row :gutter="15" type="flex" justify="center" align="middle">
      <el-col :span="5">
        <el-select v-model="device" placeholder="请选择" size="mini" @change="changeDevice">
          <el-option
            v-for="item in mobiles"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="4" class="input-group">
        <el-row type="flex" align="middle">
          <el-col :span="10">
            <el-input v-model="size.width" placeholder="请输入内容" size="mini" :disabled="true"></el-input>
          </el-col>
          <el-col :span="4" style="textAlign: center;">
            x
          </el-col>
          <el-col :span="10">
            <el-input v-model="size.height" placeholder="请输入内容" size="mini" :disabled="true"></el-input>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="3" class="input-group">
        <el-input v-model="percent" placeholder="请输入内容" size="mini" @change="changeDevice">
          <template slot="append">%</template>
        </el-input>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { mobiles } from '@/utils/help'
export default {
  name: 'Mobile',
  data () {
    return {
      mobiles: mobiles,
      device: mobiles[0].label,
      percent: 100
    }
  },
  computed: {
    size () {
      const idx = mobiles.findIndex(d => d.label === this.device)
      return {
        width: mobiles[idx].width,
        height: mobiles[idx].height
      }
    }
  },
  methods: {
    changeDevice () {
      this.$store.commit('changeDevice', {
        label: this.device,
        ...this.size,
        percent: this.percent
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mobile-config {
  height: 100%;
}
</style>

<style lang="scss">
.mobile-config {
  .input-group {
    .el-input-group__append, .el-input-group__prepend {
      padding: 0 4px;
    }
    .el-input__inner {
      text-align: center;
      padding: 0 5px;
    }
  }
}
</style>

