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
                <router-link to="/ground">任务广场</router-link>
            </a-menu-item>
            <a-menu-item key="/rules">
                <router-link to="/rules">规则说明</router-link>
            </a-menu-item>
            <a-menu-item v-if="power!==-1" key="/orders">
                <router-link to="/orders">我的接单</router-link>
            </a-menu-item>
            <a-menu-item v-if="power===1 || power===2" key="/mission">
                <router-link to="/mission/create">发布任务</router-link>
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
                            <template slot="title">
                                欢迎，{{this.username}}<br/>
                            </template>
                            <template slot="content">
                                <div>
                                      <a-button @click="showModal" block mini>充值</a-button>
                                      <a-modal            title="充值"
                                                          :visible="visible"
                                                          :confirm-loading="confirmLoading"
                                                          okText="确认"
                                                          cancelText="取消"
                                                          @ok="handleOk"
                                                          centered="true"
                                                          @cancel="handleCancel">
                                          请输入您想充值的额度(1-10000)：
                                          <a-input-number id="inputNumber" v-model="value" :min="1" :max="10000"  />
                                      </a-modal>
                                  </div>
                            </template>
                            <router-link to="/user">
                                <a-avatar shape="square" :src="avatar"/>
                            </router-link>
                        </a-popover>
                    </span>
                </div>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
    import postBackend from "../utils/postBackend"
    import getBackend from "../utils/getBackend"
    import convertTime from "../utils/convertTime";

    export default {
        name: "navigation",
        components:{
        },
        props:[
            "username",
            "power",
            "avatar"
        ],
        data() {
            return {
                current: [],
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
                value: 100,
            };
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                this.ModalText = 'The modal will be closed after two seconds';
                this.confirmLoading = true;
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        this.$message.success("成功充值"+this.value.toString()+"金币")
                        this.visible = false;
                        this.confirmLoading = false;
                    } else {
                        console.log(jsonObj.data);
                        this.visible = false;
                        this.confirmLoading = false;
                    }
                };
                getBackend("backend/addcoin", {
                    "add_coin":this.value,
                }, onRespond);

            },
            handleCancel(e) {
                this.visible = false;
            },
            onClick() {
                postBackend("backend/logout", {}, jsonObj => {
                    if (jsonObj.code === 201) {
                        this.$emit('logout', 1);
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
                if(this.$route.path === "/login"){
                    this.$emit('logout', 0);
                }
            }
        },
    }
</script>

<style scoped>

</style>