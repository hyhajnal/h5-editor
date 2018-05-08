<template>
  <div class="tool-bar">
    <ul>
      <template v-if="route === 'Edit'">
        <li @click="clear">
          <i class="iconfont icon-delete"></i>
          <span>清空</span>
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
    <router-link :to="{name: 'Login'}" v-if="!user">
      <el-button type="danger" size="mini">登录</el-button>
    </router-link>
    <router-link :to="{name: 'Me'}" v-else>
      <div class="avatar"></div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      this.$router.push({ path: 'preview/mobile' })
    },
    save () {
      this.$emit('save')
    },
    clear () {
      this.$store.commit('clear')
    }
  },
  computed: {
    route () {
      return this.$route.name
    },
    ...mapGetters({
      user: 'user'
    })
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
    background: url('../../assets/2.jpg');
    background-size: cover;
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
  li {
    cursor: pointer;
  }
</style>