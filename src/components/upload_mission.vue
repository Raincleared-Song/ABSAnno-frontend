<template>
  <div style="margin: 20px;">
    <div style="margin: 10px">
      请将 <em>zip</em> 文件上传至此处，点击此处了解
      <a-button
          type="link"
          @click="onClickKnowRule">
        上传文件格式
      </a-button>
    </div>

    <el-upload
        drag
        ref="upload_file"
        action="#"
        :accept="zip"
        :file-list="[file]"
        :on-change="onChangeFile"
        :auto-upload="false"
        style="margin: 0 auto">
      <i class="el-icon-upload" />
      <div style="margin: 20px 0">
        Click or drag file to this area to upload
      </div>
    </el-upload>

    <a-button
        @click="sendFile"
        type="primary" style="margin: 10px">
      Upload
    </a-button>
  </div>
</template>

<script>
import API from "@/utils/API";
import postFile from "@/utils/postFile";

export default {
  name: "upload_mission",
  data() {
    return {
      file: undefined
    }
  },
  methods: {
    sendFile() {
      if (this.file === undefined)
        return;
      let formData = new FormData();
      formData.append('zip', this.file.raw);
      postFile(API.POST_NEW_MISSION.path, formData, jsonObj => {
        if (jsonObj.code === 201) {
          console.log(jsonObj);
          this.$message.success("Upload Success!", 1).then(() => {
            this.$router.push("/ground");
          });
        } else {
          console.log(jsonObj);
          this.$message.error(jsonObj.data);
        }
      })
    },
    onChangeFile(file) {
      this.file = file;
    },
    onClickKnowRule() {
      this.$message.info("还没写");
    }
  }
}
</script>

<style>

</style>