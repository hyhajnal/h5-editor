<template>
  <div class="card">
    <i class="el-icon-plus" @click="clickAdd"></i>

    <!-- Form -->
    <el-dialog title="创建组件" :visible.sync="show">

      <p>请按实例填写组件内容以及配置，按确定创建组件</p>
      <div ref="jsoneditor" style="width: 100%; height: 400px;"></div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form -->

  </div>
</template>

<script>
import Config from '@/utils/config'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

const json = {
  'name': '按钮',
  'type': 'van-button',
  'tag': '按钮',
  'desc': '这是一个按钮',
  'content': {
    'domProps': {}
  },
  'config': [
    { 'name': 'type', 'label': '类型', 'type': 'select', 'data': 'default', 'options': ['default', 'primary', 'danger'] },
    { 'name': 'size', 'label': '大小', 'type': 'select', 'data': 'small', 'options': ['large', 'small', 'mini'] },
    { 'name': 'text', 'label': '内容', 'type': 'input', 'data': '按钮' }
  ]
}

export default {
  name: 'CompAdd',
  props: {
    page: Number
  },
  data () {
    return {
      show: false,
      editor: null
    }
  },
  methods: {
    clickAdd () {
      this.show = true
      setTimeout(() => {
        var container = this.$refs.jsoneditor
        var options = {
          mode: 'code'
        }
        if (!this.editor) {
          const editor = new JSONEditor(container, options)
          editor.set(json)
          this.editor = editor
        }
      }, 1000)
    },
    reset () {
      this.editor.set(json)
    },
    submit () {
      this.show = false
      const comp = this.editor.get()
      let params = {
        page: this.page,
        data: comp
      }
      this.axios.post(`${Config.URL}/editor/comp/add`, params).then(data => {
        this.reset()
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
  height: 100px;
}
i {
  font-size: 60px;
  color: #555;
  cursor: pointer;
}
p {
  margin-bottom: 5px;
}
</style>
