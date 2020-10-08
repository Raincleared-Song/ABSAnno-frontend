<template>

    <el-row class="tac">

      <el-col :span="6">
        <div>
          <el-avatar :size="70" :src="circleUrl"><!--这里要从数据库拿头像，更改src--></el-avatar>
<!--          这里要从数据库拿名字和身份，显示在下方-->
          <h3>用户信息界面</h3>
          <h4>用户权限：用户，发布者，管理员</h4>
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="1" @click="change(0)">
              <i class="el-icon-menu"></i>
              <span slot="title" >基本信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="change(1)">
              <i class="el-icon-menu"></i>
              <span slot="title" >答题历史</span>
            </el-menu-item>
            <el-menu-item index="3" @click="change(2)">
              <i class="el-icon-document"></i>
              <!-- 当且仅当当前用户为发布者时，可以看到这一条 -->
              <span slot="title" >我的发布</span>
            </el-menu-item>
            <el-menu-item index="4" @click="change(3)">
              <i class="el-icon-setting"></i>
              <span slot="title">待定</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
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

      </el-col>
    </el-row>



</template>

<script>
  export default {
    name: "user_page",
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"],
        page_number: 0,
      }
    },
    methods: {
      change: function (index) {
        this.page_number = index;
      }
    }
  }

</script>
<style scoped>


</style>