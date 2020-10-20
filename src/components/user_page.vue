<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider theme="light" v-model="collapsed">
        <a-avatar :size="64" icon="user">USER</a-avatar>
        <!--          这里要从数据库拿名字和身份，显示在下方-->
        <h3>{{this.user_name}}</h3>
        <h4>用户权限:{{this.user_power[this.power+1]}}</h4>
<!--        :default-selected-keys="['4']"-->
        <a-menu theme="light" :defaultSelectedKeys="['4']" :defaultOpenKeys="['4']" mode="inline">
          <a-menu-item key="1" @click="change(0)" @select="simplefunc()">
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
                    {{this.user_name}}
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
              <div>
                <a-list item-layout="vertical" size="medium" :pagination="pagination" :data-source="answerListData">
                  <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                    <template v-for="{ type, text } in actions" slot="actions">
                      <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{ text + item[type] }}
                      </span>
                    </template>
                    <img
                        slot="extra"
                        width="272"
                        alt="logo"
                    />
                    <a-list-item-meta :description="item.qName">
                      <a slot="title" >{{ item.qName + index}}</a>
<!--                      <a-avatar slot="avatar" :src="item.avatar" />-->
                    </a-list-item-meta>
                    published by :{{ item.qUser }}
                    published on : {{ item.qTime }}

                  </a-list-item>
                </a-list>
              </div>
            </div>


            <div v-show="2===page_number">
              <p>这是我的发布界面</p>
            </div>


            <div v-show="3===page_number">
              <div class="components-input-demo-presuffix">
                <a-input ref="userNameInput" placeholder="User name">
                  <a-icon slot="prefix" type="user" />
                  <a-tooltip slot="suffix" title="You can change your username here">
                    <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                  </a-tooltip>
                </a-input>
                <br />
              </div>
              <h3>选择你喜欢的题目类型</h3>
              <a-checkbox-group>
                <a-row>
                  <a-col :span="8">
                    <a-checkbox value="A">
                      Class A
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="B">
                      Class B
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="C">
                      Class C
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="D">
                      Class D
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <h3>选择你偏好的题目数量</h3>
              <a-select default-value="lucy" style="width: 120px" @change="handleNumberChange">
                <a-select-option value="qNum1">
                  题目数量1
                </a-select-option>
                <a-select-option value="qNum2">
                  题目数量2
                </a-select-option>
                <a-select-option value="qNum3">
                  题目数量3
                </a-select-option>
                <a-select-option value="qNum4">
                  题目数量4
                </a-select-option>
              </a-select>

            </div>

          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

  </div>

</template>

<script>
const answerListData = [];
export const classOptions = ['题目类型1', '题目类型2', '题目类型3'];
export const defaultClassOptionsList = ['题目类型1', '题目类型2', '题目类型3'];
for (let i = 0; i < 10; i++) {
  answerListData.push({
    qName: "Do you like apples",
    qUser: "Mat",
    qClass: "Single Choice",
    qTime: new Date().setFullYear(2020, 10, 20)
    // href: 'https://www.antdv.com/',
    // title: `ant design vue part ${i}`,
    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    // description:
    //     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    // content:
    //     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
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
      indeterminate: true,
      classCheckAll: false,
      classCheckedList: defaultClassOptionsList,
      classOptions,

      collapsed: false,
      page_number: 0,
      userid: -1,
      info: [],
      answerList: [],
      myPublish: [],
      pageList: ['user', 'history', 'mission', 'editUser'],
      pageListChinese: ['用户信息', '答题历史', '我的发布', '修改个人信息'],
      user_power: ['未登录', '用户', '发布者', '管理员'],


      user_name: 'default username',
      user_score: 0,
      user_weight: 0,
      user_ans_num: 0,

      qNum: 10, // 总共回答了多少道题
    }
  },
  props: [
    "power",
  ],
  methods: {
    change: function (index) {
      this.page_number = index;
      console.log(this.pageList)
      this.get_user_info(this.pageList[index])

    },
    parseHistory: function (info) {
      let data = JSON.parse(info.data.replace(/'/g,'"'))
      console.log(data)
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
    get_user_info: function (content) {
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
    onClassChange(checkedValues) {
        console.log('checked = ', checkedValues);
    },
    handleNumberChange(value) {
      console.log(`selected ${value}`);
    },
    created: function () {
      this.change(0);
      console.log("in created function")
    },
    simplefunc: function() {
      this.change(0)
      console.log("in simplefunc function")
    }
  }
}

</script>
<style scoped>


</style>