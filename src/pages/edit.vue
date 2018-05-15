<template>
  <div class="edit">
    <header>
      <head-area :isSaving="isSaving" @save="saveLocal" :left="left"></head-area>
    </header>
    <main>
      <div class="left" v-if="!isModuleEdit">
        <resource-area></resource-area>
      </div>
      <div class="main">
        <edit-area></edit-area>
      </div>
      <aside>
        <attr-area></attr-area>
      </aside>
    </main>
  </div>
</template>

<script>
import HeadArea from '@/modules/head-area'
import EditArea from '@/modules/edit-area'
import ResourceArea from '@/modules/resource-area'
import AttrArea from '@/modules/attr-area'
import Config from '@/utils/config'
import { mapGetters } from 'vuex'
import hotkeys from 'hotkeys-js'

export default {
  name: 'Edit',
  data () {
    return {
      isSaving: false,
      timer: 0
    }
  },
  mounted () {
    !this.info && this.getData()
    hotkeys('⌘+s', e => {
      e.preventDefault()
      this.saveLocal()
    })
    // 撤回
    hotkeys('⌘+z', e => {
      e.preventDefault()
      this.$store.commit('revert')
    })
  },
  destroyed () {
    hotkeys.unbind('⌘+s')
    hotkeys.unbind('⌘+z')
  },
  beforeRouteLeave (to, from, next) {
    this.save()
    next()
  },
  computed: {
    ...mapGetters({
      isModuleEdit: 'isModuleEdit',
      pageInfo: 'pageInfo',
      list: 'page'
    }),
    left () {
      return this.isModuleEdit ? this.pageInfo.name : localStorage.getItem('project')
    }
  },
  methods: {
    // 保存至数据库
    save () {
      let pageInfo = this.pageInfo
      const height = document.getElementById('page').style.height
      pageInfo.height = height && parseInt(height.split('px')[0])
      const list = this.list
      this.saveLocal()
      this.axios.post(`${Config.URL}/editor/page/edit`, {
        ...pageInfo,
        elements: JSON.stringify(list)
      }).then(data => {
        data !== 1000 && this.$message({type: 'success', message: '保存成功'})
      })
    },
    // 保存至localStorage
    saveLocal () {
      let pageInfo = this.pageInfo
      const height = document.getElementById('page').style.height
      pageInfo.height = height && parseInt(height.split('px')[0])
      const list = this.list
      this.isSaving = true
      const mod = {
        id: pageInfo.id,
        name: pageInfo.name,
        elements: JSON.stringify(list)
      }
      window.localStorage.setItem('page', JSON.stringify(mod))
      // 显示“保存中...”
      setTimeout(() => {
        this.isSaving = false
      }, 500)
    },
    getData () {
      this.axios.get(`${Config.URL}/editor/page/detail`, {
        params: { id: this.$route.query.id }
      }).then(data => {
        this.$store.dispatch('changeCurrent', data)
      })
    }
  },
  components: {
    HeadArea,
    EditArea,
    ResourceArea,
    AttrArea
  }
}
</script>

<style scoped lang="scss">
  .edit {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  header {
    height: 60px;
    background: $themeColor;
    transition: all .5s;
  }
  main {
    display: flex;
    flex: 1;
  }
  .left {
    /* border-right: 1px solid #ddd; */
    height: 100%;
    overflow: auto;
  }
  aside {
    width: 300px;
    border-left: 1px solid #ddd;
  }
  .main {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>