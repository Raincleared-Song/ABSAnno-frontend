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
            <a-breadcrumb-item>{{this.user_name}}</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <!--          填写下方的四个div中的内容，预计有表格、列表、输入框等等。-->
            <div v-show="0===page_number">
              <div>
                <a-descriptions title="User Info">
                  <a-descriptions-item label="UserName">
                    Zhou Maomao
                  </a-descriptions-item>
                  <a-descriptions-item label="Telephone">
                    N/A
                  </a-descriptions-item>
                  <a-descriptions-item label="Mail">
                    example@me.com
                  </a-descriptions-item>
                  <a-descriptions-item label="Remark">
                    ???
                  </a-descriptions-item>
                  <a-descriptions-item label="Credit">
                    Credit
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </div>
            <div v-show="1===page_number">
              <div>
                <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
                  <div slot="footer"><b>ant design vue</b> footer part</div>
                  <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                    <template v-for="{ type, text } in actions" slot="actions">
                      <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{ text }}
                      </span>
                    </template>
                    <img
                        slot="extra"
                        width="272"
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    <a-list-item-meta :description="item.description">
                      <a slot="title" :href="item.href">{{ item.title + index}}</a>
                      <a-avatar slot="avatar" :src="item.avatar" />
                    </a-list-item-meta>
                    {{ item.content }}
                  </a-list-item>
                </a-list>
              </div>
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
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
  export default {
    name: "user_page",
    data () {
      return {
        listData,
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        },
        actions: [
          { type: 'star-o', text: '156' },
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
        ],
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
    props:[
      "id",
    ],
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