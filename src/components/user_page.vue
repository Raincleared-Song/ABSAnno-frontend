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
          <a-menu-item key="3" @click="change(2)" :selectable="this.power===1">
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

  const answerListData = [];
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const defaultCheckedList = ['Apple', 'Orange'];
  for (let i = 0; i < 10; i++) {
    answerListData.push({
      qName: "Do you like apples",
      qUser: "Mat",
      qClass: "Single Choice",
      qTime: new Date().setFullYear(2020, 10, 20),
      // add more info
    });
  }
  export default {
    name: "user_page",
    components: {history, basic_info, edit_info, publicate},
    data () {
      return {
        answerListData,
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        },
        actions: [
          { type: 'qUser', text: 'Published by: ' },
          { type: 'qTime', text: 'Published on: ' },
        ],

        collapsed: false,
        page_number: 3,
        userid: -1,
        info: [],
        answerList: [],
        myPublish: [],
        pageList: ['user', 'history', 'mission', 'editUser'],
        pageListChinese: ['用户信息', '答题历史', '我的发布', '修改个人信息'],
        user_power: ['未登录', '用户', '发布者', '管理员'],


        user_name: this.username,
        user_score: 0,
        user_weight: 0,
        user_ans_num: 0,

        totalNum: 10, // 总共回答了多少道题

        desireNum: "",

        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        plainOptions,
      }
    },
    props: [
      "power",
      "username"
    ],
    methods: {
      change: function (index) {
        this.page_number = index;
        console.log(this.pageList)
        this.getUserInfo(this.pageList[index])
      },
      parseHistory: function (info) {
        console.log(info)
        info = info.data.replace(/'/g, '"')
        let data = JSON.parse(info)
        console.log(data)
        this.answerListData = []
        for (let i = 0; i < data.total_num; ++i) {
          console.log(data.mission_list[i])
          let d = new Date()
          d.setTime(data.mission_list[i].ret_time)
          this.answerListData.push({
            qName: data.mission_list[i].name,
            qUser: data.mission_list[i].user,
            qClass: data.mission_list[i].question_form,
            qTime: d.toLocaleString(),
          })
        }

      },
      parseUserInfo: function (info) {
        let data = JSON.parse(info.data.replace(/'/g,'"'))
        console.log(data.name, data.num, data.weight, data.score)
        this.user_name = data.name
        this.user_ans_num = data.num
        this.user_weight = data.weight
        this.user_score = data.score

      },
      parseMission: function (info) {
        let data = JSON.parse(info.data.replace(/'/g,'"'))
        console.log(data)
      },
      getUserInfo: function (content) {
        const xhr = new XMLHttpRequest()
        let context = this
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 201) {
            let info = JSON.parse(xhr.responseText)
            console.log(info)
            console.log(content)
            if (content === "history")
              context.parseHistory(info)
            else if (content === "user")
              context.parseUserInfo(info)
            else if (content === "mission")
              context.parseMission(info)
            // else if (content === "editUser)

          }
        }
        xhr.open("get", "backend/user?method="+content.toString())
        xhr.send()
      },
      submitChange() {
        const xhr = new XMLHttpRequest()
        // let context = this
        // xhr.onreadystatechange = function () {
        //   if (xhr.readyState === 4 && xhr.status === 201) {
        //
        //   }
        //   xhr.open("post", "backend/user?method="+"modify")
        //   xhr.send()
        // }
      },
      onCheckListChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
        this.checkAll = checkedList.length === plainOptions.length;
        console.log(checkedList)
      },
      onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
      },
      handleNumberChange(value) {
        console.log(`selected ${value}`);
        this.desireNum = value
      },
      created: function () {
        this.change(0);
        console.log("in created function")
      },

    }
  }

</script>
<style scoped>


</style>