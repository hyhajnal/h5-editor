
<!-- 组件卡片 -->

<template>
  <div class="component">
    <h1 class="title">{{comp.name}}</h1>
    <p class="desc">{{comp.desc}}</p>
    <card-bottom
      class="bottom"
      :visitCount="comp.visitCount"
      :useCount="comp.useCount"
      :collectCount="comp.collectCount"
    />
    <el-row class="shadow" type="flex" justify="space-around" align="middle">
      <i class="el-icon-circle-plus-outline" @click.stop="addComp" v-if="!isAdd"></i>
      <i class="el-icon-circle-check-outline" v-else></i>
      <i class="el-icon-more-outline" @click="openInfo"></i>
      <i class="el-icon-edit" @click="editComp"></i>
      <i class="el-icon-delete" @click="delComp"></i>
    </el-row>
    <el-dialog title="组件信息" :visible.sync="show">
      <ul>
        <li><strong>组件名：</strong><span>{{comp.name}}</span></li>
        <li><strong>组件类型：</strong><span>{{comp.tag}}</span></li>
        <li><strong>组件标签：</strong><span>{{comp.type}}</span></li>
        <li><strong>组件描述：</strong><span>{{comp.desc}}</span></li>
        <li>
          <strong>组件属性：</strong>
          <el-table
            :data="config"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="属性"
              width="150">
            </el-table-column>
            <el-table-column
              prop="label"
              label="属性名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="type"
              label="属性类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="data"
              label="默认值"
              width="150">
            </el-table-column>
          </el-table>
        </li>
      </ul>
    </el-dialog>
    <!-- Form -->
    <el-dialog title="修改组件" :visible.sync="showEdit">

      <p>请按实例填写组件内容以及配置，按确定修改组件</p>
      <div ref="jsoneditor" style="width: 100%; height: 400px;"></div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="submit">修 改</el-button>
      </div>
    </el-dialog>
    <!-- Form -->
  </div>
</template>

<script>
import CardBottom from './Bottom'
import Config from '@/utils/config'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

export default {
  name: 'CompCard',
  data () {
    return {
      isAdd: false,
      editor: null,
      show: false,
      showEdit: false,
      edit: null
    }
  },
  mounted () {
    const components = this.$store.state.components
    components.forEach(item => {
      if (item.id === this.comp.id) {
        this.isAdd = true
        return false
      }
    })
  },
  props: {
    comp: Object,
    idx: Number
  },
  components: {
    CardBottom
  },
  computed: {
    config () {
      return this.comp.config && JSON.parse(this.comp.config)
    }
  },
  methods: {
    addComp () {
      if (!this.$store.state.info) {
        this.$message.error('当前没有正在编辑的页面')
        return
      }
      this.axios.get(`${Config.URL}/editor/page/addResource`, {
        params: {
          pageId: this.$store.state.info.id,
          resourceId: this.comp.id,
          type: 1}
      }).then(data => {
        if (data !== 1000) {
          this.$store.commit('addComp', this.comp)
          this.isAdd = true
          this.$notify({
            title: '成功',
            message: '已添加至组件库',
            type: 'success'
          })
        }
      })
    },
    openInfo () {
      this.show = true
    },
    delComp () {
      this.axios.get(`${Config.URL}/editor/comp/del`, {
        params: {id: this.comp.id}
      }).then(data => {
        if (data !== 1000) {
          this.$message({type: 'success', message: '成功删除该组件'})
          this.$emit('after-del', this.idx)
        }
      })
    },
    // json编辑器
    editComp () {
      this.showEdit = true
      const json = {
        'name': this.comp.name,
        'type': this.comp.type,
        'tag': this.comp.tag,
        'desc': this.comp.desc,
        'content': JSON.parse(this.comp.content),
        'config': this.config
      }
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
    submit () {
      this.showEdit = false
      let comp = this.editor.get()
      comp.config = JSON.stringify(comp.config)
      comp.content = JSON.stringify(comp.content)
      let params = {
        id: this.comp.id,
        data: comp
      }
      this.axios.post(`${Config.URL}/editor/comp/edit`, params).then(data => {
        if (data !== 1000) {
          this.$message({type: 'success', message: '修改成功'})
          this.$emit('after-edit', this.idx, data)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  padding: 14px;
  background: #ffff;
  border-radius: 4px;
  height: 100px;
  position: relative;
}
.title {
  font-size: 14px;
  color: #555;
}
.desc {
  font-size: 12px;
  color: #909090;
  margin: 4px 0 14px 0;
}
.shadow {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  i {
    color: #fff;
    font-size: 28px;
    cursor: pointer;
  }
}
.component:hover {
  .shadow {
    display: flex;
  }
}
li {
  margin-bottom: 10px;
  display: flex;
}
ul {
  span {
    background: #F6F7F8;
    padding: 4px 10px;
    flex: 1;
    display: block;
  }
  strong {
    margin-right: 10px;
    width: 100px;
    display: inline-block;
    padding: 4px 0;
  }
}
</style>
