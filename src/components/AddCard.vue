<template>
  <div class="card">
    <i class="el-icon-plus" @click="show = true"></i>

    <!-- Form -->
    <el-dialog :title="'创建' + typeStr" :visible.sync="show">
      <el-form :model="form">
        <el-form-item :label="typeStr +'名称'" :label-width="formLabelWidth">
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
        elements: JSON.stringify([])
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    typeStr () {
      return this.type === 'module' ? '模块' : '项目'
    }
  },
  methods: {
    addModule () {
      this.show = false
      this.axios.post(`${Config.URL}/editor/module/add`, {
        page: this.page,
        module: this.form
      }).then(data => {
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
  height: 270px;
}
i {
  font-size: 60px;
  color: #555;
  cursor: pointer;
}
</style>
