<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

      <!-- 侧栏 -->
      <a-layout-sider theme="light" v-model="collapsed">
        <a-avatar :size="64" icon="user">USER</a-avatar>
        <!-- 这里要从数据库拿名字和身份，显示在下方 -->
        <h3>{{ this.username }}</h3>
        <h4>用户权限：{{ this.userPower[this.power? this.power + 1: 0] }}</h4>

        <a-menu theme="light" :defaultOpenKeys="['4']" mode="inline">
          <a-menu-item
              key="1"
              @click="pageNumber = 0">
            <a-icon type="pie-chart"/>
            <span>基本信息</span>
          </a-menu-item>

          <a-menu-item
              key="2"
              @click="pageNumber = 1">
            <a-icon type="desktop"/>
            <span>答题历史</span>
          </a-menu-item>

          <a-menu-item
              key="3"
              @click="pageNumber = 2"
              :selectable="this.power === 1 || this.power === 2">
            <!-- 当且仅当当前用户为发布者时，可以看到这一条 -->
            <a-icon type="edit"/>
            <span>我的发布</span>
          </a-menu-item>

          <a-menu-item
              key="4"
              @click="pageNumber = 3">
            <a-icon type="sliders"/>
            <span>修改用户信息</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <!-- 正文 -->
      <a-layout>
        <a-layout-content style="background: #fff; padding: 80px">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <router-view/>
          </div>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </div>
</template>

<script>
export default {
  name: "user_page",
  data() {
    return {
      collapsed: false,
      pageNumber: 3,
      userid: -1,
      userPower: ['未登录', '用户', '发布者', '管理员']
    }
  },  // end of data
  props: [
    'power',
    'username'
  ],  // end of props
  watch: {
    pageNumber(newVal) {
      console.log(`watch pageNumber ${newVal}`);
      const routerList = [
        '/user/info',
        '/user/edit',
        '/user/history',
        '/user/pub'
      ];
      this.$router.push(routerList[newVal]);
    }
  }   // end of watch
}
</script>

<style scoped>

</style>