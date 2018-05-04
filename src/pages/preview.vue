<template>
  <div class="preview">
    <header><head-area v-if="info"></head-area></header>
    <main>
      <div class="left">
        <resource-module v-if="!isModuleEdit && show" />
        <resource-comp v-if="isModuleEdit && show"/>
      </div>
      <div class="main">
        <!-- <iframe src="./#/mobile" class="preview-area" :style="style" /> -->
        <div class="preview-area" :style="style" >
          <router-view />
        </div>
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
        <code-area v-if="info"></code-area>
      </aside>
    </main>
  </div>
</template>

<script>
import HeadArea from '@/modules/head-area'
import ResourceModule from '@/modules/resource-area/module'
import ResourceComp from '@/modules/resource-area/compUse'
import CodeArea from '@/modules/code-area'
import { mapGetters } from 'vuex'
// import Bus from '@/utils/Bus'
// import Config from '@/utils/config'

export default {
  name: 'Preview',
  data () {
    return {
      show: false,
      width: 375,
      height: 667
    }
  },
  components: {
    HeadArea,
    ResourceModule,
    ResourceComp,
    CodeArea
  },
  computed: {
    ...mapGetters({
      elements: 'page',
      device: 'device',
      isModuleEdit: 'isModuleEdit',
      info: 'info'
    }),
    style () {
      const width = this.device.width
      const height = this.device.height
      const scale = this.device.percent / 100
      const background = (this.$store.state.info && this.$store.state.info.background) || '#fff'
      return `width: ${width}px;height:${height}px;transform:scale(${scale});background:${background};`
    }
  }
}
</script>

<style scoped lang="scss">
  .preview {
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
    position: relative;
    background: #f2f2f2;
  }
  .left {
    overflow: auto;
    background: #fff;
  }
  .preview-area {
    display: block;
    width: 375px;
    height: 667px;
    margin: 40px auto;
    border: none;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
    overflow: auto;
  }
</style>