<template>
  <span :style="ele.style" v-if="ele.config">
    {{ele.config[0].data}}
  </span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    ele: Object
  }
}
</script>

