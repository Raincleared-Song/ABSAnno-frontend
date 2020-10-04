<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo" />
        <a-menu
                v-model="current"
                theme="dark"
                mode="horizontal"
                :default-selected-keys="['1']"
                :style="{ lineHeight: '64px' }">
            <a-menu-item key="/ground">
                <router-link to="/ground">题目广场</router-link>
            </a-menu-item>
            <a-menu-item key="/rules">
                <router-link to="/rules">规则说明</router-link>
            </a-menu-item>
            <a-menu-item key="/edit">
                <router-link to="/edit">我要发布</router-link>
            </a-menu-item>
            <a-menu-item key="4" >
                <div>
                    <span>
                        <a-popover title="USER-NAME" placement="bottom">
                            <template slot="content">
                                <p>个人中心</p>
                                <p>管理员页面</p>
                                <p>我的消息</p>
                                <p><router-link to="/login">登陆/注册</router-link></p>
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
        data() {
            return {
                current: [],
            };
        },
        watch: {
            $route(to, from) {
                let name = this.$route.path;
                if(name === "/login" || name === "/signin"){
                    this.current = ["4"];
                }
                else{
                    this.current = [this.$route.path];
                }
                console.log(this.current);
            }
        },
        mounted:function(){
            let name = this.$route.path;
            if(name === "/login" || name === "/signin"){
                this.current = ["4"];
            }
            else{
                this.current = [this.$route.path];
            }
            console.log(this.current);
        }
    }
</script>

<style scoped>

</style>