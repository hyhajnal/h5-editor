<template>
  <div class="preview">
    <header><head-area></head-area></header>
    <main>
      <div class="left">
        <resource-module v-if="!isModuleEdit && show" />
        <resource-comp v-if="isModuleEdit && show"/>
      </div>
      <div class="main">
        <preview-area></preview-area>
        <span class="on-off" @click="show = !show">
          <template v-if="isModuleEdit">
            组<br>件<br>列<br>表<br>
          </template>
          <template v-else>
            模<br>件<br>列<br>表<br>
          </template>
          <i :class="!show ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
        </span>
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
import ResourceModule from '@/modules/resource-area/module'
import ResourceComp from '@/modules/resource-area/compUse'
import CodeArea from '@/modules/code-area'
import { mapGetters } from 'vuex'

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
    ResourceModule,
    ResourceComp,
    CodeArea
  },
  computed: {
    ...mapGetters({
      isModuleEdit: 'isModuleEdit'
    })
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