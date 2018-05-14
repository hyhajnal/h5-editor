<template>
  <div class="link">
    <el-row :gutter="10" type="flex" align="middle">
      <el-col :span="6" class="label">链接:</el-col>
      <el-col :span="18" class="input-box">
        <span v-if="options.length === 0">该项目还没有其它页面哦！</span>
        <el-select v-model="link" placeholder="请选择" size="mini" v-else>
          <el-option key="nolink" :value="''" label="不设置链接"></el-option>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Config from '@/utils/config'
export default {
  name: 'Link',
  props: {
    linkData: Number,
    id: [String, Number]
  },
  data () {
    return {
      link: '',
      options: []
    }
  },
  mounted () {
    this.getPages()
  },
  watch: {
    link () {
      this.$store.dispatch('updateLink', this.link)
    },
    id () {
      this.link = this.linkData || ''
    }
  },
  methods: {
    getPages () {
      const projectId = this.$store.state.info.projectId
      this.axios.get(`${Config.URL}/editor/project/getPages`, {
        params: { id: projectId }
      }).then(data => {
        this.options = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
}
</style>
