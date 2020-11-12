<template >
    <a-layout id="components-layout-demo-fixed" >

        <navigation @logout='logout' :power="power" :username="userName" :avatar="avatar" />

        <a-layout-content :style="{ padding: '0 50px', marginTop: '100px' }" >
            <div :style="{ background: '#fff', padding: '24px', minHeight: '610px' }" >
            <router-view
                :username="userName"
                :power="power"
                :avatar="avatar"
                @login="login" @change-avatar="onChangeAvatar" />
            </div>
        </a-layout-content>

        <a-layout-footer :style="{ textAlign: 'center' }">
            ABSTRACT出品
        </a-layout-footer>

    </a-layout>
</template>

<style>
    #components-layout-demo-fixed .logo {
        width: 120px;
        height: 31px;
        background: #000000 url(assets/logo.jpg) no-repeat center;
        margin: 16px 24px 16px 0;
        float: left;
    }

</style>

<script>
    import navigation from "@/components/navigation";
    export default {
        name: 'Home',
        components: {
            navigation,
        },
        data(){
            return {
                userName: "游客，请登录/注册",
                power: -1,
                avatar: ''
            }
        },
        methods: {
            logout(data) {
                this.userName = "游客，请登录/注册";
                this.power = -1;
                this.avatar = '';
                console.log("logout!");
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            },
            login(data) {
                this.userName = data.name;
                this.power = data.power;
                this.avatar = data.avatar;
                console.log(this.userName);
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            },
            onChangeAvatar(url) {
                this.avatar = url;
                sessionStorage.setItem("avatar", this.avatar);
            }
        },
        mounted(){
            if(sessionStorage.getItem("userName") !== null){
                this.userName = sessionStorage.getItem("userName");
                this.power = parseInt(sessionStorage.getItem("power"));
                this.avatar = sessionStorage.getItem("avatar");
            }else{
                this.userName = "游客，请登录/注册";
                this.power = -1;
                this.avatar = '';
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            }
            console.log(this.userName);
        },
    }
</script>