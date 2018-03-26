<template>
  <div class="edit">
    <header>
      <head-area :isSaving="isSaving"></head-area>
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

export default {
  name: 'Edit',
  data () {
    return {
      isSaving: false,
      timer: 0
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.isSaving = true
      setTimeout(() => {
        this.isSaving = false
      }, 1000)
      window.localStorage.setItem('elements', JSON.stringify(this.$store.state.list))
    }, 5000)
  },
  destroyed () {
    clearInterval(this.timer)
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
  .home {
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