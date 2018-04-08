<template>
  <div class="code-area">
    <div class="code html">
      <h1 class="html-title">
        Vue<i class="iconfont icon-copy" @click="copy"></i>
      </h1>
      <pre v-highlightjs="vue"><code class="html"></code></pre>
    </div>
  </div>
</template>
<script>
import { styleToClass, htmlRender } from '@/utils/transformStyle'
import 'highlight.js/styles/monokai-sublime.css'
const pretty = require('pretty')

export default {
  name: 'CodeArea',
  data () {
    return {
      vue: ''
    }
  },
  mounted () {
    const treeList = JSON.parse(JSON.stringify(this.$store.state.list))
    let jsCode = `
      export default {
        name: 'Module',
        data () {
          return {}
        },
        components: {}
      }
    `
    // let code = '<!-- html -->'
    let code = `<template>${htmlRender(treeList)}</template>`
    // code += '\n<!-- js code -->'
    code += `<script>\n${jsCode}<\/script>`
    // code += '\n<!-- style -->'
    code += `<style scoped>${styleToClass(treeList)}\n</style>`
    this.vue = pretty(code)
  },
  methods: {
    copy () {
      document.addEventListener('copy', this.copyHandler, false)
      document.execCommand('copy')
    },
    copyHandler (e) {
      e.clipboardData.setData('text/plain', this.vue)
      e.preventDefault()
      this.$notify({
        title: '成功',
        message: '代码复制成功，快去粘贴吧～',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.code-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.code {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
pre {
  margin: 0 !important;
  // padding: 0 !important;
  border-radius: 0 !important;
  flex: 1;
  overflow: auto;
  width: 100%;
}
h1 {
  width: 100%;
  color: #fff;
  text-align: center;
  background: #3a3a42;
  position: relative;
  // border-bottom: 1px solid #ddd;
}
.icon-copy {
  position: absolute;
  right: 20px;
  top: 7px;
  font-size: 18px;
  cursor: pointer;
}
.css-title {
  top: 50%;
}
</style>
