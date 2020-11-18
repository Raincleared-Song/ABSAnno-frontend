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
                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605727363764&di=c49a3474a398e8834d65a65df2537d43&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg'
            }
        },
        methods: {
            logout(data) {
                if(data === 1){
                    this.$message.success('退出登录', 2);
                }
                this.userName = "游客，请登录/注册";
                this.power = -1;
                this.avatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605727363764&di=c49a3474a398e8834d65a65df2537d43&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg";
                console.log("logout!");
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            },
            login(data) {
                this.userName = data.name;
                this.power = data.power;
                this.avatar = data.avatar;
                if(this.avatar === ""){
                    // this.avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    this.avatar="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605727363764&di=c49a3474a398e8834d65a65df2537d43&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg"
                }
                console.log(this.userName);
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            },
            onChangeAvatar(url) {
                if(url !== "") {
                    this.avatar = url;
                    sessionStorage.setItem("avatar", this.avatar);
                }
            },
            // showLogoutMessage(){
            //     this.$message.info('会话已过期，请重新登陆', 2);
            // }
        },
        mounted(){
            if(sessionStorage.getItem("userName") !== null){
                this.userName = sessionStorage.getItem("userName");
                this.power = parseInt(sessionStorage.getItem("power"));
                this.avatar = sessionStorage.getItem("avatar");
            }else{
                this.userName = "游客，请登录/注册";
                this.power = -1;
                this.avatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605727363764&di=c49a3474a398e8834d65a65df2537d43&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F08%2F20200808142612_nsopf.thumb.400_0.jpeg";
                sessionStorage.setItem("userName", this.userName);
                sessionStorage.setItem("power", this.power);
                sessionStorage.setItem("avatar", this.avatar);
            }
            console.log(this.userName);
        },
    }
</script>