<template>
  <div class="page" id="page" ref="page"
    :style="style"
  >
    <custom-element
      v-for="item in elements"
      :key="item.id"
      :element="item"
    />
  </div>
</template>

<script>
import CustomElement from './custom-element'
import { mapGetters } from 'vuex'
export default {
  name: 'Page',
  data () {
    return {
      width: 375,
      height: 667
    }
  },
  components: {
    CustomElement
  },
  computed: {
    ...mapGetters({
      elements: 'page',
      device: 'device'
    }),
    style () {
      const width = this.device.width
      const height = this.device.height
      const scale = this.device.percent / 100
      return `width: ${width}px;height:${height}px;transform:scale(${scale})`
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.page {
  margin: 40px auto;
  background: #fff;
  overflow: auto;
}
</style>
