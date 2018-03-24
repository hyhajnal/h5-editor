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
    <mobile v-show="route !== 'Home'" />
    <tool-bar></tool-bar>
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