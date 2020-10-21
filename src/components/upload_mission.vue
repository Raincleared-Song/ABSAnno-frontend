<template>
  <div style="margin: 20px;">
    <div>
      请将<em>zip</em>文件上传至此处
    </div>
    <div>
      了解上传
      <a-button
          type="link"
          @click="onClickKnowRule"
      >文件格式</a-button>
    </div>
    <el-upload
        drag
        ref="upload_file"
        action="backend/upload"
        :headers="this.headers"
        name="zip"
        :limit="1"
        :file-list="fileList"
        :before-upload="onBeforeUpload">
      <i class="el-icon-upload"></i>
      <div style="margin: 20px 0">
        Click or drag file to this area to upload
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "upload_mission",
  data() {
    return {
      fileList: [],
      headers: {"X-CSRFToken": ""}
    }
  },
  methods: {
    onBeforeUpload(file) {
      let xmlHttpCsrf = new XMLHttpRequest();
      xmlHttpCsrf.open('GET', 'backend/csrf', false);
      let csrf;
      xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
          if (xmlHttpCsrf.status === 200) {
            csrf = xmlHttpCsrf.responseText;
          } else {
            console.log(xmlHttpCsrf.responseText);
          }
        }
      }
      xmlHttpCsrf.send();
      this.headers['X-CSRFToken'] = csrf;
      return true;
    },
    onClickKnowRule() {
      this.$message("还没写");
    }
  }
}
</script>

<style>

</style>