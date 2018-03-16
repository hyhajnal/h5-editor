<template>
  <div class="home">
    <header><head-area></head-area></header>
    <main>
      <div class="main">
        <preview-area></preview-area>
      </div>
      <aside>
        <code-area></code-area>
      </aside>
    </main>
  </div>
</template>

<script>
import HeadArea from '@/modules/head-area'
import PreviewArea from '@/modules/preview-area'
import CodeArea from '@/modules/code-area'

export default {
  name: 'Home',
  data () {
    return {}
  },
  mounted () {},
  components: {
    HeadArea,
    PreviewArea,
    CodeArea
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
    background: #FED030;
    transition: all .5s;
  }
  main {
    display: flex;
    flex: 1;
  }
  aside {
    flex: 1;
    border-left: 1px solid #ddd;
  }
  .main {
    width: 800px;
  }
</style>