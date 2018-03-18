<template>
  <div class="head-area">
    <h1 @click="goEdit">{{info.name}}-{{info.id}}</h1>
    <menu-bar></menu-bar>
    <tool-bar></tool-bar>
  </div>
</template>

<script>
import ToolBar from './tool-bar'
import MenuBar from './menu-bar'
import { mapGetters } from 'vuex'

export default {
  name: 'HeadArea',
  data () {
    return {}
  },
  components: {
    ToolBar,
    MenuBar
  },
  computed: {
    ...mapGetters({
      info: 'pageInfo'
    })
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
    color: #555;
  }
  h1 {
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }
</style>