<template>
  <div style="padding: 24px 0;">
    <div style="margin: 30px 0">
    <span style="margin: 15px">
      <strong>编辑个人信息</strong>
    </span>
    <a-button
        @click="visible = true" type="link">
      修改密码<a-icon type="edit" />
    </a-button>
    </div>
    <a-modal
        :visible="visible"
        title='Change Your Password'
        okText='Submit'
        @cancel="visible = false"
        @ok="changePassword">
      <a-form layout='vertical' :form="password_form">
        <a-form-item label='Previous Password'>
          <a-input-password
              v-model="password_form.prevPassword" />
        </a-form-item>
        <a-form-item label='New Password'>
          <a-input-password
              v-model="password_form.newPassword" />
        </a-form-item>
        <a-form-item label='ConfirmPassword'>
          <a-input-password
              v-model="password_form.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>


    <!-- 编辑信息表单区 -->
    <a-form-model
        ref="user_info"
        :model="user_info"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16, offset: 0 }">

      <a-form-model-item
          label="用户名"
          prop="username">
        <a-input v-model="user_info.username">
          <a-icon slot="prefix" type="user"/>
          <a-tooltip slot="suffix" title="You can change your username here">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item
          label="任务标签"
          prop="tags">
        <a-select
            mode="multiple"
            v-model="user_info.mission_tags"
            placeholder="你偏好的任务标签">
          <a-select-option
              v-for="(tag, idx) in missionTags"
              :key="tag">
            {{ tag }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>

    <!-- 按钮区域 -->
    <div class="buttons" style="margin: 10px auto">
      <a-button-group block>
        <a-button
            @click="cancel"
        >Cancel</a-button>
        <a-button
            @click="submit"
            type="primary"
        >Submit</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>

import getBackend from "@/utils/getBackend";
import postBackend from "@/utils/postBackend";

export default {
  name: "edit_info",
  props: [
      'username'
  ],  // end of props
  data() {
    return {
      user_info: {
        username: this.username,
        mission_tags: []
      },
      missionTags: [
          "青年", "中年", "老年", "学生",
          "教师", "上班族", "研究者",
          "人脸识别", "图片识别", "文字识别",
          "AI写作", "翻译校对", "文本分析",
          "生活场景", "工作场景", "购物", "运动", "旅游",
          "动物", "道德准则", "地理", "科学", "心理学"
      ],
      password_form: {
        prevPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      visible: false
    };
  },  // end of data
  methods: {
    submit() {
      postBackend('/backend/info', {
        tags: this.user_info.mission_tags.join(',')
      }, jsonObj => {
        if (jsonObj.code === 201) {
          this.$message.success('Edit Profile Success!', 1).then(() => {
            this.$emit('submit-edit');
          });
        } else {
          this.$message.error(jsonObj.data, 1);
        }
      })
    },
    cancel() {
      this.$emit('cancel-edit');
    },
    changePassword() {
      postBackend('/backend/changepw', {
        old_password: this.password_form.prevPassword,
        new_password_1: this.password_form.newPassword,
        new_password_2: this.password_form.confirmPassword
      }, jsonObj => {
        if (jsonObj.code === 201) {
          this.$message.success(jsonObj.data, 1).then(() => {
            this.visible = false;
            this.password_form.prevPassword = '';
            this.password_form.newPassword = '';
            this.password_form.confirmPassword = '';
          });
        } else {
          this.$message.error(jsonObj.data, 1);
        }
      })
    },
    formatter(value) {
      return `${value}`;
    }
  },  // end of methods
  mounted: function () {
    getBackend('/backend/info', {}, jsonObj => {
      if (jsonObj.code === 201) {
        const dataObj = getDataObj(jsonObj);
        console.log(dataObj)
        this.user_info.mission_tags = dataObj.tags.split(',');
      } else {
        this.$message.error(jsonObj.data, 1);
      }
    })
  }   // end of mounted
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

</style>