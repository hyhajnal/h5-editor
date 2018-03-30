<template>
  <div class="code-area">
    <div class="code html">
      <h1 class="html-title">
        Vue<i class="iconfont icon-copy" @click="copy"></i>
      </h1>
      <pre class="language-markup">
        <code class="language-markup">
          <div v-html="vue"></div>
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import { styleToClass } from '@/utils/transformStyle'
const cssFormat = require('prettyugly')
const Prism = require('prismjs')
require('prismjs/themes/prism-okaidia.css')
const prettifyHtml = require('prettify-html')

export default {
  name: 'CodeArea',
  data () {
    return {
      html: '',
      css: '',
      js: '',
      vue: ''
    }
  },
  mounted () {
    let htmlCode = prettifyHtml(document.getElementById('page').innerHTML
      .replace(/data-v-\w{8}=""\s/g, '')
      // .replace(/style="[\s\S]+"$/g, '')
    )
    let jsCode = `
      export default {
        name: 'Module',
        data () {
          return {}
        },
        components: {}
      }
    `
    // console.log(styleToClass(this.$store.state.list))
    const list = JSON.parse(JSON.stringify(this.$store.state.list))
    const cssCode = cssFormat.pretty(styleToClass(list))
    let css = Prism.highlight(cssCode, Prism.languages.css)
    let html = Prism.highlight(htmlCode, Prism.languages.markup)
    const js = Prism.highlight(jsCode, Prism.languages.javascript)
    this.vue = `
      &lt;template&gt;
        ${html}
      &lt;/template&gt;
      &lt;script&gt;
        ${js}
      &lt;/script&gt;
      &lt;style scoped&gt;
        ${css}
      &lt;/style&gt;
    `
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
        type: 'success',
        duration: 100,
        showClose: false
      })
      // this.$message.info('代码复制成功，快去粘贴吧～')
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
