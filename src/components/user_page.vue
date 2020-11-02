<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

      <!-- 侧栏 -->
      <a-layout-sider theme="light" width="280">
        <div style="margin: 15px">
          <a-avatar :size="240" icon="user">USER</a-avatar>

          <!-- 用户信息展示 -->
          <div v-if="!editing">
            <h3 style="margin: 15px auto">
              {{ this.username }}
            </h3>
            <h4 style="margin: 10px auto">
              用户权限：{{ userPower[this.power? this.power + 1: 0] }}
            </h4>
            <a-button
                @click="editing = true"
                type="primary" block
                :disabled="power === 0"
                style="margin: 10px 0">
              Edit profile
            </a-button>
            <basic_info style="margin: 10px"/>
          </div>

          <!-- 用户信息编辑 -->
          <div v-else-if="power > 0">
            <edit_info
                @cancel="editing = false" />
          </div>
        </div>
      </a-layout-sider>

      <!-- 做题历史 -->
      <a-layout>
        <a-layout-content style="background: #fff; padding: 80px">
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
    history: history
  }
}
</script>

<style scoped>

</style>