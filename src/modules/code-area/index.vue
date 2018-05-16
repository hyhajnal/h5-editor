<template>
  <div class="code-area" id="code-area">
    <h1 class="html-title">
      Vue<i class="iconfont icon-copy" @click="copy"></i>
    </h1>
    <div class="code html">
      <pre v-highlightjs="vue"><code class="html"></code></pre>
    </div>
  </div>
</template>
<script>
import { styleToClass, htmlRender } from '@/utils/transformStyle'
import 'highlight.js/styles/monokai-sublime.css'
import { mapGetters } from 'vuex'
const pretty = require('pretty')

export default {
  name: 'CodeArea',
  data () {
    return {
      vue: '',
      isBind: false
    }
  },
  mounted () {
    this.codeGenerate()
  },
  computed: {
    ...mapGetters({
      info: 'pageInfo',
      list: 'page'
    })
  },
  watch: {
    'info.id' () {
      this.codeGenerate()
    }
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('copy', this.copyHandler, false)
    next()
  },
  methods: {
    copy () {
      if (!this.isBind) {
        document.addEventListener('copy', this.copyHandler, false)
        this.isBind = true
      } else {
        document.execCommand('copy')
      }
    },
    copyHandler (e) {
      e.clipboardData.setData('text/plain', this.vue)
      e.preventDefault()
      this.$notify({
        title: '成功',
        message: '代码复制成功，快去粘贴吧～',
        type: 'success'
      })
    },
    codeGenerate () {
      const treeList = JSON.parse(JSON.stringify(this.list))
      let jsCode = `
        export default {
          name: '${this.info.id}',
          data () {
            return {}
          },
          components: {}
        }
      `
      let html = pretty(`<template>${htmlRender(treeList)}</template>`)
      let js = pretty(`<script>\n${jsCode}<\/script>`)
      let css = pretty(`<style scoped>${styleToClass(treeList)}\n</style>`)
      this.vue = `${html}\n\n${js}\n\n${css}`
    }
  }
}
</script>

<style scoped lang="scss">
.code-area {
  height: 100%;
  position: relative;
  background: #232420;
}
.code {
  height: 100%;
  overflow: auto;
}
code {
  padding: 50px 20px 20px 20px;
}
h1 {
  width: 100%;
  color: #fff;
  text-align: center;
  background: #3a3a42;
  position: absolute;
}
.icon-copy {
  position: absolute;
  right: 20px;
  top: 7px;
  font-size: 18px;
  cursor: pointer;
}
</style>

<style lang="scss">
code {
  span {
    font-size: 16px !important;
  }
}
</style>

