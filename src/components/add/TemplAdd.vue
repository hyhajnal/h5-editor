<template>
  <div class="card">
    <i class="el-icon-plus" @click="show = true"></i>

    <!-- Form -->
    <el-dialog title="创建模版" :visible.sync="show">
      <el-form :model="form" ref="add">
        <el-form-item label="模版名称" :label-width="formLabelWidth" prop="name">
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
  name: 'TemplAdd',
  props: {
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
      this.axios.post(`${Config.URL}/editor/project/add`, params).then(data => {
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
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 270px;
}
i {
  font-size: 60px;
  color: #555;
  cursor: pointer;
}
</style>
