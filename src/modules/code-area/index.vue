<template>
  <div class="code-area">
    <div class="code html">
      <h1 class="html-title">HTML</h1>
      <pre class="language-markup">
        <code class="language-markup">
          <div v-html="html"></div>
        </code>
      </pre>
    </div>
    <div class="code css">
      <h1 class="css-title">CSS</h1>
      <pre class="language-css">
        <code class="language-css">
          <div v-html="css"></div>
        </code>
      </pre>
    </div>
    <div class="code js">
      <h1 class="css-title">JS</h1>
      <pre class="language-javascript">
        <code class="language-javascript">
          <div v-html="js"></div>
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
      js: ''
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
    this.css = Prism.highlight(cssCode, Prism.languages.css)
    this.html = Prism.highlight(htmlCode, Prism.languages.markup)
    this.js = Prism.highlight(jsCode, Prism.languages.javascript)
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
  // border-bottom: 1px solid #ddd;
}
.css-title {
  top: 50%;
}
</style>
