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
            <a-menu-item v-if="power!==-1" key="/orders">
                <router-link to="/orders">我的接单</router-link>
            </a-menu-item>
            <a-menu-item v-if="power===1 || power===2" key="/mission">
                <router-link to="/mission/create">发布题目</router-link>
            </a-menu-item>
            <a-menu-item v-if="power===1 || power===2" key="/pub">
                <router-link to="/pub">我的发布</router-link>
            </a-menu-item>
            <a-menu-item v-if="power===2" key="/users">
                <router-link to="/users">管理用户</router-link>
            </a-menu-item>
            <a-menu-item v-if="power===-1" key="/login" style="float: right;">
                <a-button ghost>
                    <router-link to="/login">登录</router-link>
                </a-button>
            </a-menu-item>
            <a-menu-item v-if="power===-1" key="/signin" style="float: right;">
                <a-button ghost>
                    <router-link to="/signin">注册</router-link>
                </a-button>
            </a-menu-item>
            <a-menu-item v-if="power!==-1" style="float: right;">
                <a-button v-if="power!==-1" @click="onClick" type="danger" ghost >
                    <router-link to="/ground">登出</router-link>
                </a-button>
            </a-menu-item>
            <a-menu-item v-if="power!==-1" style="float: right;" key="/user">
                <div>
                    <span>
                        <a-popover placement="bottom" >
                            <template slot="content">
                                欢迎，{{this.username}}<br/>
                            </template>
                            <router-link to="/user"><a-avatar shape="square" icon="user"/></router-link>
                        </a-popover>
                    </span>
                </div>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
    import postBackend from "../utils/postBackend"

    export default {
        name: "navigation",
        components:{
        },
        props:[
            "username",
            "power",
        ],
        data() {
            return {
                current: [],
            };
        },
        methods: {
            onClick() {
                postBackend("backend/logout", {}, jsonObj => {
                    if (jsonObj.code === 201) {
                        this.$emit('logout',true);
                    } else {
                        console.log("can't logout")
                    }
                });
            },
        },
        watch: {
            $route(to, from) {
                this.current = [this.$route.path];
                console.log(this.current);
            }
        },
    }
</script>

<style scoped>

</style>