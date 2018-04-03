<template>
  <div class="card" :style="cardStyle">
    <i class="el-icon-plus" @click="show = true"></i>

    <!-- Form -->
    <el-dialog :title="'创建' + typeStr" :visible.sync="show">
      <el-form :model="form" ref="add">
        <el-form-item :label="typeStr +'名称'" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="show = false">取 消</el-button>
        <el-button type="primary" @click.stop="addModule">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form -->

  </div>
</template>

<script>
import Config from '@/utils/config'
export default {
  name: 'AddCard',
  props: {
    type: String,
    page: Number
  },
  data () {
    return {
      show: false,
      form: {
        name: '',
        elements: JSON.stringify({
          elements: []
        })
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    typeStr () {
      let str = ''
      switch (this.type) {
        case 'module':
          str = '模块'
          break
        case 'project':
          str = '项目'
          break
        case 'page':
          str = '页面'
          break
      }
      return str
    },
    cardStyle () {
      const height = this.type === 'page' ? '470px' : '270px'
      return `height: ${height}`
    }
  },
  methods: {
    addModule () {
      this.show = false
      let params = {
        page: this.page,
        data: this.form
      }
      if (this.type === 'page') {
        const projectId = parseInt(this.$route.query.id)
        params.data = {...this.form, projectId}
      }
      this.axios.post(`${Config.URL}/editor/${this.type}/add`, params).then(data => {
        this.$refs.add.resetFields()
        if (data !== 1000) {
          this.$message({type: 'success', message: '创建成功'})
          this.$emit('after-add', data)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  overflow: hidden;
  background: #fff;
  // border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 270px;
}
i {
  font-size: 60px;
  color: #555;
  cursor: pointer;
}
</style>
