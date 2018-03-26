<template>
  <div class="head-area">
    <h1>
      <router-link :to="{name: 'Home'}">
        <i class="iconfont icon-design"></i>
      </router-link>
      <router-link :to="{name: 'Edit'}">
        {{info.name}}-{{info.id}}
      </router-link>
    </h1>
    <!-- <menu-bar></menu-bar> -->
    <el-input
      style="width: 400px;"
      v-if="route === 'Home'"
      placeholder="请输入内容"
      class="search-input"
      v-model="input">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <mobile v-if="route !== 'Home'" />
    <tool-bar :isSaving="isSaving"></tool-bar>
  </div>
</template>

<script>
import ToolBar from './tool-bar'
import MenuBar from './menu-bar'
import Mobile from './mobile'
import { mapGetters } from 'vuex'

export default {
  name: 'HeadArea',
  data () {
    return {}
  },
  props: {
    isSaving: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ToolBar,
    MenuBar,
    Mobile
  },
  computed: {
    ...mapGetters({
      info: 'pageInfo'
    }),
    route () {
      return this.$route.name
    }
  },
  methods: {
    goEdit () {
      this.$router.push({
        name: 'Edit'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .head-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #FFF;
  }
  h1 {
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }
  .icon-design {
    font-size: 20px;
  }
  a {
    color: #fff;
  }
</style>