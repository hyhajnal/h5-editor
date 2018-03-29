<template>
  <div class="edit">
    <header>
      <head-area :isSaving="isSaving" @save="save"></head-area>
    </header>
    <main>
      <div class="left">
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

export default {
  name: 'Edit',
  data () {
    return {
      isSaving: false,
      timer: 0
    }
  },
  mounted () {
    const mod = JSON.parse(window.localStorage.getItem('mod'))
    let { pageInfo } = this.$store.state
    // debugger
    // 刷新: localStorage 里有值
    if (!pageInfo && mod) {
      this.$store.dispatch('changeModule', mod)
    }
    // const modNew = {
    //   id: pageInfo ? pageInfo.id : mod.id,
    //   name: pageInfo ? pageInfo.name : mod.name,
    //   elements: list ? JSON.stringify({elements: list}) : mod.elements
    // }
    // 定时保存 store -> localStorage
    // this.timer = setInterval(() => {
    //   this.isSaving = true
    //   setTimeout(() => {
    //     this.isSaving = false
    //   }, 1000)
    //   window.localStorage.setItem('mod', JSON.stringify(modNew))
    // }, 5000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    this.save()
    next()
  },
  methods: {
    save () {
      const { pageInfo, list } = this.$store.state
      this.saveLocal(pageInfo, list)
      this.axios.post(`${Config.URL}/editor/module/edit`, {
        id: pageInfo.id,
        name: pageInfo.name,
        elements: JSON.stringify({elements: list})
      }).then(data => {
        data !== 1000 && this.$message({type: 'success', message: '保存成功'})
      })
    },
    saveLocal (pageInfo, list) {
      const mod = {
        id: pageInfo.id,
        name: pageInfo.name,
        elements: JSON.stringify({elements: list})
      }
      window.localStorage.setItem('mod', JSON.stringify(mod))
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

<style scoped>
  .edit {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  header {
    height: 60px;
    background: #FD7F6B;
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
  }
</style>