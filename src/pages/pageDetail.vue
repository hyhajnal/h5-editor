<template>
  <div class="preview">
    <header><head-area></head-area></header>
    <main>
      <!-- <div class="left">
        <resource-area v-show="show"></resource-area>
      </div> -->
      <div class="main">
        <preview-area></preview-area>
        <!-- <span class="on-off" @click="show = !show">
          组<br>件<br>列<br>表<br>
          <i :class="!show ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </span> -->
      </div>
      <!-- <aside>
        <code-area></code-area>
      </aside> -->
    </main>
  </div>
</template>

<script>
import HeadArea from '@/modules/head-area'
import PreviewArea from '@/modules/preview-area'
import ResourceArea from '@/modules/resource-area/templ'
import CodeArea from '@/modules/code-area'

export default {
  name: 'Preview',
  data () {
    return {
      show: false
    }
  },
  components: {
    HeadArea,
    PreviewArea,
    ResourceArea,
    CodeArea
  }
}
</script>

<style scoped>
  .preview {
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
    position: relative;
  }
  .left {
    overflow: auto;
  }
  .on-off {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    display: inline-block;
    background: #fff;
    color: #555;
    cursor: pointer;
    padding: 5px 10px 5px 5px;
    font-size: 13px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  aside {
    width: 400px;
    border-left: 1px solid #ddd;
  }
  .main {
    flex: 1;
  }
</style>