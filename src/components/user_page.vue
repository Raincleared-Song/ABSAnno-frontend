<template>

  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider theme="light" v-model="collapsed" collapsible>
        <div class="logo" />
        <a-avatar :size="64" icon="user">USER</a-avatar>
        <!--          这里要从数据库拿名字和身份，显示在下方-->
        <h3>{{this.user_name}}</h3>
        <h4>用户权限：用户，发布者，管理员</h4>
        <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="1" @click="change(0)">
            <a-icon type="pie-chart" />
            <span>基本信息</span>
          </a-menu-item>
          <a-menu-item key="2" @click="change(1)">
            <a-icon type="desktop"/>
            <span>答题历史</span>
          </a-menu-item>
          <a-menu-item key="3" @click="change(2)">
            <!-- 当且仅当当前用户为发布者时，可以看到这一条 -->
            <a-icon type="edit" />
            <span>我的发布</span>
          </a-menu-item>
          <a-menu-item key="4" @click="change(3)">
            <a-icon type="sliders" />
            <span>待定</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">{{pageListChinese[this.page_number]}}</a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <!--          填写下方的四个div中的内容，预计有表格、列表、输入框等等。-->
            <div v-show="0===page_number">
              <p>这是用户信息界面</p>
            </div>
            <div v-show="1===page_number">
              <p>这是答题历史界面</p>
            </div>
            <div v-show="2===page_number">
              <p>这是我的发布界面</p>
            </div>
            <div v-show="3===page_number">
              <p>这是待定界面</p>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

  </div>

</template>

<script>
  export default {
    name: "user_page",
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        collapsed: false,
        page_number: 0,
        // 这里需要默认值？怎么获取userid？
        userid: 1,
        info: [],
        answerList: [],
        myPublish: [],
        pageList: ['user', 'history', 'mission', 'user'],
        pageListChinese: ['用户信息', '答题历史', '我的发布', '用户信息（待定）'],


        user_name: 'default username',
      }
    },
    props: {
      id: Number,

    },
    methods: {
      change: function (index) {
        this.page_number = index;
        this.get_user_info(this.userid, this.pageList[index])

      },
      get_user_info: function (user_id, content) {
        const xhr = new XMLHttpRequest()
        let context = this
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 201) {
            let info = xhr.responseText
            console.log(info)

          }
        }
        xhr.open("get", content)
      },
      mounted: function () {
        this.change(0);
      }
    }
  }

</script>
<style scoped>


</style>