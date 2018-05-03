<template>
  <search
      v-model="value"
      position="absolute"
      top="46px"
      ref="search"
      @search-bg-color="'#fff'"
    />
</template>

<script>
import { Search } from 'vux'
export default {
  name: 'CustomSearch',
  props: {
    ele: Object
  },
  data () {
    return {
      value: ''
    }
  },
  components: { Search },
  methods: {
    // setFocus () {
    //   this.$refs.search.setFocus()
    // }
  }
}
</script>

<style scoped>
</style>

