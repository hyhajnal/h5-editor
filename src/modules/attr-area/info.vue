<template>
  <ul class="info">
    <li>
      <span class="label">页面名:</span>
      <span class="value">
        <input type="text" v-model="pageInfo.name">
      </span>
    </li>
    <li>
      <span class="label">设计师:</span>
      <span class="value">
        <input type="text" v-model="owner">
      </span>
    </li>
    <li>
      <span class="label">背景色:</span>
      <span class="value background">
        <color-picker v-model="pageInfo.background" />
      </span>
    </li>
    <li>
      <span class="label">图标链接:</span>
      <span class="value">
        <input type="text" v-model="pageInfo.iconLink">
      </span>
    </li>
  </ul>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
import { mapGetters } from 'vuex'
export default {
  name: 'Info',
  data () {
    return {
      pageInfo: {
        name: '',
        background: '#fff',
        iconLink: ''
      },
      owner: ''
    }
  },
  mounted () {
    this.pageInfo = this.info
  },
  watch: {
    pageInfo: {
      handler () {
        this.$store.commit('changeInfo', {...this.info, ...this.pageInfo})
      },
      deep: true
    },
    // 切换页面时，改变info
    'info.id' () {
      this.pageInfo = this.info
    },
    'pageInfo.iconLink' () {
      this.addCssByLink()
    }
  },
  methods: {
    addCssByLink () {
      const len = document.getElementsByTagName('link').length

      // 如果iconLink为空，则删除之前添加的link
      if (!this.pageInfo.iconLink && len === 3) {
        document.getElementsByTagName('link')[2].remove()
      }
      let url = `https:${this.pageInfo.iconLink}`

      // 修改link的url  或 添加link
      if (len === 3) {
        document.getElementsByTagName('link')[2].setAttribute('href', url)
      } else {
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', url)
        const head = document.getElementsByTagName('head')[0]
        this.pageInfo.iconLink && head.appendChild(link)
      }
    }
  },
  computed: {
    ...mapGetters({
      info: 'info'
    })
  },
  components: { ColorPicker }
}
</script>

<style scoped lang="scss">
.info {
  padding: 10px 20px;
  font-size: 14px;
  color: #555;
  height: 100vh;
}
li {
  margin-bottom: 15px;
}
.label {
  width: 70px;
  display: inline-block;
}
.value {
  background: #F6F7F8;
  border-radius: 2px;
  display: inline-block;
  padding: 4px 10px;
}
.background {
  background: #fff;
  padding: 4px 0;
}
input {
  border: none;
  background: #F6F7F8;
  color: #5b6b73;
}
</style>
