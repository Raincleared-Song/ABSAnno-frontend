<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

      <!-- 侧栏 -->
      <a-layout-sider theme="light" width="320">
        <div style="margin: 15px">
          <a-avatar :size="260" icon="user">USER</a-avatar>

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
              用户权限：{{ userPower[this.power? this.power + 1: 0] }}
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

      <i style="width: 1px; background: #f0f0f0" />

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
import API from "@/utils/API";
import message from "@/components/userpage/message"
export default {
  name: "user_page",
  data() {
    return {
      editing: false,
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
    }
  }   // end of methods
}
</script>

<style scoped>

</style>