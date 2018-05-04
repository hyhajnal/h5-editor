<template>
  <div class="card" @click="goEdit" v-if="templ">
    <!-- <figure class="card-image">
      <el-row class="shadow" type="flex" justify="space-around" align="middle">
        <i class="el-icon-circle-plus"></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-menu" @click.stop="open"></i>
      </el-row>
    </figure> -->
    <div class="card-image">
      <custom-element
        v-if="elements.length > 0"
        v-for="el in elements"
        :key="el.id"
        :element="el"
      />
      <figure v-if="elements.length === 0"></figure>
      <el-row class="shadow" type="flex" justify="space-around" align="middle">
        <i class="el-icon-circle-plus" @click.stop="addTempl" v-if="!isAdd"></i>
        <i class="el-icon-success" v-else></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-menu" @click.stop="open"></i>
      </el-row>
    </div>
    <section class="card-body">
      <h3 class="title">{{templ.name}}</h3>
      <card-bottom
        :visitCount="templ.visitCount"
        :useCount="templ.useCount"
        :collectCount="templ.collectCount"
      />
    </section>
    <span class="tag" v-if="tag">{{tag}}</span>

    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible"
      width="30%"
      @close.stop="close">
      <span>这是一段信息</span>
    </el-dialog>

  </div>
</template>

<script>
import CardBottom from './Bottom'
import CustomElement from '@/modules/preview-area/custom-element'
import Config from '@/utils/config'
export default {
  name: 'TemplCard',
  data () {
    return {
      dialogVisible: false,
      elements: [],
      isAdd: false,
      tag: ''
    }
  },
  props: {
    templ: Object
  },
  components: {
    CardBottom,
    CustomElement
  },
  mounted () {
    if (this.templ.elements) {
      this.elements = JSON.parse(this.templ.elements).children
    }
    // isAdd 标记
    const templs = this.$store.state.templs
    templs.forEach(item => {
      if (item.id === this.templ.id) {
        this.isAdd = true
        return false
      }
    })
    // tag
    this.tag = (this.templ.tag.charCodeAt() === 39) ? '' : this.templ.tag
  },
  methods: {
    goEdit () {
      this.$store.dispatch('changeCurrent', this.templ)
      this.$router.push({name: 'Edit', query: {id: this.templ.id}})
    },
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    // 保存至数据库
    addTempl () {
      if (!this.$store.state.info) {
        this.$message.error('当前没有正在编辑的页面')
        return
      }
      this.axios.get(`${Config.URL}/editor/page/addResource`, {
        params: {
          pageId: this.$store.state.info.id,
          resourceId: this.templ.id,
          type: 2}
      }).then(data => {
        if (data !== 1000) {
          const { id, name } = this.templ
          this.$store.commit('addTempl', {
            id, name, elements: this.elements
          })
          this.isAdd = true
          this.$notify({
            title: '成功',
            message: '已添加至模版库',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 270px;
  background: #fff;
}
.card-image {
  height: 200px;
  position: relative;
  border-bottom: 1px solid #ddd;
}
figure {
  width: 100%;
  height: 100%;
  background-image: url('../assets/none.png');
  background-size: cover;
}
.shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);
  z-index: 100;
  position: absolute;
  top: 0;
  left:0;
  display: none;
  i {
    color: #fff;
    font-size: 42px;
  }
}
.card-image:hover {
  .shadow {
    display: flex;
  }
}
.card-body {
  padding: 10px;
  background: #fff;
}
.tag {
  position: absolute;
  top: 20px;
  right: 0;
  background: #4ED7EC;
  color: #fff;
  font-size: 13px;
  padding: 2px 10px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-right: -2px;
}
</style>
