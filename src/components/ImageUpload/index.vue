<template>
  <div>
    <!-- 上传头像 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条组件 -->
    <el-progress v-if="showProgress" :percentage="percent" style="width: 180px;" />
    <!-- 预览头像 -->
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
import Cos from 'cos-js-sdk-v5'

const cos = new Cos({
  SecretId: 'AKIDtkvu22yjIdlfQyUqzvzrTq8E6j7av41j',
  SecretKey: 'iGZdXBav6B5rPmunQzUlmJgpkTyCA2mJ'
})

export default {
  data() {
    return {
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      showProgress: false,
      percent: 0,
      fileList: []
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file是删除的文件
    // fileList是剩下的
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      // 显示进度条
      this.showProgress = true
      // 最后一定要return true，否则返回undefined
      return true
    },
    // 进行上传操作
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'web-study-1317064413', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          onProgress: function(progressData) {
            // console.log(JSON.stringify(progressData))
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            // 说明上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 为了看到效果，延迟执行
            setTimeout(() => {
              this.showProgress = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
