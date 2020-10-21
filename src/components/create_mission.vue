<template>
  <a-layout style="padding: 24px 0; background: #fff;">

    <!-- 任务编辑区 -->
    <a-layout-content style="margin: 10px 40px;">
      <h1>编辑任务</h1>
      <a-form-model
          ref="mission_form"
          :model="mission_info"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 15, offset: 1 }">
        <a-form-model-item
            ref="name"
            label="任务名称"
            prop="name">
          <a-input
              v-model.trim="mission_info.name"
              @blur="$refs.name.onFieldBlur()"
              @change="$refs.name.onFieldChange()"
              allow-clear />
        </a-form-model-item>
        <a-form-model-item
            ref="type"
            label="任务类型"
            prop="type">
          <a-select
              v-model="mission_info.type"
              @blur="$refs.type.onFieldBlur()"
              @change="$refs.type.onFieldChange()">
            <a-select-option value="judgement">判断题任务</a-select-option>
            <a-select-option value="checkbox">选择题任务</a-select-option>
            <a-select-option value="text">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
            label="标注次数下限" prop="min">
            <a-input-number
                v-model.trim.number="mission_info.min" />
        </a-form-model-item>
        <a-form-model-item
            label="任务截止期限" prop="ddl">
          <a-date-picker v-model="mission_info.ddl" />
        </a-form-model-item>
        <a-form-model-item
            label="分发对象" prop="tags">
          <a-select
              v-model="mission_info.tags"
              mode="tags">
            <a-select-option :key="'student'">
              学生
            </a-select-option>
            <a-select-option :key="'teacher'">
              教师
            </a-select-option>
            <a-select-option :key="'me'">
              程序员
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <div>
        请上传文件或者
        <a-button type="link" @click="onEditClick">
            手动添加题目
        </a-button>
      </div>
      <div style="margin: 20px;">
        <el-upload
            drag
            ref="upload_file"
            action="backend/upload"
            :headers="this.headers"
            name="zip"
            :limit="1"
            :file-list="fileList"
            :before-upload="onBeforeUpload"
        >
          <i class="el-icon-upload"></i>
          <p>Click or drag file to this area to upload</p>
        </el-upload>
<!--        <a-button-->
<!--            @click="handleUploadFile"-->
<!--            :disabled="formData === undefined">-->
<!--          Submit File-->
<!--        </a-button>-->
      </div>

    </a-layout-content>
  </a-layout>
</template>

<script>
import API from "@/utils/API";
import postFile from "@/utils/postFile";
import postBackend from "@/utils/postBackend";

export default {
  name: "create_mission",
  data() {
    return {
      rules: {
        name: [{ required: true, message: 'Mission name cannot be null.', trigger: 'blur' }],
        type: [{ required: true, message: 'Mission type cannot be null.', trigger: 'blur' }]
      },
      fileList: [],
      headers: {"X-CSRFToken": ""}
    };
  },
  props: {
    mission_info: {
      type: Object,
      default() {
        return {
          name: '',
          type: '',
          min: 10,
          ddl: null,
          tags: []
        };
      }
    }
  },
  methods: {
    onEditClick() {
      this.$refs.mission_form.validate(valid => {
        if (valid) {
          this.$emit('on-submit-info', this.mission_info);
        } else {
          this.$message.warning("error submit");
        }
      });
    },
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
      console.log(csrf)
      this.headers['X-CSRFToken'] = csrf;
      console.log(this.headers)
      return true;
    }
  }
}
</script>

<style>

</style>
