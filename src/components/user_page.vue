<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 450px">

      <!-- 侧栏 -->
      <a-layout-sider theme="light" width="280">
        <div style="margin: 15px">
          <a-avatar :size="220" icon="user">USER</a-avatar>
          <a-upload
              ref="upload-avatar"
              action="#"
              :show-upload-list="false"
              :before-upload="beforeUploadAvatar"
              style="top: -40px; left: 55%; position: relative">
            <a-button shape="round">
              <a-icon type="edit" />Edit
            </a-button>
          </a-upload>


          <!-- 申请发题者 -->
          <a-button
              v-if="power === 0"
              @click="onApplyUpgrade"
              block
              style="margin: 10px 0">
            <a-icon type="rocket" />
            发题者申请
          </a-button>

          <!-- 用户信息展示 -->
          <div v-if="!editing">
            <h3 style="margin: 20px auto">
              {{ this.username }}
            </h3>
            <h4 style="margin: 10px auto">
              用户权限：{{ userPower[this.power + 1] }}
            </h4>
            <a-button
                @click="editing = true"
                type="primary" block
                :disabled="power === -1"
                style="margin: 10px 0">
              <a-icon type="form" />
              Edit profile
            </a-button>
            <basic_info
                style="margin: 10px" />
          </div>

          <!-- 用户信息编辑 -->
          <div v-else>
            <edit_info
                :username="username"
                @submit-edit="editing = false"
                @cancel-edit="editing = false" />
          </div>
        </div>
      </a-layout-sider>

      <i style="width: 2px; background: #f0f0f0" />

      <!-- 做题历史 -->
      <a-layout>
        <a-layout-content style="background: #fff; padding: 30px">
          <a-divider>最新消息</a-divider>
          <div :style="{ padding: '24px', background: '#fff'}">
            <message :username="username" :power="power"/>
          </div>
          <a-divider>答题历史</a-divider>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <history />
          </div>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </div>
</template>

<script>
  import basic_info from "@/components/userpage/basic_info";
  import edit_info from "@/components/userpage/edit_info";
  import history from "@/components/userpage/history";
  import postBackend from "@/utils/postBackend";
  import postFile from "@/utils/postFile";
  import API from "@/utils/API";
  import message from "@/components/userpage/message";

  export default {
    name: "user_page",
    data() {
      return {
        editing: false,
        avatar: null,
        userPower: ['未登录', '用户', '发布者', '管理员']
      }
    },  // end of data
    props: [
      'power',
      'username'
    ],  // end of props
    components: {
      basic_info: basic_info,
      edit_info: edit_info,
      history: history,
      message: message,
    },  // end of components
    methods: {
      onApplyUpgrade() {
        postBackend(API.POST_APPLY.path, {
          type: "upgrade"
        }, jsonObj => {
          if (jsonObj.code === 201) {
            this.$message.success("申请已发送！");
          } else {
            this.$message.error("发送失败！请稍后再试！");
          }
        });
      },
      beforeUploadAvatar(file) {
        const imgTypeOk = file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg';
        if (!imgTypeOk) {
          this.$message.error('Image type error!');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
          return false;
        }
        this.avatar = file;
        return true;
      },
      uploadAvatar() {
        let formData = new FormData();
        formData.append('avatar', this.avatar);
        postFile('/backend/avatar', formData, jsonObj => {
          if (jsonObj.code === 201) {
            this.$message.success('Upload avatar success!');
            this.editing = false;
          } else {
            this.$message.error(jsonObj.data);
          }
        });
      }
    }   // end of methods
  }
</script>

<style scoped>

</style>