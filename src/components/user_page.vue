<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

      <!-- 侧栏 -->
      <a-layout-sider theme="light" v-model="collapsed">
        <!-- 用户信息 -->
        <div style="margin: 15px">
          <a-avatar :size="64" icon="user">USER</a-avatar>
          <h3 style="margin: 15px auto">
            {{ this.username }}
          </h3>
          <h4 style="margin: 10px auto">
            用户权限：{{ this.userPower[this.power? this.power + 1: 0] }}
          </h4>
        </div>

        <!-- 菜单栏 -->
        <a-menu
            v-model="selectedKeys"
            theme="light"
            mode="inline">
          <a-menu-item
              key="0">
            <a-icon type="pie-chart"/>
            <span>基本信息</span>
          </a-menu-item>
          <a-menu-item
              key="1">
            <a-icon type="desktop"/>
            <span>答题历史</span>
          </a-menu-item>
          <a-menu-item
              key="2"
              :selectable="this.power === 1 || this.power === 2">
            <!-- 当且仅当当前用户为发布者时，可以看到这一条 -->
            <a-icon type="edit"/>
            <span>我的发布</span>
          </a-menu-item>
          <a-menu-item
              key="3">
            <a-icon type="sliders"/>
            <span>修改个人信息</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <!-- 正文 -->
      <a-layout>
        <a-layout-content style="background: #fff; padding: 80px">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <router-view :username="username" :power="power"/>
          </div>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </div>
</template>

<script>

const routerList = [
  '/user/info',
  '/user/history',
  '/user/pub',
  '/user/edit',
];

export default {
  name: "user_page",
  data() {
    return {
      collapsed: false,
      pageNumber: 0,
      userid: -1,
      userPower: ['未登录', '用户', '发布者', '管理员'],
      selectedKeys: ['0']
    }
  },  // end of data
  props: [
    'power',
    'username'
  ],  // end of props
  watch: {
    // selectedKeys和$route.path相互绑定
    selectedKeys: {
      handler(newVal) {
        const pageNumber = parseInt(newVal[0]);
        if (this.$route.path !== routerList[pageNumber])
          this.$router.push(routerList[pageNumber]);
      },
      deep: true
    },
    '$route.path': {
      handler(newVal) {
        routerList.forEach((router, index) => {
          if (router === newVal)
            this.selectedKeys = [index.toString()];
        });
      },
      immediate: true
    }
  }   // end of watch
}
</script>

<style scoped>

</style>