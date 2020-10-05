<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo" />
        <a-menu
                theme="dark"
                mode="horizontal"
                :default-selected-keys="['1']"
                :style="{ lineHeight: '64px' }">
            <a-menu-item key="1">
                <router-link to="/ground">题目广场</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <router-link to="/rules">规则说明</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link to="/edit">我要发布</router-link>
            </a-menu-item>
            <a-menu-item key="4" >
                <div>
                    <span>
                        <a-popover title="USER-NAME" placement="bottom">
                            <template slot="content">
                              <p>
                                <router-link to="/user">个人中心</router-link>
                              </p>
                                <p>
                                  <router-link to="/admin">管理员界面</router-link>
                                </p>
                                <p>我的消息</p>
                                <p>
                                  <router-link to="/login">登陆/注册</router-link>
                                </p>
                            </template>
                            <a-button type="link">
                                <a-badge dot><a-avatar shape="square" icon="user"/></a-badge>
                            </a-button>
                        </a-popover>
                    </span>
                </div>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
    export default {
        name: "navigation",
        components:{
        },
        data(){
        },
    }
</script>

<style scoped>

</style>