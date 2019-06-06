<template>
  <div class="image-resource" v-if="info">
    <el-upload
        class="upload"
        :action="baseUrl + '/editor/img/upload'"
        :show-file-list="false"
        :data="extra"
        name="image"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        multiple
        :limit="1">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    <ul v-if="images.length > 0">
      <li v-for="(item, idx) in images"
        class="component-item"
        :key="item.id"
      >
        <img :src="'/static/upload/'+item.url" alt="图片资源库">
        <p class="clearfix">
          <i class="el-icon-delete" @click="del(idx, item)"></i>
          <span @click="copy(item.url)">点击复制链接</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Config from '@/utils/config'
export default {
  name: 'ImageResource',
  data () {
    return {
      baseUrl: Config.URL
    }
  },
  computed: {
    ...mapGetters({
      images: 'images',
      info: 'info'
    }),
    // 上传图片额外的参数
    extra () {
      return {pageId: this.info && this.info.id}
    }
  },
  methods: {
    del (i, item) {
      this.axios.get(`${Config.URL}/editor/img/del`, {
        params: item
      }).then(data => {
        if (data !== 1000) {
          this.$message({type: 'success', message: '成功删除该图片'})
          this.$store.commit('delImage', i)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      // const data = `${Config.URL}/static/upload/${res.data}`
      this.$store.commit('addImage', res.data)
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    copy (url) {
      document.addEventListener('copy', e => this.copyHandler(e, url), false)
      document.execCommand('copy')
    },
    copyHandler (e, url) {
      let Url = `/static/upload/${url}`
      e.clipboardData.setData('text/plain', Url)
      e.preventDefault()
      this.$message({
        message: '图片链接复制成功',
        type: 'success'
      })
    },
    beforeDestroy () {
      document.removeEventListener('copy', this.copyHandler, false)
    }
  }
}
</script>

<style scoped lang="scss">
  .image-resource {
    background: #fff;
    padding: 15px;
    color: #555;
    width: 240px;
  }
  li {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 15px;
  }
  img {
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
  i {
    float: left;
    cursor: pointer;
  }
  span {
    float: right;
    font-size: 12px;
    cursor: pointer;
  }
  p {
    padding: 4px;
  }
</style>
