<template>
  <div class="tool-bar">
    <ul>
      <template v-if="route === 'Edit'">
        <li @click="clear">
          <i class="iconfont icon-delete"></i>
          <span>清空</span>
        </li>
        <li @click="revert">
          <i class="iconfont icon-revert"></i>
          <span>撤回</span>
        </li>
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

    <user-avatar></user-avatar>

  </div>
</template>

<script>
import UserAvatar from '@/modules/head-area/user-avatar'
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
  components: {UserAvatar},
  methods: {
    preview () {
      this.$router.push({ path: 'preview/mobile' })
    },
    save () {
      this.$emit('save')
    },
    clear () {
      this.$store.commit('clear')
    },
    revert () {
      this.$store.commit('revert')
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
  li {
    cursor: pointer;
  }
</style>