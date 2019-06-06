<template>
  <div>
    <router-link :to="{name: 'Login'}" v-if="!user">
      <el-button type="danger" size="mini">登录</el-button>
    </router-link>
    <el-dropdown v-else>
      <div class="avatar"></div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{name: 'Me'}">
                个人中心
              </router-link>
            </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Config from '@/utils/config'
export default {
  name: 'UserAvatar',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      if (document.cookie && localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'))
      } else {
        this.getUserInfo()
      }
    },
    getUserInfo() {
      this.axios.get('/api/editor/login/getUserInfo').then(data => {
        if (data !== 1000) {
          this.user = data
          localStorage.setItem('user', JSON.stringify(data))
        }
      })
    },
    logout () {
      this.axios.get(`${Config.URL}/editor/login/logout`).then(data => {
        if (data !== 1000) {
          this.$notify({
            title: '成功',
            message: '退出成功',
            type: 'success'
          })
          localStorage.setItem('user', null)
          this.$router.push({name: 'Login'})
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar {
  background: url('/static/avatar.jpeg');
  background-size: cover;
  width: 28px;
  height: 28px;
  border-radius: 4px;
}
</style>

