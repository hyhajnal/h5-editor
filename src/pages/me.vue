<template>
  <div class="me-wrap">
    <div class="shadow"></div>
    <header>
      <router-link :to="{name: 'Home'}">
        <h2><i class="iconfont icon-design"></i>H5 Editor</h2>
      </router-link>
    </header>

    <el-row class="me-info">
      <el-col :span="5">
        <div class="avatar"></div>
      </el-col>
      <el-col :span="19">
        <h1>一介草民游走</h1>
        <p>这个同学很懒，都没有写签名哦～</p>
      </el-col>
    </el-row>

    <main>
      <div class="main">
        <el-row class="toolbar" type="flex" justify="space-around">
          <span style="background: #FD7F6B;"><i class="iconfont icon-search"></i></span>
          <span style="background: #29C2C1;"><i class="iconfont icon-paixu"></i></span>
          <span style="background: #9124EC;"><i class="iconfont icon-add"></i></span>
        </el-row>

        <el-row>
          <el-col :span="5" class="menu-side">
            <me-menu @select="onSelect"/>
          </el-col>
          <el-col :span="19" class="content-list">
            <me-project v-if="select.type === 'project'"/>
            <me-templ v-if="select.type === 'templ'"/>
            <me-comp v-if="select.type === 'comp'"/>
            <me-mod v-if="select.type === 'mod'"></me-mod>
          </el-col>
        </el-row>

      </div>
    </main>

  </div>
</template>

<script>
import MeMenu from '@/modules/me/Menu'
import MeProject from '@/modules/me/Project'
import MeComp from '@/modules/me/Comp'
import MeTempl from '@/modules/me/Templ'
import MeMod from '@/modules/me/Mod'

export default {
  name: 'Me',
  data () {
    return {
      search: '',
      select: {
        type: 'project'
      }
    }
  },
  components: {
    MeMenu,
    MeProject,
    MeMod,
    MeComp,
    MeTempl
  },
  methods: {
    onSelect (select) {
      this.select = select
    }
  }
}
</script>

<style scoped lang="scss">
.me-wrap {
  background: url('../assets/bg.jpeg') 0 0 repeat;
  background-size: 50%;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.shadow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
}
header {
  width: 100vw;
  height: 60px;
  transition: all .5s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #FFF;
  position: fixed;
  h2 {
    color: #fff !important;
  }
  i {
    margin-right: 10px;
  }
}
.me-info {
  padding-top: 80px;
  h1 {
    margin-top: 10px;
    color: #fff;
  }
  p {
    color: #ddd;
    margin-top: 20px;
  }
}
.avatar {
  border-radius: 100%;
  margin: auto;
  background: url('../assets/2.jpg');
  background-size: cover;
  width: 120px;
  height: 120px;
  border: 5px solid #fff;
}
main {
  position: absolute;
  top: 0;
  padding-top: 240px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .main {
    background: #fff;
    position: relative;
  }
}
.toolbar {
  position: absolute;
  z-index: 999;
  top: -25px;
  right: 50px;
  width: 200px;
  span {
    display: inline-block;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
  }
}
.menu-side {
  height: 100%;
}
.content-list {
  padding: 40px 60px;
  background: #f2f2f2;
  min-height: 100vh;
}
</style>

<style lang="scss">
  .me-wrap {
    .el-input__inner {
      border: none;
      border-radius: 20px;
    }
    .el-menu {
      border-right: 0;
    }
  }
</style>
