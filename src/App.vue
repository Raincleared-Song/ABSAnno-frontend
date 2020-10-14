<template >
    <a-layout id="components-layout-demo-fixed" >
<!--        <a-config-provider :autoInsertSpaceInButton="false">-->
            <navigation @logout='logout' :power="power" :username="userName"/>
<!--        </a-config-provider>-->

        <a-layout-content :style="{ padding: '0 50px', marginTop: '100px' }" >
            <div :style="{ background: '#fff', padding: '24px', minHeight: '610px' }" >
            <router-view :username="userName" :power="power" @login="login"></router-view>
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
    // import '@/assets/css/global.scss';
    export default {
        name: 'Home',
        components: {
            navigation,
        },
        data(){
            return {
                userName:"游客，请登录/注册",
                power:-1,
            }
        },
        methods: {
            logout(data) {
                this.userName="游客，请登录/注册";
                this.power=-1;
                console.log("logout!");
            },
            login(data){
                this.userName=data.name;
                this.power=data.iden;
                console.log(this.userName);
            }
        }
    }
</script>