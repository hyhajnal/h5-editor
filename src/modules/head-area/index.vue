<template>
  <div class="head-area">
    <h1>
      <router-link :to="{name: 'Home'}">
        <i class="iconfont icon-design"></i>
      </router-link>
      <span v-if="isModuleEdit" @click="changeToPage">{{pageInfo.name}}</span>
      <span v-else>首页</span>

    </h1>

    <div class="center-area">
      <h1 class="title">
        <i class="el-icon-arrow-left"
          v-if="show.prev"
          @click="prev"
        />
        <router-link :to="{name: 'Edit'}" v-if="title || info">
          {{title || info.name}}
        </router-link>
        <i class="el-icon-arrow-right"
          v-if="show.next"
          @click="next"
        />
      </h1>
      <el-input
        style="width: 400px;"
        v-if="route === 'Home'"
        placeholder="请输入内容"
        class="search-input"
        v-model="input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <mobile v-if="route === 'Preview'" />
    </div>

    <tool-bar :isSaving="isSaving" @save="save"></tool-bar>
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
    },
    title: String
  },
  components: {
    ToolBar,
    MenuBar,
    Mobile
  },
  computed: {
    ...mapGetters({
      info: 'pageInfo',
      isModuleEdit: 'isModuleEdit'
    }),
    route () {
      return this.$route.name
    },
    pageInfo () {
      return this.$store.state.info
    },
    show () {
      if (this.isModuleEdit) {
        const idx = this.info.idx
        return {
          prev: idx > 0 ? 1 : 0,
          next: idx < this.$store.state.modules.length ? 1 : 0
        }
      } else {
        return { next: false, prev: false }
      }
    }
  },
  methods: {
    goEdit () {
      this.$router.push({
        name: 'Edit'
      })
    },
    save () {
      this.$emit('save')
    },
    changeToPage () {
      this.$store.commit('changeToPage')
    },
    prev () {
      this.$store.dispatch('changeCurrent', this.info.idx - 1)
    },
    next () {
      this.$store.dispatch('changeCurrent', this.info.idx + 1)
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
    position: relative;
  }
  .center-area {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-arrow-left {
    margin-right: 10px;
  }
  .el-icon-arrow-right {
    margin-left: 10px;
  }

  .icon-design {
    font-size: 20px;
  }
  a {
    color: #fff;
  }
</style>