<template>
  <!-- <badge text="1"></badge> -->
  <el-upload
    class="avatar-uploader"
    action="http://localhost:8360/editor/img/upload"
    :show-file-list="false"
    name="image"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
// import Config from '@/utils/config'
export default {
  name: 'Img',
  props: {
    ele: Object
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      const url = `localhost/static/upload/${res.data}`
      this.imageUrl = url
      this.$store.dispatch('updateConfig', [{
        name: 'url', label: 'url', type: 'input', data: url
      }])
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader {
    display: inline-block;
    width: 178px;
    height: 178px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

