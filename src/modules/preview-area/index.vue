<template>
  <div class="edit-area">
    <page />
  </div>
</template>

<script>
import Page from './page'
export default {
  name: 'PreviewArea',
  data () {
    return {}
  },
  components: {
    Page
  }
}
</script>

<style scoped>
  .edit-area {
    height: 100%;
    overflow: auto;
    position: relative;
    background: #F7F7F7;
  }
  .zoom-box {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
  }
</style>