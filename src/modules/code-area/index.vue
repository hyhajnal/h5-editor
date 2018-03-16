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
  </div>
</template>

<script>
var Prism = require('prismjs')
require('prismjs/themes/prism-okaidia.css')
export default {
  name: 'CodeArea',
  data () {
    return {
      html: '',
      css: ''
    }
  },
  mounted () {
    const htmlCode = `
      <template>
        <div class="code-area">
          <div class="code html">
            <pre class="language-javascript">
              <code class="language-javascript">
                <div v-html="html"></div>
              </code>
            </pre>
          </div>
          <div class="code css">{{css}}</div>
        </div>
      </template>
    `
    const cssCode = ` 
    .code-area {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #272823;
    }
    .code {
      flex: 1;
      overflow: auto;
    }
    .html {
      border-bottom: 1px solid #ddd;
    }`
    this.css = Prism.highlight(cssCode, Prism.languages.css)
    this.html = Prism.highlight(htmlCode, Prism.languages.markup)
  }
}
</script>

<style scoped lang="scss">
$head: 60px;
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
.html {
  // border-bottom: 4px solid #ccc;
}
pre {
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
  flex: 1;
  overflow: auto;
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
