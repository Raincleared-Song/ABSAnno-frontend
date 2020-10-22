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
        <!--        <a-layout-header style="background: #fff; padding: 0">{{pageListChinese[this.page_number]}}</a-layout-header>-->
        <a-layout-content style="background: #fff; padding: 80px">
          <!--          <a-breadcrumb style="margin: 16px 0">-->
          <!--            <a-breadcrumb-item>User</a-breadcrumb-item>-->
          <!--            <a-breadcrumb-item>{{this.user_name}}</a-breadcrumb-item>-->
          <!--          </a-breadcrumb>-->
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <!--          填写下方的四个div中的内容，预计有表格、列表、输入框等等。-->


            <div v-show="0===page_number">
              <div>
                <a-descriptions title="用户信息">
                  <a-descriptions-item label="用户名">
                    {{this.username}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户积分">
                    {{this.user_score}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户信誉">
                    {{this.user_weight}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户答题数量/完成任务数">
                    {{this.user_ans_num}}
                  </a-descriptions-item>
                  <a-descriptions-item label="Credit">
                    Credit
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </div>


            <div v-show="1===page_number">
              <template>
                <div>
                  <a-list item-layout="vertical" size="medium" :pagination="pagination" :data-source="answerListData">
                    <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                      <template v-for="{ type, text } in actions" slot="actions">
                      <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{ text + item[type] }}
                      </span>
                      </template>
<!--                      <img-->
<!--                          slot="extra"-->
<!--                          width="272"-->
<!--                          alt="logo"-->
<!--                      />-->
                      <a-list-item-meta :description="item.qName">
                        <a slot="title" >{{ item.qName + index}}</a>
                        <!--                      <a-avatar slot="avatar" :src="item.avatar" />-->
                      </a-list-item-meta>

                    </a-list-item>
                  </a-list>
                </div>
              </template>

            </div>


            <div v-show="2===page_number">
              <p>这是我的发布界面</p>
            </div>


            <div v-show="3===page_number">
              <div class="components-input-demo-presuffix">
                <h3>你可以在此改变你的用户名（留空来保持不变）</h3>
                <a-input-group compact>
                  <a-input ref="userNameInput" placeholder="User name" v-model="user_name">
                    <a-icon slot="prefix" type="user" />
                    <a-tooltip slot="suffix" title="You can change your username here">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                  </a-input>
                </a-input-group>
                <br/>
              </div>
              <div>
                <h3>选择你喜欢的题目类型</h3>
                <div>
                  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                      Check all
                    </a-checkbox>
                  </div>
                  <br />
                  <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onCheckListChange" />
                </div>
              </div>
              <div>
                <h3>选择你偏好的题目数量</h3>
                <a-select default-value="num1" style="width: 120px" @change="handleNumberChange">
                  <a-select-option value="num1">
                    题目数量1
                  </a-select-option>
                  <a-select-option value="num2">
                    题目数量2
                  </a-select-option>
                  <a-select-option value="num3">
                    题目数量3
                  </a-select-option>
                  <a-select-option value="num4">
                    题目数量4
                  </a-select-option>
                </a-select>
              </div>
              <div>
                <h3>是否提交？</h3>
                <a-button-group>
                  <a-button @click="change(0)">Cancel</a-button>
                  <a-button type="primary" @click="submitChange">
                    OK
                  </a-button>
                </a-button-group>
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>

</template>

<script>
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