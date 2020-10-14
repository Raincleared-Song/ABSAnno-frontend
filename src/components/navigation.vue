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
            <a-menu-item v-if="iden === 1" key="/edit">
                <router-link to="/edit">发布题目</router-link>
            </a-menu-item>
            <a-menu-item v-if="id!==0" key="/user">
                <router-link to="/user">个人中心</router-link>
            </a-menu-item>

            <a-menu-item v-if="id===0" key="/login" style="float: right;">
<!--                <a-button-group>-->
                    <a-button ghost>
                        <router-link to="/login">登陆</router-link>
                    </a-button>

<!--                </a-button-group>-->
            </a-menu-item>
            <a-menu-item v-if="id===0" key="/signin" style="float: right;">
                <a-button ghost>
                    <router-link to="/signin">注册</router-link>
                </a-button>
            </a-menu-item>
            <a-menu-item v-if="id!==0" style="float: right;">
                <a-button v-if="id!==0" @click="onClick" type="danger" ghost >
                    <router-link to="/ground">登出</router-link>
                </a-button>
            </a-menu-item>
            <a-menu-item v-if="id!==0" key="0" style="float: right;">
                <div >
                    <span>
                        <a-popover :title="'欢迎，'+username" placement="bottom" >
<!--                            <template slot="content">-->
<!--                                <p>用户名：{{this.username}}</p>-->
<!--                                <p>id：{{this.id}}</p>-->
<!--                            </template>-->
                            <a-badge dot><a-avatar shape="square" icon="user"/></a-badge>
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
        props:[
            "username",
            "id",
            "iden",
        ],
        data() {
            return {
                current: [],
            };
        },
        methods: {
            onClick() {
                this.$emit('logout',true);
            },
        },
        watch: {
            $route(to, from) {
                this.current = [this.$route.path];
                console.log(this.current);
            }
        },
        mounted:function(){
            this.current = [this.$route.path];
            console.log(this.current);
        }
    }
</script>

<style scoped>

</style>