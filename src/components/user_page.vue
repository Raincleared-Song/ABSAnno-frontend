<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

      <a-layout-sider theme="light" v-model="collapsed">
        <a-avatar :size="64" icon="user">USER</a-avatar>
        <!--          这里要从数据库拿名字和身份，显示在下方-->
        <h3>{{this.username}}</h3>
        <h4>用户权限:{{this.user_power[this.power+1]}}</h4>
        <!--        :default-selected-keys="['4']"-->

        <a-menu theme="light"  :defaultOpenKeys="['4']" mode="inline">
          <a-menu-item key="1" @click="change(0)" @select="simplefunc()">
            <a-icon type="pie-chart" />
            <span>基本信息</span>
          </a-menu-item>
          <a-menu-item key="2" @click="change(1)">
            <a-icon type="desktop"/>
            <span>答题历史</span>
          </a-menu-item>
          <a-menu-item key="3" @click="change(2)" :selectable="this.power===1 || this.power===2">
            <!-- 当且仅当当前用户为发布者时，可以看到这一条 -->
            <a-icon type="edit" />
            <span>我的发布</span>
          </a-menu-item>
          <a-menu-item key="4" @click="change(3)">
            <a-icon type="sliders" />
            <span>修改用户信息</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-content style="background: #fff; padding: 80px">
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <basic_info v-show="0===page_number"/>
            <history v-show="1===page_number"/>
            <publicate v-show="2===page_number"/>
            <edit_info v-show="3===page_number"/>
          </div>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </div>
</template>

<script>
  import history from '@/components/userpage/history.vue'
  import basic_info from '@/components/userpage/basic_info.vue'
  import edit_info from '@/components/userpage/edit_info.vue'
  import publicate from '@/components/userpage/publicate.vue'

  export default {
    name: "user_page",
    components: {history, basic_info, edit_info, publicate},
    data () {
      return {
        collapsed: false,
        page_number: 3,
        userid: -1,
        pageList: ['user', 'history', 'mission', 'editUser'],
        pageListChinese: ['用户信息', '答题历史', '我的发布', '修改个人信息'],
        user_power: ['未登录', '用户', '发布者', '管理员'],
        user_name: this.username,
      }
    },
    props: [
      "power",
      "username"
    ],
    methods: {
      change: function (index) {
        this.page_number = index;
        // console.log(this.pageList)
      },
    },

  }

</script>
<style scoped>


</style>