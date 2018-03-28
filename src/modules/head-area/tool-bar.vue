<template>
  <div class="tool-bar">
    <ul>
      <template v-if="route === 'Edit'">
        <li v-show="!isSaving" @click="save">
          <i class="iconfont icon-save"></i>
          <span>保存</span>
        </li>
        <li v-show="isSaving">
          <i class="el-icon-loading"></i>
          <span>保存中</span>
        </li>
        <li @click="preview">
          <i class="iconfont icon-preview"></i>
          <span>预览</span>
        </li>
      </template>
      <template v-if="route === 'Preview'">
        <li>
          <i class="iconfont icon-publish"></i>
          <span>发布</span>
        </li>
        <li @click="preview">
          <i class="iconfont icon-down"></i>
          <span>下载</span>
        </li>
        <li @click="preview">
          <i class="iconfont icon-code"></i>
          <span>二维码</span>
        </li>
      </template>
    </ul>
    <img src="../../assets/2.jpg" class="avatar" alt="avatar" width="40" height="40">
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      edit: true
    }
  },
  props: {
    isSaving: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    preview () {
      this.$router.push({name: 'Preview'})
    },
    save () {
      this.$emit('save')
    }
  },
  computed: {
    route () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool-bar {
    display: flex;
    align-items: center;
  }
  ul {
    height: 60px;
    display: flex;
    align-items: center;
  }
  li {
    text-align: center;
    width: 60px;
    span {
      font-size: 13px;
      margin-top: 5px;
      display: block;
    }
  }
  i {
    display: block;
    font-size: 18px;
  }
  .avatar {
    border-radius: 100%;
    margin-left: 40px;
  }
  li {
    cursor: pointer;
  }
</style>